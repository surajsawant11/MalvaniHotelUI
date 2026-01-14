import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  // Put images in: src/assets/images/gallery/
  images = [
    'assets/images/gallery/1.jpg',
    'assets/images/gallery/2.jpg',
    'assets/images/gallery/3.jpg',
    'assets/images/gallery/4.jpg',
    'assets/images/gallery/5.jpg',
    'assets/images/gallery/6.jpg',
  ];
}
