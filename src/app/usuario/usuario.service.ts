import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/api/usuario';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

    /**
     * Hace la petición al backend para registrar el usuario.
     */
    create(usuario: Usuario): Observable<Usuario> {
      return this.http.post(this.urlEndPoint.concat('/registrar'), usuario, { headers: this.httpHeaders }).pipe(

        map((response: any) => response.usuario as Usuario),

        catchError(e => {

          if (e.status == 400) {
            swal.fire('¡Error en el formulario!', 'Verifica que los datos ingresados cumplan con las especificaciones.', 'error');
            return throwError(e);

          } else if (e.status == 500) {
            console.error(e.error.mensaje);

            swal.fire('¡Error del servidor!', e.error.error, 'error');
            return throwError(e);
          }

          return throwError(e);
        })
      );
    }
}
