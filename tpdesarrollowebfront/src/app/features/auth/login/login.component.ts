import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public loginForm: FormGroup;
  public errorMessage: string | null = null;//Esto es mostrar errores

  constructor() {//Se crea el formulario reactivo
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();//Muestra errores si el form es invalido
      return;
    }

    this.errorMessage = null;//Limpia errores previos
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({//Acá se llama al servicio
      next: () => this.router.navigate(['/dashboard']),//Si el servicio guardo el token navega al usuario al dashboard principal
      error: () => {//Error en el login
        this.errorMessage = 'Credenciales incorrectas.';//Acá se puedee utilizar el sweetalert2
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  fakeLogin() {//Se guarda un token falso en localStorage
    localStorage.setItem('token', 'FAKE_DEV_TOKEN');
    localStorage.setItem('user', JSON.stringify({//se guarda un usuario momentaneo
      id: 'dev-user',
      name: 'Usuario de Desarrollo',
      email: 'dev@example.com',
      roles: ['admin']
    }));

    this.router.navigate(['/dashboard']);// Redirigir al dashboard
  }
}