import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { comentarioList } from '../models/comentarioList';
import { ComentarioModel } from '../models/comentarioModel';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private apiUrl = `${environment.ApiUrl}`
  private token = this.authService.getToken()

  constructor(private http: HttpClient,private authService : AuthService) { }

  ListImageComment() : Observable<Response<any>>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Response<any>>(`${this.apiUrl}/Comentario/lista-comentarios`, { headers: headers })
  }

  GetCommentsByImageId(id: number) : Observable<Response<comentarioList>> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<Response<comentarioList>>(`${this.apiUrl}/Comentario/${id}`, { headers: headers })
  }

  DeleteComment(id: number, idUsuario: number) :Observable<Response<any>>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.delete<Response<any>>(`${this.apiUrl}/Comentario/deleta-comentario?Id=${id}&IdUsuario=${idUsuario}`, { headers: headers })

  }

  EditImageComment(comentarioModel: ComentarioModel) : Observable<Response<ComentarioModel[]>> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.put<Response<ComentarioModel[]>>(`${this.apiUrl}/Comentario/altera-comentario`, comentarioModel, { headers: headers })
  }

  CreateComment(comentario: ComentarioModel) : Observable<Response<ComentarioModel>>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.post<Response<ComentarioModel>>(`${this.apiUrl}/Comentario/`, comentario, { headers: headers })
  }

}
