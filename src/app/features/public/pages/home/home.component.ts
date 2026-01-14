import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  popularDishes = [
    {
      name: 'Surmai Fry',
      desc: 'Crispy kingfish fry with Malvani masala.',
      price: '₹320',
    },
    {
      name: 'Chicken Malvani',
      desc: 'Spicy coconut curry, authentic coastal taste.',
      price: '₹280',
    },
    {
      name: 'Prawn Sukka',
      desc: 'Dry roasted prawns with curry leaves.',
      price: '₹360',
    },
  ];
}
