import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,BehaviorSubject, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserResponse } from '../interfaces/Photo';
import { catchError, map } from 'rxjs/operators';

const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInn = new BehaviorSubject<boolean>(false);


  private URL = 'http://localhost:4000/api';
  private URL2= 'http://localhost:4000/api/reset';
  private URL3= 'http://localhost:4000/api/confirm';
  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();

  }


  //metodo pra el signup en el formulario
  signUpUser(user) {
    return this.http.post<any>(this.URL + '/signup', user);
  }

  // Metodo para el signin en el formulario
  signInUser(user) {

    return this.http.post<UserResponse>(
      this.URL+'/signin', user)
      .pipe(
        map((user: UserResponse) => {
          console.log(user)
          if (user.code == 0) {
            this.saveLocalStorage(user);
            this.loggedInn.next(true);

          }

          return user;
        }),
        catchError((err) => this.handlerError(err))
      );
//return this.http.post<any>(this.URL + '/signin', user);
  }

  // MEtodo para usar en los guards
  // Si existe un token retorna true si no false
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedInn.next(false);
    this.router.navigate(['/home']);
  }

  getToken() {
    return localStorage.getItem('token');
  }



  forgotPasword(user){
    return this.http.post(this.URL + '/forgot',user,{
    });
  }


  confirmSign(token:any){
    this.router.navigate(['/home']);
  }

  resetPassword(token:any){
    return this.http.post(`${this.URL2}`,token,{

    });
    //`${this.URI}/${id}`
  }


    // checa el token
    checkToken() {
      const jsonUser = localStorage.getItem('user');
      if (jsonUser) {
        const user = JSON.parse(jsonUser);
        if (user) {
          const IsExpired = helper.isTokenExpired(user.token);
          if (IsExpired) {
            this.logout();
          } else {
            this.loggedInn.next(true);
          }
        }
      }
    }


  handlerError(error: any): Observable<never> {
    let errorMessage = 'Ocurrio un error';
    if (error) {
      error = `Error:${error.message}`;
    }

    return throwError(errorMessage);
  }

    saveLocalStorage(user: UserResponse) {
      const { code, message, ...rest } = user;
      localStorage.setItem('user', JSON.stringify(rest));
    }
}
