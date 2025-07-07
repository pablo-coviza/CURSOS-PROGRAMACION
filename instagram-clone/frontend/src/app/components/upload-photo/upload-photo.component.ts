// src/app/components/upload-photo/upload-photo.component.ts

import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-upload-photo',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Necesarios para ngIf, ngFor y ngModel
  templateUrl: './upload-photo.component.html',
  styleUrl: './upload-photo.component.css'
})
export class UploadPhotoComponent {

  @Output() photoUploaded = new EventEmitter<void>();

  // Propiedades del componente
  selectedFile: File | null = null;
  description: string = '';
  previewUrl: string | null = null;
  uploading: boolean = false;
  message: string = '';
  isSuccess: boolean = false;

  constructor(private photoService: PhotoService) {}

  // Cuando el usuario selecciona un archivo
  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      // Crear vista previa
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Cuando se envía el formulario
  onSubmit(): void {
    if (!this.selectedFile) {
      this.showMessage('Por favor selecciona una foto', false);
      return;
    }

    this.uploading = true;
    this.message = '';

    // Llamar al servicio para subir la foto
    this.photoService.uploadPhoto(this.selectedFile, this.description).subscribe({
      next: (response) => {
        this.showMessage('¡Foto subida exitosamente!', true);
        this.resetForm();
        this.uploading = false;
        this.photoUploaded.emit(); // Notificar que se subió foto
      },
      error: (error) => {
        console.error('Error al subir foto:', error);
        this.showMessage('Error al subir la foto. Intenta de nuevo.', false);
        this.uploading = false;
      }
    });
  }

  // Resetear el formulario
  resetForm(): void {
    this.selectedFile = null;
    this.description = '';
    this.previewUrl = null;
    this.message = '';
  }

  // Mostrar mensajes
  private showMessage(text: string, success: boolean): void {
    this.message = text;
    this.isSuccess = success;
  }
}