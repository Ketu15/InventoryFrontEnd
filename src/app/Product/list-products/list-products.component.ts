import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/Models/Product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router,) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.listProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  editProduct(id: number): void {
    this.router.navigate(['/update-product', id]);
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      (deletedProduct) => {
        console.log('Product deleted:', deletedProduct);
        // After deletion, refresh the product list
        this.fetchProducts();
      },
      (error) => {
        console.error('Error deleting product:', error);
        // Handle error, show error message to the user
      }
    );
  }

  addNewProduct(): void {
    this.router.navigate(['/add-product']);
  }
}