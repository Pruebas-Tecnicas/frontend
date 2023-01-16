import { Component } from '@angular/core';
import { AuthService } from '../usuario/login/auth.service';
import { Usuario } from '../usuario/usuario';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  public usuario: Usuario = new Usuario();

  constructor(
    private authService: AuthService,
    private router: Router) { }

  logout(): void {
    this.authService.logout(this.usuario.username).subscribe(
      json => {
        this.router.navigate(['/login']);
        swal.fire('Saliendo', 'Su sesión ha finalizado con éxito', 'success');
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
