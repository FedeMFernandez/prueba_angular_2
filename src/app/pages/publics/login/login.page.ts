import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequestDTO } from 'src/app/commons/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  logo: string = './../../../../assets/images/happy-linux.png';

  form: FormGroup;
  emailControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl,
    });
  }

  async submitEventHandler(value: LoginForm): Promise<void> {
    try {
      await this.authService.login(value as LoginRequestDTO);
      this.router.navigate(['shopping']);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }
}

interface LoginForm {
  email: string;
  password: string;
}
