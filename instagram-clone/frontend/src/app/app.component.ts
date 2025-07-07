import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { GalleryComponent } from './components/gallery/gallery.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    UploadPhotoComponent,
    GalleryComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  @ViewChild('gallery') galleryComponent!: GalleryComponent;

  // Cuando se sube una foto, refrescar la galería
  onPhotoUploaded(): void {
    setTimeout(() => {
      this.galleryComponent.refreshGallery();
    }, 500); // Esperar un poco para que se complete la subida
  }
}