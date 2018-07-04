import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../bean/product';
import {ɵangular_packages_platform_browser_animations_animations_a} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private service:ProductService;
  private route:ActivatedRoute;

  public product:Product;

  constructor(p_service:ProductService, p_route:ActivatedRoute )
    {
      this.route = p_route;
      this.service = p_service;
      this.product = null;
    }

  ngOnInit() {
    this.route.params.subscribe
    (
      (p_params:Params ) =>
        {
          this.service.getProductById(p_params.id).then
          (
            (p_product:Product) =>
                {
                  this.product = p_product;
                  console.log( 'id=' + p_params.id);
                }
          );
        }
    );
  }

}
