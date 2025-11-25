import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Productito } from '../../../core/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Productito[] = [];

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.allProducts().subscribe({
      next: (res) => {
        this.products = res.data || res;
      },
      error: () => {
        this.toastr.error('No se pudieron cargar los productos');
      }
    });
  }

}
