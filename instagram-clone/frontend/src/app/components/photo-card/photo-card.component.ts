import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Photo, PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-photo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.css'
})
export class PhotoCardComponent {

  @Input() photo!: Photo;
  @Output() photoDeleted = new EventEmitter<string>(); // Notificar al padre

  deleting: boolean = false;

  constructor(private photoService: PhotoService) {}

  // Método para eliminar foto
  deletePhoto(): void {
    if (!confirm('¿Estás seguro de que quieres eliminar esta foto?')) {
      return;
    }

    this.deleting = true;

    this.photoService.deletePhoto(this.photo.id).subscribe({
      next: (response) => {
        console.log('Foto eliminada:', response);
        this.photoDeleted.emit(this.photo.id); // Notificar al componente padre
      },
      error: (error) => {
        console.error('Error al eliminar foto:', error);
        alert('Error al eliminar la foto');
        this.deleting = false;
      }
    });
  }

  getFormattedDate(): string {
    const date = new Date(this.photo.fechaSubida);
    return date.toLocaleDateString('es-ES');
  }

  getFormattedSize(): string {
    const sizeInMB = (this.photo.tamaño / (1024 * 1024)).toFixed(2);
    return `${sizeInMB} MB`;
  }
}