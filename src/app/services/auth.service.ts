import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {







  private URL = 'http://localhost:4000/api';
  constructor(private http: HttpClient, private router: Router) { }

  //metodo pra el signup en el formulario
  signUpUser(user) {
    return this.http.post<any>(this.URL + '/signup', user);
  }

  // Metodo para el signin en el formulario
  signInUser(user) {
    return this.http.post<any>(this.URL + '/signin', user);
  }

  // MEtodo para usar en los guards
  // Si existe un token retorna true si no false
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  getToken() {
    return localStorage.getItem('token');
  }



  forgotPasword(user){
    return this.http.post(this.URL + '/forgot',user,{
    });
  }
}
