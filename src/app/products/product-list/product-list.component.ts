import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router, RouterLink } from '@angular/router';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductSearchComponent,
    CurrencyFormatPipe,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    ProductSearchComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  filteredProducts!: Product[];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((product) => {
      this.products = product.sort((a, b) => b.id - a.id);
      this.filteredProducts = this.products;
      console.log('filtered products', this.filteredProducts);
    });
  }

  onSearch(term: string): void {
    if (term) {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  addProduct(): void {
    this.router.navigate(['/products/add']).then(() => {
      this.productService.getProducts().subscribe((product) => {
        this.products = product.sort((a, b) => b.id - a.id);
        this.filteredProducts = this.products;
      });
    });
  }
}
