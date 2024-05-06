import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private authService: AuthService, private router: Router,private spinner: NgxSpinnerService,) {}

  login() {
    this.spinner.show();
    this.authService.login(this.email, this.senha).subscribe()
  }

  isEmailValid(email: string): boolean {
    // Verifica se o email contém "@" e ".com"
    return email.includes('@') && email.includes('.com');
  }
}