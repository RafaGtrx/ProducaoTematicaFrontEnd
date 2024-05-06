import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { UsuarioLogado} from '../models/usuarioLogado'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${environment.ApiUrl}` 
  private token = this.authService.getToken()

  constructor(private http: HttpClient,private authService : AuthService) { }

  CreateUsuario(usuario: Usuario) : Observable<Response<any>>{
    return this.http.post<Response<any>>(`${this.apiUrl}/Usuario/cadastrar-usuario`, usuario)
  }

  GetFuncionarioById(id: number) : Observable<Response<UsuarioLogado>> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<Response<UsuarioLogado>>(`${this.apiUrl}/Usuario/${id}`, { headers: headers });
  }

  EditUsuario(usuario: any) : Observable<Response<any[]>> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.put<Response<any[]>>(`${this.apiUrl}/Usuario/update-usuario`, usuario, { headers: headers });
  }
}