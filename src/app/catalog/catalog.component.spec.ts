import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogComponent } from './catalog.component';
import { FormsModule } from '@angular/forms';
import { AlphaPipe } from '../pipe/alpha.pipe';
import { PricePipe } from '../pipe/price.pipe';
import { RouterTestingModule } from './pipe/price.pipe';
import { Http, HttpModule } from '@angular/http';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';


describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AlphaPipe,
        PricePipe,
        RouterTestingModule,
        HttpModule,
        ProductService,
        CartService
      ],
      declarations: [ CatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
