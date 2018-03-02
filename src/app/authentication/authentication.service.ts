import { Injectable } from '@angular/core';
import { RestClientService } from '../services/rest-client.service';
// import ECKey = require('ec-key');
 import jsrsasign = require('jsrsasign');
 // import crypto = require('crypto');

@Injectable()
export class AuthenticationService {
  
   SERVER_KEY_ID:string = "service-key";
   USER_KEY_ID:string = "user-key";

  constructor(private restClient: RestClientService) { }


  login(userid:string,password:string): Promise<boolean> {
    // console.log("password==>"+password);
    // const key = ECKey.createECKey('P-384');
    // console.log(key);
    

    return new Promise(resolve=> {
      this.restClient.getAuthToken(userid,password).subscribe((resp) => {
        console.log(resp);
        // agreeOnkey
        const ec = new jsrsasign.KJUR.crypto.ECDSA({'curve': 'secp384r1'});
        const keypair = ec.generateKeyPairHex();
       /* const publicKeyInBase65 = `MIIBtTCCAU0GByqGSM49AgEwggFAAgEBMDwGByqGSM49AQECMQD
        //////////////////////////////////////////v////8AAAAAAAAAAP////8wZAQw//////////
        ////////////////////////////////7/////AAAAAAAAAAD////8BDCzMS+n4j7n5JiOBWvj+C0ZG
        B2cbv6BQRIDFAiPUBOHWsZWOY2KLtGdKoXI7dPsKu8EYQSqh8oivosFN46xxx7zIK10bh07Younm5hZ
        90HgglQqOFUC8l2/VSlsOlReOHJ2Crc2F95KliYsb12emL+Sktwp+PQdvSiaFHzp2jETtfC4wApgsc4d
        foGdekMdfJDqDl8CMQD////////////////////////////////HY02B9Dct31gaDbJIsKd67OwZaszF
        KXMCAQEDYgAEmDSaDlg3vAm2sop7MSNvAFiucp98JpIXICAFywwvcuMKhhAosrm9q/nrTdu4uRbj0c+G
        nXOT6dww+KKXF9bH5Uccrzh0u4K+MgdpZDDEDMBWU0B6+Qoq/MTeCmtPPD1/`; */
        const publicKeyInBase65 = btoa(keypair.ecpubhex);
        // .replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
        console.log(keypair);
        this.restClient.agreeOnKey(publicKeyInBase65).subscribe((resp1) => {
          console.log(resp1);
          resolve(true);
        });
      });
      
    });
  }

}
