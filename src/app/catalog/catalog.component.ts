import { Component, OnInit } from '@angular/core';
import {Product} from '../bean/product';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  public catalog: Array<Product>;
  public nom:string;
  public prix:number;
  private service:ProductService;
  private myCartService:CartService;

  constructor(
    p_service:ProductService,
    p_service2:CartService
  ) {

    this.nom            = "";
    this.prix           = 10000;
    this.service        = p_service;
    this.myCartService  = p_service2;
    this.catalog        = new Array<Product>();
  }

  public addToCart(p_product:Product):void{
    //alert(p_product.title+" a été ajouté au panier !");

    this.myCartService.addToCart(p_product);
  }

  public ngOnInit():void {
    /*
    let promise: Promise<void>;
    let textArea: HTMLElement = document.getElementById('errorArea');
    promise = this.service.getProducts()
        .then   (
                  (products:Array<Product>): void => 
                  {
                    this.catalog = products;
                    textArea.style.display = "none";
                  }
                )
        .catch  (
                  (error: any): void => 
                  {
                    console.log(error);
                    textArea.textContent = error ;
                    textArea.style.display = "block";
                  }
                )
    ;  
    */ 
    
    this.service.getProducts().then(
      (products:Array<Product>) => {
        this.catalog = products;
      }

    ).catch(
      (error:any) => {
        console.log(error);
        document.getElementById('errorArea').textContent = 'ERROR:' + error ;
      }
    );
    
  }

}
