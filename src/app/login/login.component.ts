import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model: any = {};
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  userRoles: string[] = [];
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // window.location.reload()
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Login bem-sucedido!', response);
        // Redirecionar após login bem-sucedido
        this.authService.getUser(this.username);
      },
      (error) => {
        console.error('Erro no login', error);
        // Exibir mensagem de erro ou tratar falhas
      }
    );
  }
}
