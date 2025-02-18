import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): Observable<boolean> {
//     return this.authService.getUser().pipe(
//       map(user => !!user),  // Verifica se o usuário está autenticado
//       tap(isAuthenticated => {
//         if (!isAuthenticated) {
//           this.router.navigate(['/login']);  // Redireciona para a tela de login se não autenticado
//         }
//       })
//     );
//   }
// }

canActivate(): boolean {
  if (this.authService.isLoggedIn()) {
    return true;  // Permite acesso se o usuário está logado
  } else {
    // Redireciona para a página de login se o usuário não estiver logado
    this.router.navigate(['/login']);
    return false;
  }
}
}
