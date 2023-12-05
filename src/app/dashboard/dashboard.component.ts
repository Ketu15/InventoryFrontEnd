import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import html2canvas from 'html2canvas';
import { Product } from 'src/app/Models/Product.model';
import { ProductService } from '../Product/product.service';
import { UserService } from '../User/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('barChart') barChartRef!: ElementRef;
  @ViewChild('pieChart') pieChartRef!: ElementRef;
  @ViewChild('printExportChart') printExportChartRef!: ElementRef;

  products: Product[] = [];
  chartCreated = false;

  constructor(private productService: ProductService, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.listProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        if (!this.chartCreated && this.products.length > 0) {
          this.createBarChart();
          this.createPieChart();
          this.createPrintExportChart();
          this.chartCreated = true;
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    if (!this.chartCreated && this.products.length > 0) {
      this.createBarChart();
      this.createPieChart();
      this.createPrintExportChart();
      this.chartCreated = true;
    }
  }

  createBarChart(): void {
    const ctx = this.barChartRef.nativeElement.getContext('2d');
    const productNames = this.products.map(product => product.productName);
    const productDiscount = this.products.map(product => product.discount);
    const productQuantities = this.products.map(product => product.quantity);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: productNames,
        datasets: [
          {
            label: 'Product Discount',
            data: productDiscount,
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', /* Add more colors */],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', /* Add more colors' border */],
            borderWidth: 1
          },
          {
            label: 'Product Quantities',
            data: productQuantities,
            backgroundColor: ['rgba(255, 206, 86, 0.6)', 'rgba(54, 162, 235, 0.6)', /* Add more colors */],
            borderColor: ['rgba(255, 206, 86, 1)', 'rgba(54, 162, 235, 1)', /* Add more colors' border */],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 500,
            max: 250,
            min: 0
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Bar Chart', // Title for the bar chart
            position: 'top', // Display title on top
            font: {
              weight: 'bold',
              size: 20
            }
          }
        }
      }
    });
  }
  
  createPieChart(): void {
    const ctx = this.pieChartRef.nativeElement.getContext('2d');
    const productNames = this.products.map(product => product.productName);
    const productQuantities = this.products.map(product => product.quantity);
  
    const pieChartColors = [
      'rgba(0, 102, 204, 0.6)', // Darker blue
      'rgba(51, 204, 51, 0.6)', // Darker green
      'rgba(204, 0, 0, 0.6)', // Darker red
      'rgba(255, 102, 178, 0.6)', // Darker pink
      'rgba(153, 51, 255, 0.6)', // Darker purple
      // Add more colors as needed
    ];
  
    const pieChartColorsLight = [
      'rgba(0, 102, 204, 0.3)', // Lighter blue
      'rgba(51, 204, 51, 0.3)', // Lighter green
      'rgba(204, 0, 0, 0.3)', // Lighter red
      'rgba(255, 102, 178, 0.3)', // Lighter pink
      'rgba(153, 51, 255, 0.3)', // Lighter purple
      // Add more lighter colors as needed
    ];
  
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: productNames,
        datasets: [
          {
            label: 'Product Quantities',
            data: productQuantities,
            backgroundColor: pieChartColors,
            hoverBackgroundColor: pieChartColorsLight,
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Pie Chart', // Title for the pie chart
            position: 'top', // Display title on top
            font: {
              weight: 'bold',
              size: 20
            }
          }
        }
      }
    });
  }
  


  exportChart(canvas: HTMLCanvasElement): void {
    html2canvas(canvas).then((canvas) => {
      const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'chart.png';
      link.click();
    });
  }

  printChart(canvas: HTMLCanvasElement): void {
    const image = canvas.toDataURL('image/png');
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`<img src="${image}" style="max-width:100%;">`);
      win.document.close();
      win.print();
    }
  }

  createPrintExportChart(): void {
    const ctx = this.printExportChartRef.nativeElement.getContext('2d');
    const productNames = this.products.map(product => product.productName);
    const productPrices = this.products.map(product => product.price);
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: productNames,
        datasets: [
          {
            label: 'Product Prices',
            data: productPrices,
            backgroundColor: [
              '#e67e22', // Darker orange
              '#2980b9', // Darker blue
              '#9b59b6', // Darker purple
              '#34495e', // Darker gray
              // Add more colors as needed to match the number of data points
            ],
            borderColor: [
              '#e67e22', // Darker orange border
              '#2980b9', // Darker blue border
              '#9b59b6', // Darker purple border
              '#34495e', // Darker gray border
              // Add more colors' border as needed to match the number of data points
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            color: '#000', // Label color
            font: {
              weight: 'bold'
            }
          },
          title: {
            display: true,
            text: 'Print & Export Chart', // Title for the print and export chart
            position: 'top', // Display title on top
            font: {
              weight: 'bold',
              size: 16
            }
          }
        }
      },
      plugins: [ChartDataLabels] // Add the ChartDataLabels plugin here
    });
  
    const canvas = this.printExportChartRef.nativeElement.getContext('2d').canvas;
  
    // Trigger export and print actions
    const exportButton = document.getElementById('exportButton');
    const printButton = document.getElementById('printButton');
  
    if (exportButton && printButton) {
      exportButton.addEventListener('click', () => {
        this.exportChart(canvas);
      });
  
      printButton.addEventListener('click', () => {
        this.printChart(canvas);
      });
    }
  }
  
}  