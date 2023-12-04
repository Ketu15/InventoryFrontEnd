import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Models/Product.model';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  id!: number;
  product: Product = new Product();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fetchProduct(this.id);
    });
  }

  fetchProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (data: Product) => {
        this.product = data;
      },
      (error) => {
        console.error('Error fetching product:', error);
        // Handle error, show error message to the user or navigate back
      }
    );
  }

  updateProduct(): void {
    this.productService.updateProduct(this.product).subscribe(
      (response) => {
        console.log('Product updated:', response);
        // Handle success, e.g., show a success message or navigate to another page
      },
      (error) => {
        console.error('Error updating product:', error);
        // Handle error, show error message to the user
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/list-product']); // Navigate to the list product page
  }
}