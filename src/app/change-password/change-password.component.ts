import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  changePasswordForm!: FormGroup;
  router: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private dataService: DataService) {}

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
    
  }
  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      const confirmPassword = this.changePasswordForm.get('confirmPassword')?.value;

      if (newPassword === confirmPassword) {
        this.authService.changePassword(newPassword).subscribe(
          response => {
            console.log('Senha alterada com sucesso');
            this.router.navigate(['/login']);
          },
          error => {
            console.error('Erro ao alterar a senha', error);
          }
        );
        console.log('Senhas coincidem, prossiga com a troca de senha');
      } else {
        console.log('As senhas não coincidem');
      }
    }
  }
}
