import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICorreoenviar } from '../interface/ICorreoenviar';

@Injectable({
  providedIn: 'root'
})
export class RcontrasenaService {

  private url = 'http://localhost:9191/api/CodigoContrasena';

  constructor(private http: HttpClient) { }

  validarCorreo(correo: ICorreoenviar){
    const  headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.url}/${correo}`, {headers});
  }

}
