import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${environment.ApiUrl}/Auth/Register`; 

  constructor(private http: HttpClient) { }

  CreateUsuario(usuario: Usuario) : Observable<Response<any>>{
    return this.http.post<Response<any>>(`${this.apiUrl}`, usuario)
  }
}