import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type DishCategory = 'Seafood' | 'Chicken' | 'Veg' | 'Beverages';

interface Dish {
  name: string;
  desc: string;
  price: string;
  category: DishCategory;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  categories: DishCategory[] = ['Seafood', 'Chicken', 'Veg', 'Beverages'];
  selectedCategory: DishCategory | 'All' = 'All';

  dishes: Dish[] = [
    { name: 'Surmai Fry', desc: 'Crispy kingfish fry', price: '₹320', category: 'Seafood' },
    { name: 'Prawn Sukka', desc: 'Dry coconut prawn masala', price: '₹360', category: 'Seafood' },
    { name: 'Bombil Fry', desc: 'Crispy Bombay duck fry', price: '₹220', category: 'Seafood' },

    { name: 'Chicken Malvani', desc: 'Spicy coconut chicken curry', price: '₹280', category: 'Chicken' },
    { name: 'Chicken Sukka', desc: 'Dry roasted Malvani style', price: '₹260', category: 'Chicken' },

    { name: 'Veg Kolhapuri', desc: 'Spicy veg gravy', price: '₹180', category: 'Veg' },
    { name: 'Paneer Masala', desc: 'Creamy paneer curry', price: '₹210', category: 'Veg' },

    { name: 'Solkadhi', desc: 'Refreshing kokum drink', price: '₹60', category: 'Beverages' },
    { name: 'Buttermilk', desc: 'Chaas with curry leaves', price: '₹40', category: 'Beverages' },
  ];

  get filteredDishes() {
    if (this.selectedCategory === 'All') return this.dishes;
    return this.dishes.filter((d) => d.category === this.selectedCategory);
  }

  selectCategory(cat: DishCategory | 'All') {
    this.selectedCategory = cat;
  }
}
