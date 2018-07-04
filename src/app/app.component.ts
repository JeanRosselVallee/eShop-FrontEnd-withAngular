import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { User } from './bean/User';
import { Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isAdmin: boolean=false;  
  private _userService:UserService;
  public currentUserName:string;
  
  constructor(p_service: UserService) 
  {
    this._userService = p_service;
    this.ngOnInit(); 
/*
    p_service.auth("admin@boutique.fr", "9cf95dacd226dcf43da376cdb6cbba7035218921").subscribe(
      () => {
        p_service.addUser("Pepito","pepito@ib.com", "azerty").subscribe(
          (success: boolean) => {
            if (success) {
              alert("utilisateur ajouté !");
            }
          }
        )
      }
    );
*/
  }

  public checkIsAdmin():void 
  {
    this._userService.obsUser.subscribe
    (
      (user:User) => 
      {
        //console.warn("checkIsAdmin():user=%o", user );
        this.isAdmin = user.admin;
        console.warn("checkIsAdmin():isAdmin=%s", this.isAdmin.toString() );
        this.currentUserName=sessionStorage.getItem("name");
        //sessionStorage.setItem("isAdmin", user.admin.toString())
      }
    );
  }

  
  ngOnInit() 
  {
    this.checkIsAdmin();
  }
  
}
