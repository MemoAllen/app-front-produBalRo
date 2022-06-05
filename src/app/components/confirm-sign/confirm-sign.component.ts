import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm-sign',
  templateUrl: './confirm-sign.component.html',
  styleUrls: ['./confirm-sign.component.css']
})
export class ConfirmSignComponent implements OnInit {
  user: any = {};
  form: FormGroup;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(

  ) {
    this.form = this.formBuilder.group({
      token: '',
    });
  }

  submit() {
    const formData = this.form.getRawValue();

    const data = {
      ...formData,
      token: this.route.snapshot.params.token
    };
    this.authService.confirmSign(data)
      this.router.navigate(["/home"]);
  }
}
