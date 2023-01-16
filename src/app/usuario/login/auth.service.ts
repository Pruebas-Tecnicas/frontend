import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../usuario';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndPoint: string = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Hace la petición al backend para iniciar sesión.
   */
  login(username: String, password: String): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/login/${username}/${password}`).pipe(

      catchError(e => {
        if (e.status == 401) {
          swal.fire('¡Acceso denegado!', e.error.mensaje, 'error');
          return throwError(e);

        } else if (e.status == 409) {
          swal.fire('Solicitud denegada!', e.error.mensaje, 'info');
          return throwError(e);

        } else if (e.status == 500) {
          console.error(e.error.mensaje);
          swal.fire('¡Error del servidor!', e.error.mensaje, 'error');
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  /**
   * Hace la petición al backend para cerrar sesión.
   */
  logout(username: String): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/logout/${username}`).pipe(

      catchError(e => {
        if (e.status == 401) {
          swal.fire('¡Acceso denegado!', e.error.mensaje, 'error');
          return throwError(e);

        } else if (e.status == 409) {
          swal.fire('Solicitud denegada!', e.error.mensaje, 'info');
          return throwError(e);

        } else if (e.status == 500) {
          console.error(e.error.mensaje);
          swal.fire('¡Error del servidor!', e.error.mensaje, 'error');
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }
}
