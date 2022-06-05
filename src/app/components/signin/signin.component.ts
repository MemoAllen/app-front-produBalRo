import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user:any = {};

  hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog:MatDialog
  ) { }
  loginForm = this.fb.group({
    username: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
  });

  ngOnInit() {
  }

  signIn() {
    this.authService.signInUser(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/photos']);
        },
        err => console.log(err)
      )
  }



  forgotPassword(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(ForgotPasswordComponent,dialogConfig);
  }


  lentrasOnly(event: any): boolean {
    var inp = String.fromCharCode(event.keyCode);
    if (/^[a-zA-Z\-_\s\@\.]*$/i.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }


  getErrorMessage(field: string): string {
    let message = '';
    var form = this.loginForm.get(field);
    if (form != null) {
      if (form.hasError('required')) {
        message = 'Campo Requerido';
      } else if(form.hasError('maxlength')){
        message = 'El máximo debe ser 10 caracteres';
      }else if (form.hasError('minlength')) {
        message = 'El minimo debe ser 3 caracteres';
      }
    }
    return message;
  }


  getErrorMessagePassword(field: string): string {
    let message = '';
    var form = this.loginForm.get(field);
    if (form != null) {
      if (form.hasError('required')) {
        message = 'Campo Requerido';
      } else if(form.hasError('maxlength')){
        message = 'El máximo debe ser 15 caracteres';
      }else if (form.hasError('minlength')) {
        message = 'El minimo debe ser 3 caracteres';
      }
    }
    return message;
  }

  isValidField(field: string): boolean {
    var form = this.loginForm.get(field);
    let flag = false;

    if (form != null) {
      flag = form.touched || (form.dirty && !form.valid);
    }
    return flag;
  }
}
