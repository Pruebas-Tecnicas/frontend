import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public usuario: Usuario = new Usuario();

  constructor(
    private authService: AuthService,
    private router: Router) { }

  login(): void {
    this.authService.login(this.usuario.username, this.usuario.password).subscribe(
      json => {
        this.router.navigate(['/formulario']);
        swal.fire('Acceso concedido', 'Bienvenido al sistema de BIM', 'success');
      },
      err => {
        if (err.status == 400) {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.error);

        } else if (err.status == 409) {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.error);

        } else if (err.status == 500) {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.error);
        }
      });
  }
}
