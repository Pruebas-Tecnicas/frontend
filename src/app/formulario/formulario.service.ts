import { Formulario } from './formulario';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private urlEndPoint: string = 'http://localhost:8080/api/formulario';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

    /**
     * Hace la petición al backend para guardar los datos el formulario.
     */
    create(formulario: Formulario): Observable<Formulario> {
      return this.http.post(this.urlEndPoint.concat('/guardar'), formulario, { headers: this.httpHeaders }).pipe(

        map((response: any) => response.formulario as Formulario),

        catchError(e => {

          if (e.status == 400) {
            swal.fire('¡Error en el formulario!', 'Verifica que los datos ingresados cumplan con las especificaciones.', 'error');
            return throwError(e);

          } else if (e.status == 500) {
            console.error(e.error.mensaje);
            swal.fire('¡Error del servidor!', e.error.error, 'error');
            return throwError(e);

          } else if (e.status == 409) {
            console.error(e.error.mensaje);
            swal.fire('¡Petición no procesada!', e.error.error, 'info');
            return throwError(e);
          }

          return throwError(e);
        })
      );
    }
}
