import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { CartService } from '../service/cart.service';
import { User } from '../bean/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public catalog: Array<User>;
  private service:UserService;
  private service2:CartService;
  public user:User;
  public user_id:string;

  constructor( p_service:UserService, p_service2:CartService ) { 

    this.user = new User();
    this.service = p_service;
    this.service2 = p_service2;
  }

  public loginHandler(a_user:User):void{
    
    this.service.auth( a_user.email, a_user.password ).subscribe(
      (p_user:User) => {
        this.user = p_user;  
        sessionStorage.setItem("apikey", p_user.apikey);     

//        this.service2 = p_service2;


        this.service2.getCartIdByUserId(p_user.id).subscribe
        (
          p_cart_id =>  
          {
            //sessionStorage.setItem("cart_id", p_cart_id);
            console.warn ("loginHandler(): service2 - Login Sucessful %s", p_cart_id )
          }
        )
        ;
             
        console.warn ("loginHandler(): service1 - user %o", this.user );


      }
    );
  }

  ngOnInit() {

    if  ( sessionStorage.getItem("apikey") != "null" &&
          sessionStorage.getItem("user_id") != "null"
        )
    {
      this.service.getUsers().subscribe
      (
        ( p_users: Array<User> ) =>
          {
            this.catalog = p_users;
          }
      );
    }
  }

}
