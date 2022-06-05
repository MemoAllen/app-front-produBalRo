import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {
  user: any = {};
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: '',
      password_confirm: '',
    });
  }

  /////////

  submit() {
    const formData = this.form.getRawValue();

    const data = {
      ...formData,
      token: this.route.snapshot.params.token
    };
    this.authService.resetPassword(data).subscribe(res => {
      this.router.navigate(["/signin"]);
      console.log("success reset");

    });
  }
}
