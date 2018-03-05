import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Router } from "@angular/router";

import * as appconfig from '../../environments/appconfig';
import { Token } from '../model/Token';

import jsrsasign = require('jsrsasign');

@Injectable()
export class RestClientService {

  keypair: any;
  baseUrlLocal = `./assets/data`;
  token: Token;
  csrfLockAvl: boolean;
  uid: string;
  sharedKey: string;
  lastXForwardedFor: string;
  // csrfToken: string;
  baseUrl = `${appconfig.baseUrlWs}/protected/mapps1`;
  serviceUrl = `${appconfig.baseUrlWs}/protected`;
  authUrl = `${appconfig.baseUrl}/authprovider/oauth/token`;

  constructor(private httpClient: HttpClient,
          private router: Router) {
      this.init();
  }

  init() {
      this.uid = '' + new Date().getTime();
      // this.csrfToken = this.uid;
      this.token = null;
  }

  get(serviceName: string, oauthFlag: boolean = true, dssFlag: boolean = true): Observable<any> {
      let headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('greq', this.uid);

      if (oauthFlag) {
          headers = headers.set('Authorization', `Bearer ${this.token.access_token}`);
      }

      if (dssFlag) {
        const dss = this.genDss();
        headers = headers.set('dss', dss);
        console.log("dss: " + dss);
    }
      const module=this.getModule(serviceName);
      const url = `${this.serviceUrl}/${module}/${serviceName}`;

      return this.httpClient.get<any>(url,
          {
              headers: headers,
              observe: 'response'
          }).do(
           resp => {
               console.log(resp.headers.get('Set-Cookie'));
           },
           (err: HttpErrorResponse) => this.checkErrorStatus(err)
          )
          .map(resp => {
              if (dssFlag) {
                  this.lastXForwardedFor = resp.headers.get("X-Request-For");
                  console.log("resp-csrf: " + this.lastXForwardedFor);
                  this.csrfLockAvl = true;
              }
              return resp.body;
          });
  }

  getWithParameter(serviceName: string, oauthFlag: boolean = true, dssFlag: boolean = true): Observable<any> {
      let headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('greq', this.uid);

      if (oauthFlag) {
          headers = headers.set('Authorization', `Bearer ${this.token.access_token}`);
      }

      if (dssFlag) {
        const dss = this.genDss();
        headers = headers.set('dss', dss);
        console.log("dss: " + dss);
    }
      const module=this.getModule(serviceName.substring(0,serviceName.indexOf("/")));
      const url = `${this.serviceUrl}/${module}/${serviceName}`;

      return this.httpClient.get<any>(url,
          {
              headers: headers,
              observe: 'response'
          }).do(
           resp => resp,
           (err: HttpErrorResponse) => this.checkErrorStatus(err)
          )
          .map(resp => {
              if (dssFlag) {
                  this.lastXForwardedFor = resp.headers.get("X-Request-For");
                  console.log("resp-csrf: " + this.lastXForwardedFor);
                  this.csrfLockAvl = true;
              }
              return resp.body;
          }
      );
  }

  post(serviceName: string, data?: string, oauthFlag: boolean = true, dssFlag: boolean = true): Observable<any> {
      console.log("req-csrf: " + this.lastXForwardedFor);

      let headers = new HttpHeaders()
          .set('Content-Type', 'application/json; charset=utf-8')
          .set('greq', this.uid);

      if (oauthFlag) {
          headers = headers.set('Authorization', `Bearer ${this.token.access_token}`);
      }

      if (dssFlag) {
          const dss = this.genDss();
          headers = headers.set('dss', dss);
          console.log("dss: " + dss);
      }

      const module=this.getModule(serviceName);
      const url = `${this.serviceUrl}/${module}/${serviceName}`;
      console.log(`URL: ${url}`);
      return this.httpClient.post<any>(url, data,
          {
              headers: headers,
              observe: 'response'
          }).do(
              resp => resp,
              (err: HttpErrorResponse) => this.checkErrorStatus(err)
             )
          .map(resp => {
              if (dssFlag) {
                  this.lastXForwardedFor = resp.headers.get("X-Request-For");
                  console.log("resp-csrf: " + this.lastXForwardedFor);
                  this.csrfLockAvl = true;
              }
              return resp.body;
          });
  }

  getAuthToken(userid:string,pwd:string): Observable<any> {
      console.log("req-csrf: " + this.lastXForwardedFor);
      const credInB64=btoa(`${userid}:${pwd}`);
      const headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', `Basic ${credInB64}`);
          console.log(headers);
          
      const data = `grant_type=password&username=${userid}&password=Testing1&uid=${this.uid}`;
      const url = `${this.authUrl}`;
      console.log(`URL: ${url}`);
      return this.httpClient.post<any>(url, data,
          {
              headers: headers,
              observe: 'response'
          })
         /*  .do(
              resp => resp,
              (err: HttpErrorResponse) => this.checkErrorStatus(err)
             ) */
          .map(resp => {
             /*  if (dssFlag) {
                  this.lastXForwardedFor = resp.headers.get("X-Request-For");
                  console.log("resp-csrf: " + this.lastXForwardedFor);
                  this.csrfLockAvl = true;
              } */
              this.token=resp.body;
              return resp.body;
          });
  }

  agreeOnKey(publicKeyInBase64:string): Observable<any> {
      console.log("publicKeyInBase64: " + publicKeyInBase64);
      const headers = new HttpHeaders()
          .set('Content-Type', 'text/plain')
          .set('Authorization', `Bearer ${this.token.access_token}`)
          .set('greq', this.uid);
          console.log(headers);
          
      const data = publicKeyInBase64;
      const url = `${this.baseUrl}/agreeOnKey`;
      const options = {headers: headers, observe: 'response'};
      console.log(`URL: ${url}`);
      return this.httpClient.post<any>(url, data,{headers: headers,
         observe: 'response'})
          .do(
              resp => resp,
              (err: HttpErrorResponse) => this.checkErrorStatus(err)
             )
          .map(resp => {
             // if (dssFlag) {
                  this.lastXForwardedFor = resp.headers.get("X-Request-For");
                  console.log("resp-csrf: " + this.lastXForwardedFor);
                  this.csrfLockAvl = true;
             // }
              this.sharedKey=resp.body;
              // this.lastXForwardedFor=resp.headers.get('X-Request-For');
              console.log(resp);
              
              return resp.body;
          });
  }

  
  getText(serviceName: string): Observable<any> {
      const headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('greq', this.uid);



      const url = `${appconfig.baseUrlWs}/${serviceName}`;


      return this.httpClient.get(url,
          {
              headers: headers,
              responseType: 'text',
          }).do( resp => resp,
              (err: HttpErrorResponse) => {
                  console.log("Service unavailable status");
                  this.router.navigate(['/error']);
              }
         )
          .map(resp => resp,
          (err: HttpErrorResponse) => {
              console.log(JSON.stringify(err));
              if (err.error instanceof Error) {
                  console.log(JSON.stringify(err.error.message));
              } else {
                  console.log(JSON.stringify(err.error));
              }
          });
  }

  getJSON(serviceName: string): Observable<any> {
      const headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('greq', this.uid);

      const url = `${appconfig.baseUrlWs}/${serviceName}`;

      return this.httpClient.get<any>(url,
          {
              headers: headers,
              observe: 'response'
          }).do( resp => resp,
              (err: HttpErrorResponse) => this.checkErrorStatus(err)
          )
          .map(resp => {
              return resp.body;
          },
          (err: HttpErrorResponse) => {
              console.log(JSON.stringify(err));
              if (err.error instanceof Error) {
                  console.log(JSON.stringify(err.error.message));
              } else {
                  console.log(JSON.stringify(err.error));
              }
          });
  }

  getModule(service:string): string {
      if(appconfig.modules[service]==undefined) {
          return "mapps1";
      }else {
          return appconfig.modules[service];
      }
  }

  checkErrorStatus(err: HttpErrorResponse) {
      this.csrfLockAvl = true;
      // if(err.status==503){
      //     console.log("Service unavailable status");
      //     this.router.navigate(['/error']);
      // }else{
      //     console.log("Http status "+status);
      //     this.router.navigate(['/']);
      //     this.store.dispatch(new loginAction.LoginFailAction(err));
      //     this.store.dispatch(new uistate.UiShowLoginDialog);
      // }
      console.log("Service unavailable status");
      this.router.navigate(['/error']);
  }


  getFromLocalJson(serviceName: string): Observable < any > {
    const url = `${this.baseUrlLocal}/${serviceName}.json`;

    // let t1 = Date.now() + 1000;
    // while(t1>Date.now());

    return this.httpClient.get < any > (url)
      .map(resp => {
        return resp;
      });
  }

  genDss(): string {
    let retVal = '';
    try {
        // Header
const oHeader = {alg: 'HS256', typ: 'JWT'};
// Payload
const oPayload = {};
const tNow = jsrsasign.KJUR.jws.IntDate.get('now');
const tEnd = jsrsasign.KJUR.jws.IntDate.get('now + 1hour');
oPayload['iss'] = this.uid; // issuer
oPayload['sub'] = "IRCTCMAPPS";// the subject/principal is whom the token is about
oPayload['nbf'] = tNow; // NotBeforeTimeInThePast
oPayload['iat'] = tNow; // when the token was issued/created (now)
oPayload['exp'] = tEnd; // time when the token will expire (1 hour from now)
oPayload['jti'] = "id123456"+this.uid+tNow;// a unique identifier for the token
oPayload['aud'] = "MAPPS";
oPayload['ussd'] = this.getUssd(); // additional claims/attributes about the subject can be added
// Sign JWT, 
let password = 'secret-key' ;
if( this.keypair && this.keypair['ecprvhex'] ) {
    password = this.keypair['ecprvhex'];
}
const sHeader = JSON.stringify(oHeader);
const sPayload = JSON.stringify(oPayload);
const sJWT = jsrsasign.KJUR.jws.JWS.sign("HS384", sHeader, sPayload, password);
     console.log(sJWT);
        
    retVal = sJWT;

       /*  JsonWebSignature jws = new JsonWebSignature();
        jws.setPayload(claims.toJson());
jws.setKey(sessionStamp.getSessionKey().getPrivateKey());
jws.setKeyIdHeaderValue(sessionStamp.getSessionKey().getKeyId());
jws.setAlgorithmHeaderValue(AlgorithmIdentifiers.ECDSA_USING_P384_CURVE_AND_SHA384);
        String innerJwt = jws.getCompactSerialization();
        Log.i(TAG,"Signature:"+innerJwt);

        JsonWebEncryption jwe = new JsonWebEncryption();
jwe.setAlgorithmHeaderValue(KeyManagementAlgorithmIdentifiers.ECDH_ES_A128KW);
jwe.setEncryptionMethodHeaderParameter(contentAlgoIdentifier);
        jwe.setKey(sessionStamp.getSharedKey().getPublicKey());
jwe.setKeyIdHeaderValue(sessionStamp.getSharedKey().getKeyId());
        jwe.setContentTypeHeaderValue("JWT");
        jwe.setPayload(innerJwt);
        jwe.enableDefaultCompression();
        String jwt = jwe.getCompactSerialization();
        Log.i(TAG,"JWT:"+jwt);
        Log.i(TAG,"JWT Length:"+jwt.length());
        retVal = jwt;
         */
    }catch (e) {
        console.log(e);
        
    }

    return retVal;
    }

    
    getUssd(): any {
        throw new Error("Method not implemented.");
    }
    
}
