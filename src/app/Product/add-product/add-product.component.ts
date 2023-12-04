import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/Models/Product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  newProduct: Product = new Product(); // Create a new Product instance

  constructor(private productService: ProductService, private router: Router) {}

  addProduct(): void {
    this.productService.addProduct(this.newProduct)
      .subscribe(
        (response) => {
          console.log('Product added:', response);
          // Handle success, e.g., show a success message or navigate to another page
        },
        (error) => {
          console.error('Error adding product:', error);
          // Handle error, show error message to the user
        }
      );
  }

  cancel(): void {
    this.router.navigate(['/list-product']); // Navigate to the list product page
  }
}
