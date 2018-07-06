import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { User } from '../bean/User';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private service: Http;
  private currentUser: User;
  public obsUser:Subject<User>;

  constructor(p_http: Http) {
    this.service = p_http;
    this.currentUser = this.retrieveUser();
    this.obsUser = new Subject<User>();
  }

  private retrieveUser(){
    if( sessionStorage.getItem("apikey") ){

      let user:User = new User();
      user.id       = parseInt(sessionStorage.getItem("id"));
      user.apikey   = sessionStorage.getItem("apikey");
      user.name     = sessionStorage.getItem("name");
      user.email    = sessionStorage.getItem("email");
      user.password = sessionStorage.getItem("password");
      user.admin    = sessionStorage.getItem("admin") == "1";

      return user;
    }

    return null;
  }

  private setCurrentUser( user:User ){
    this.currentUser = user;
    sessionStorage.setItem("name"     , user.name             );
    sessionStorage.setItem("email"    , user.email            );
    sessionStorage.setItem("password" , user.password         );
    sessionStorage.setItem("admin"    , user.admin ? "1" : "0");
    sessionStorage.setItem("id"       , user.id.toString()    );
    sessionStorage.setItem("apikey"   , user.apikey           );
  }


  public removeUser( p_id:number ):Observable<boolean>{
    let options: RequestOptions = new RequestOptions();
    options.params = new URLSearchParams();
    options.params.set("user_id", p_id.toString());

    if (this.currentUser == null) {
      options.params.set("apikey", null);
    } else {
      options.params.set("apikey", this.currentUser.apikey);
    }

    return this.service.delete(environment.delUserUrl, options)
                        .map(
                              ( rep:Response):boolean => {

                                let data:any = rep.json();

                                if( data.message == "error"){
                                  return false;
                                }
                                else{
                                  return true;
                                }
                                
                              }
                            )
  }

  public addUser( p_name:string, p_email:string, p_password:string):Observable<boolean>{
    let body:URLSearchParams = new URLSearchParams();
    body.set("name", p_name );
    body.set("password", p_password);
    body.set("email", p_email);


    let headers = new Headers( 
      { "Content-Type": "application/x-www-form-urlencoded" }
    )

    let options:RequestOptions = new RequestOptions();
    options.headers = headers;

    return this.service.post(environment.addUserUrl, body, options).map(
      (rep:Response):boolean => {
          let data:any = rep.json();

          if( data.message == "error")
            return false;
          else
            return true;
      }
    );
  }

  public getUsers(): Observable<Array<User>> {
    let options: RequestOptions = new RequestOptions();
    options.params = new URLSearchParams();

    if (this.currentUser == null) {
      options.params.set("apikey", null);
    } else {
      options.params.set("apikey", this.currentUser.apikey);
    }
    // Debug : check values of sent parameters
    // console.warn ("getUsers():options.params %o", options.params );

    return this.service.get(environment.getUsersUrl, options)
                        .map(
                          (rep: Response): Array<User> => {
                            console.warn ("getUsers():rep.json() %o", rep.json() );
                            return rep.json() as Array<User>;
                          }
                        );
  }

  public getUserById( p_id:number): Observable<User> {
    let options: RequestOptions = new RequestOptions();
    options.params = new URLSearchParams();

    if (this.currentUser == null) {
      options.params.set("apikey", null);
    } else {
      options.params.set("apikey", this.currentUser.apikey);
    }

    options.params.set("user_id", p_id.toString());

    return this.service.get(environment.getUsersUrl, options)
                        .map(
                          (rep: Response): User => {
                            return rep.json()[0] as User;
                          }
                        );
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }



  public auth(p_email: string, p_password: string): Observable<User> {

    let body: URLSearchParams = new URLSearchParams();
    let headers: Headers = new Headers(
      { "Content-Type": "application/x-www-form-urlencoded" }
    );

    let options: RequestOptions = new RequestOptions();
    options.headers = headers;

    body.set("email", p_email);
    body.set("password", p_password);
    console.warn ("auth():body %o", body );
    
    return this.service.post(
                          environment.authUrl, 
                          body, 
                          options)
      .map(
        (rep: Response): User => {

          try {
            console.warn ("auth():rep.json() %o", rep.json() );
            let item: User = rep.json() as User;  
            console.warn ("auth():item %o", item );
            this.setCurrentUser(item);
            this.obsUser.next(this.currentUser);
            console.warn ("auth():currentUser %o", this.currentUser );

            console.warn ("auth():user %o", this.currentUser );
            return this.currentUser;
          }
          catch (error) {
            return null;
          }

        }
      );

  }



}
