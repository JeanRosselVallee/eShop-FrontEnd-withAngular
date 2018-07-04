import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Product } from '../bean/product';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private service:CartService;
  public data:Product;
  public cart:Array<Product>;
  public cart_id:string;

  constructor( p_service:CartService, p_route:ActivatedRoute ) 
  {
    this.data = new Product();
    this.service = p_service;
    this.cart = new Array<Product>();
  }

  public delCartHandler(p_product:Product):void{
    this.service.removeFromCart(p_product).then(
      () => {
        this.ngOnInit();
        //window.location.reload();
      }
    );
  }
  /*
  public remove( p_product:Product ):void{
    this.service.removeFromCart(p_product);
        window.location.reload();
  }
*/
  ngOnInit() {

    if  ( sessionStorage.getItem("apikey") != "null" &&
          sessionStorage.getItem("cart_id") != "null"
        )
    {
      this.service.getFullCart().subscribe
      (
        (p_products:Product[] ) =>
          {
            //this.service.getFullCart().then
            //(p_products:Product[]) => {
                this.cart = p_products;
            // }
          }
      );
    }
    /*
    this.service.getFullCart().then(
      ( p_products:Product[]) => {
        this.cart = p_products;
      }
    );
*/



  }

}
