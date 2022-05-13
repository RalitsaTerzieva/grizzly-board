import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {Router} from '@angular/router';

interface LoginFormData {
  email: string;
  password: string;
}

const parseJwt = (token: string) => {
  try {
    return atob(token.split('.')[1]);
  } catch (e) {
    return null;
  }
};
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form: LoginFormData = {
    email: "",
    password: "",
  };
  isSuccessful: boolean = false;
  isLoginFailed: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token)
        this.tokenStorage.saveUser(parseJwt(data.token))
        this.isSuccessful = true;
        this.isLoginFailed = false;
        this.router.navigate(['/profile'])
        window.location.href = '/profile'
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
