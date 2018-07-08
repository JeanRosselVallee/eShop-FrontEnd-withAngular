import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { RouterModule }     from '@angular/router';
import { HttpModule }       from '@angular/http';

import { AppComponent }           from './app.component';
import { CatalogComponent }       from './catalog/catalog.component';
import { ProductThumbComponent }  from './product-thumb/product-thumb.component';

import { AlphaPipe }      from './pipe/alpha.pipe';
import { PricePipe }      from './pipe/price.pipe';
import { HomeComponent }  from './home/home.component';
import { ProductService } from './service/product.service';
import { CartService }    from './service/cart.service';
import { CartComponent }  from './cart/cart.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UserService }      from './service/user.service';
import { UserComponent } from './user/user.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    ProductThumbComponent,
    AlphaPipe,
    PricePipe,
    HomeComponent,
    CartComponent,
    AdminProductComponent,
    ProductDetailComponent,
    UserComponent,
    WorkInProgressComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      [
        {
          path: "home",
          component: HomeComponent,
          pathMatch: 'full'
        },
        {
          path: "catalog",
          component: CatalogComponent,
          pathMatch: 'full'
        },
        {
          path: "detail/:id",
          component: ProductDetailComponent,
          pathMatch: 'full'
        },
        {
          path: "cart",
          component: CartComponent,
          pathMatch: 'full'
        },
        {
          path: "login",
          component: UserComponent,
          pathMatch: 'full'
        },
        {
          path: "cart",
          component: CartComponent,
          pathMatch: 'full'
        },
        {
          path: "subscribe",
          component: UserComponent,
          pathMatch: 'full'
        },
        {
          path: "admin/catalog",
          component: AdminProductComponent,
          pathMatch: 'full'
        },
        {
          path: "admin/users",
          component: UserComponent,
          pathMatch: 'full'
        },
        {
          path: "users/remove",
          component: UserComponent,
          pathMatch: 'full'
        },
        {
          path: "users/update",
          component: UserComponent,
          pathMatch: 'full'
        },
        {
          path: "carts",
          component: CartComponent,
          pathMatch: 'full'
        },
        {
          path: "carts/remove",
          component: CartComponent,
          pathMatch: 'full'
        },
        {
          path: "carts/add-product",
          component: CartComponent,
          pathMatch: 'full'
        },
        {
          path: "carts/remove-product",
          component: CartComponent,
          pathMatch: 'full'
        },
        {
          path: "products/add",
          component: CatalogComponent,
          pathMatch: 'full'
        },
        {
          path: "products/remove",
          component: CatalogComponent,
          pathMatch: 'full'
        },
        {
          path: "products/update",
          component: CatalogComponent,
          pathMatch: 'full'
        },
        {
          path: "me",
          component: UserComponent,
          pathMatch: 'full'
        }
      ],
      {
        useHash: true
      }
    )
  ],
  providers: [ProductService, CartService, UserService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
