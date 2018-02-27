import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Router } from "@angular/router";

import * as appconfig from '../../environments/appconfig';
import { Token } from '../model/Token';

@Injectable()
export class RestClientService {
  baseUrlLocal = `./assets/data`;
  token: Token;
  csrfLockAvl: boolean;
  uid: string;
  sharedKey: string;
  lastXForwardedFor: string;
  csrfToken: string;
  baseUrl = `${appconfig.baseUrlWs}/protected/mapps1`;
  serviceUrl = `${appconfig.baseUrlWs}/protected`;
  authUrl = `${appconfig.baseUrl}/authprovider/oauth/token`;

  constructor(private httpClient: HttpClient,
          private router: Router) {
      this.init();
  }

  init() {
      this.uid = '' + new Date().getTime();
      this.csrfToken = this.uid;
      this.token = null;
  }

  get(serviceName: string, oauthFlag: boolean = true, csrfFlag: boolean = true): Observable<any> {
      let headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('greq', this.uid);

      if (oauthFlag) {
          headers = headers.set('Authorization', `Bearer ${this.token.access_token}`);
      }

      if (csrfFlag) {
          headers = headers.set('spa-csrf-token', this.csrfToken);
          console.log("req-csrf: " + this.csrfToken);
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
              if (csrfFlag) {
                  this.csrfToken = resp.headers.get("csrf-token");
                  console.log("resp-csrf: " + this.csrfToken);
                  this.csrfLockAvl = true;
              }
              return resp.body;
          });
  }

  getWithParameter(serviceName: string, oauthFlag: boolean = true, csrfFlag: boolean = true): Observable<any> {
      let headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('greq', this.uid);

      if (oauthFlag) {
          headers = headers.set('Authorization', `Bearer ${this.token.access_token}`);
      }

      if (csrfFlag) {
          headers = headers.set('spa-csrf-token', this.csrfToken);
          console.log("req-csrf: " + this.csrfToken);
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
              if (csrfFlag) {
                  this.csrfToken = resp.headers.get("csrf-token");
                  console.log("resp-csrf: " + this.csrfToken);
                  this.csrfLockAvl = true;
              }
              return resp.body;
          }
      );
  }

  post(serviceName: string, data?: string, oauthFlag: boolean = true, csrfFlag: boolean = true): Observable<any> {
      console.log("req-csrf: " + this.csrfToken);

      let headers = new HttpHeaders()
          .set('Content-Type', 'application/json; charset=utf-8')
          .set('greq', this.uid);

      if (oauthFlag) {
          headers = headers.set('Authorization', `Bearer ${this.token.access_token}`);
      }

      if (csrfFlag) {
          headers = headers.set('spa-csrf-token', this.csrfToken);
          console.log("req-csrf: " + this.csrfToken);
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
              if (csrfFlag) {
                  this.csrfToken = resp.headers.get("csrf-token");
                  console.log("resp-csrf: " + this.csrfToken);
                  this.csrfLockAvl = true;
              }
              return resp.body;
          });
  }

  getAuthToken(userid:string,pwd:string): Observable<any> {
      console.log("req-csrf: " + this.csrfToken);
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
             /*  if (csrfFlag) {
                  this.csrfToken = resp.headers.get("csrf-token");
                  console.log("resp-csrf: " + this.csrfToken);
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
         observe: 'response', responseType: 'text'})
          .do(
              resp => resp,
              (err: HttpErrorResponse) => this.checkErrorStatus(err)
             )
          .map(resp => {
             /*  if (csrfFlag) {
                  this.csrfToken = resp.headers.get("csrf-token");
                  console.log("resp-csrf: " + this.csrfToken);
                  this.csrfLockAvl = true;
              } */
              this.sharedKey=resp.body;
              this.lastXForwardedFor=resp.headers.get('X-Request-For');
              console.log(resp);
              
              return resp.body;
          });
  }

  requestToken(username: string, password: string): Observable<any> {
    
    let basic = username + ':' + password;
    basic = btoa(basic);
    
    const headers = new HttpHeaders()
           // .set('Authorization', `Basic ${basic}`)
           .set('Content-Type', 'application/x-www-form-urlencoded')
           .set('Authorization', `Basic cmt2ZXJtYTpUZXN0aW5nMQ==`);
           
    console.log(`grant_type=password&username=${username}&password=Testing1&uid=${this.uid}`);
    
    const o:Observable<Token> = this.httpClient.post<Token>(`${appconfig.baseUrl}/authprovider/oauth/token`,
    `grant_type=password&username=${username}&password=Testing1&uid=${this.uid}`,
        {
        headers: headers
      })
    .map(response => {
       this.token=response;
       return response;
    });
    
    return o;
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
}
