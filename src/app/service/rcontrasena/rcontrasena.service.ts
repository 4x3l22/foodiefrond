import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RcontrasenaService {

  private url = 'http://localhost:9191/api/CodigoContrasena';

  constructor(private http: HttpClient) { }

  validarCorreo(correo: string){
    const  headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.url}/${correo}`, {headers});
  }

}
