import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  highlights = [
    {
      title: 'Authentic Malvani Taste',
      desc: 'Traditional recipes with coastal spices and coconut-based gravies.',
    },
    {
      title: 'Fresh Seafood Daily',
      desc: 'Fresh catch, hygienic cooking and high-quality ingredients.',
    },
    {
      title: 'Family Friendly',
      desc: 'Warm hospitality and comfortable dining experience for all.',
    },
  ];
}
