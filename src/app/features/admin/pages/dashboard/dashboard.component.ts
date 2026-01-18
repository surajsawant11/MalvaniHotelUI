import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  stats = [
    { title: 'Total Orders', value: 128, icon: '🧾' },
    { title: 'Menu Items', value: 42, icon: '🍤' },
    { title: 'Customers', value: 89, icon: '👥' },
    { title: 'Revenue', value: '₹ 38,450', icon: '💰' },
  ];

  recentOrders = [
    { id: 'ORD001', customer: 'Rahul Patil', amount: '₹450', status: 'Delivered' },
    { id: 'ORD002', customer: 'Sneha Kadam', amount: '₹620', status: 'Pending' },
    { id: 'ORD003', customer: 'Akash Desai', amount: '₹250', status: 'Cancelled' },
    { id: 'ORD004', customer: 'Neha Sawant', amount: '₹980', status: 'Delivered' },
  ];
}
