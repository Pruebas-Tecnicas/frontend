import { Component } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
})
export class RegistroComponent {

  public usuario: Usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router) { }

  public create(): void {

    this.usuario.password = btoa(this.usuario.password)

    this.usuarioService.create(this.usuario).subscribe(
      usuario => {
        this.router.navigate(['/login']);
        swal.fire('Registro exitoso', `¡Usuario ${usuario.username} creado(a) con éxito!`, 'success');
      },
      err => {
        if (err.status == 400) {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);

        } else if (err.status == 500) {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.error);
        }

      });
  }

}
