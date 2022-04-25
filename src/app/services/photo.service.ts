import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import {Photo} from '../interfaces/Photo'

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  //URL del back para crear nuestras fotos
  URI = 'http://localhost:4000/api/photos';

  constructor(private http: HttpClient) { }


  //Este es el metodo service para crear la foto
  createPhoto(title: string, description: string, photo: File) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', photo);
    return this.http.post(this.URI, fd);
  }

  //Traer todas las fotos
  getPhotos(filter) {
    return this.http.get<Photo[]>(`${this.URI}/${filter}`);
    }

  getPhoto(id: string) {
    return this.http.get<Photo>(`${this.URI}/${id}`);
  }

  deletePhoto(id: string) {
    return this.http.delete(`${this.URI}/${id}`);
  }

  updatePhoto(id: string, title: string, description: string) {
    return this.http.put(`${this.URI}/${id}`, {title, description});
  }



}
