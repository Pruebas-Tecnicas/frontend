import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Formulario } from './formulario';
import { FormularioService } from './formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})
export class FormularioComponent {

  public formulario: Formulario = new Formulario();

  constructor(
    private formularioService: FormularioService,
    private router: Router) { }

  public create(): void {
    this.formularioService.create(this.formulario).subscribe(
      formulario => {
        this.router.navigate(['/home']);
        swal.fire('Registro exitoso', `¡Los datos se guardaron correctamente!`, 'success');
      },
      err => {

        if (err.status == 400) {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);

        } else if (err.status == 500) {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.error);

        }  else if (err.status == 409) {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.error);
        }

      });
  }
}
