// src/app/components/gallery/gallery.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService, Photo } from '../../services/photo.service';
import { PhotoCardComponent } from '../photo-card/photo-card.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, PhotoCardComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {

  photos: Photo[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private photoService: PhotoService) {}

  // Se ejecuta cuando el componente se carga
  ngOnInit(): void {
    this.loadPhotos();
  }

  // Cargar fotos desde el backend
  loadPhotos(): void {
    this.loading = true;
    this.error = '';

    this.photoService.getAllPhotos().subscribe({
      next: (response) => {
        //console.log('📸 Fotos cargadas:', response);
        this.photos = response.fotos || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Error cargando fotos:', error);
        this.error = 'Error al cargar las fotos';
        this.loading = false;
      }
    });
  }

  // Método para refrescar la galería (útil después de subir foto)
  refreshGallery(): void {
    this.loadPhotos();
  }

  // Agregar método para manejar eliminación
  onPhotoDeleted(photoId: string): void {
    // Remover la foto del array local
    this.photos = this.photos.filter(photo => photo.id !== photoId);
    console.log(`Foto ${photoId} eliminada de la galería`);
  }
}