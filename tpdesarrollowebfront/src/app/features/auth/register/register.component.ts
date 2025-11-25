import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';



//Validador personalizado para asegurar que la contraseña y su confirmación coincidan
export const passwordMatcher: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  //Si los controles no existen o aún no se han tocado, no hay error
  if (!password || !confirmPassword) 
    return null;

  //Si los campos están vacíos pero son validos, no hay error
  if (password.value === '' || confirmPassword.value === '') 
    return null;
    //Devuelve error si no coinciden
  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush//OnPush para mejor rendimiento
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public registerForm: FormGroup;
  public errorMessage: string | null = null;

  constructor() {
    //Formulario reactivo

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: [passwordMatcher]//Validador a nivel de grupo
    });

  }
 //Intenta registrar al usuario.
  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();//Muestra errores si el form es invalido
      return;
    }

    this.errorMessage = null;

    const { name, email, password } = this.registerForm.value;

    //aca se llama al authservice
    this.authService.register({ name, email, password }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrarse.';
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/auth/login']); //Navega a la página de login.
  }
}