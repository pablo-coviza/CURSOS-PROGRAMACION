// src/app/services/photo.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ INTERFAZ CORREGIDA - Agregar campo 'id'
export interface Photo {
  id: string;              // ← AGREGAR ESTA LÍNEA
  nombre: string;
  nombreOriginal: string;
  ruta?: string;           // Opcional, a veces no lo necesitamos en frontend
  url: string;
  tamaño: number;
  fechaSubida: string;
  descripcion: string;
  createdAt?: string;      // Campos opcionales de MongoDB
  updatedAt?: string;      // Campos opcionales de MongoDB
}

export interface PhotoResponse {
  mensaje: string;
  fotos: Photo[];
}

export interface UploadResponse {
  mensaje: string;
  foto: Photo;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private readonly API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAllPhotos(): Observable<PhotoResponse> {
    return this.http.get<PhotoResponse>(`${this.API_URL}/fotos`);
  }

  uploadPhoto(file: File, description: string): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('foto', file);
    formData.append('descripcion', description);

    return this.http.post<UploadResponse>(`${this.API_URL}/fotos`, formData);
  }

  getPhoto(id: string): Observable<Photo> {
    return this.http.get<Photo>(`${this.API_URL}/fotos/${id}`);
  }

  // ✅ MÉTODO DELETE (verificar que esté presente)
  deletePhoto(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/fotos/${id}`);
  }
}