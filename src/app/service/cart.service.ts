import { Injectable } from '@angular/core';
import { User } from '../bean/user';
import { Product } from '../bean/product';
import { CartComponent } from '../cart/cart.component';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { environment }  from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Array<Product>;
  private service :Http;

  constructor(p_service:Http) {

    this.cart = new Array<Product>();
    this.service=p_service;

  }

  public getFullCart(): Observable<Array<Product>> {

      let options: RequestOptions = new RequestOptions();
      options.params = new URLSearchParams();
      let p_apikey:string = sessionStorage.getItem("apikey") ;
      options.params.set("apikey", p_apikey);
      let p_cart_id:string = sessionStorage.getItem("cart_id") ;
      options.params.set("cart_id", p_cart_id);
      //console.warn ("getFullCart(): options.params %o", options.params );

      return this.service.get(environment.getCartURL, options)
                        .map(
                          (rep: Response): Array<Product> => {
                            return rep.json() as Array<Product>;
                          }
                        );
    //return null;
  }

/*  
  public getFullCart(): Promise<Array<Product>> {
    let options: RequestOptions = new RequestOptions();
    options.params = new URLSearchParams();  
    options.params.set("apikey", "123");

    const promise: Promise<Array<Product>> = this.service.get(
      environment.getCartURL
    ).toPromise()
      .then(
        (rep: Response): Array<Product> => {
          return rep.json() as Array<Product>;
        }
      ).catch(
        (error: any): Promise<any> => {
          return Promise.reject(error);
        }
      );

    return promise;

  }
*/  
  //public addToCart(p_product:Product):void{
    //this.cart.push(p_product);
  public addToCart( p_product:Product )  :Promise<Object>{

      let promise:Promise<Object> = null;
      let body:URLSearchParams = new URLSearchParams();
      let headers:Headers = new Headers(
        {"Content-Type":"application/x-www-form-urlencoded"}
      );
      let options:RequestOptions = new RequestOptions();
      if( sessionStorage.getItem("apikey") ){
        let p_apikey:string = sessionStorage.getItem("apikey") ;
        body.set("apikey", p_apikey);      
      } else {
        //body.set("apikey", null);
        body.set("apikey", "123");
      }  
      if( sessionStorage.getItem("cart_id") ){
        let p_cart_id:string = sessionStorage.getItem("cart_id") ;
        body.set("cart_id", p_cart_id);      
      } else {
        //body.set("cart_id", null);
        body.set("cart_id", "1");
      }     
      body.set("product_id", p_product.id.toString());

      options.headers = headers ;

      promise = this.service.put(
                                environment.postCartURL,
                                body,
                                options
                              )
                              .toPromise()
                              .then(
                                ( rep:Response ):Object => {
                                  return rep.json();
                                }
                              )
                              .catch(
                                (error:any): Promise<any> => {
                                  return Promise.reject(error);
                                }
                              );
      return promise;
  }
/*
  public removeFromCart(p_product:Product):void{

    const index:number = this.cart.indexOf(p_product );
    if( index > -1 ){
      this.cart.splice(index, 1);
    }
  }
*/
  public removeFromCart( p_product:Product )  :Promise<Object>{


    let promise:Promise<Object> = null;
    let options:RequestOptions  = new RequestOptions();
    options.params              = new URLSearchParams();

    options.params.set("id", p_product.id.toString());
    options.params.set("api", "azerty123");

    promise = this.service.delete(
      environment.delCartURL,
      options
    )
      .toPromise()
      .then(
        ( rep:Response ):Object => {
          return rep.json();
        }
      )
      .catch(
        (error:any): Promise<any> => {
          return Promise.reject(error);
        }
      );

    return promise;
  }

  public getCartIdByUserId( p_id:number): Observable<string> {
    let options: RequestOptions = new RequestOptions();
    options.params = new URLSearchParams();

    options.params.set("user_id", p_id.toString());
    options.params.set("apikey", sessionStorage.getItem("apikey"));
    //console.warn("getCartIdByUserId():request options.params=%o", options.params );
    // To Do : check client right to access cart


    sessionStorage.setItem("cart_id", null);
    
    return this.service.get(environment.getCartIdURL, options)
                        .map
                        ( 
                          (rep: Response): string => 
                          {
                            //console.warn("getCartIdByUserId():response:%o", rep );
                            try 
                            {                              
                              let p_cart_id:string = rep.json().toString();
                              //console.warn("getCartIdByUserId():cart_id:%o", p_cart_id );
                              sessionStorage.setItem("cart_id", p_cart_id);
                              return p_cart_id as string;
                            }
                            catch 
                            {
                              //console.error("getCartIdByUserId(): undefined cart_id" );
                              return null;
                            }
                          }
                        );
  }


}
