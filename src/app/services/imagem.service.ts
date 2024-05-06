import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { ImagemTeste } from '../models/imagemTeste';
import { comentarioList } from '../models/comentarioList';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ImagemService {

  private apiUrl = `${environment.ApiUrl}`
  private token = this.authService.getToken()
  constructor(private http: HttpClient, private authService : AuthService) { }

  UploadImage(formData: FormData) : Observable<Response<ImagemTeste>>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<Response<ImagemTeste>>(`${this.apiUrl}/Imagem/upload`, formData, { headers: headers })

  }
  ListImage() : Observable<Response<any>>{
       
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Response<any>>(`${this.apiUrl}/Imagem/listaImagem`, { headers: headers });
  }

  GetImageById(id: number) : Observable<Response<any>> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Response<ImagemTeste>>(`${this.apiUrl}/Imagem/${id}`, { headers: headers });
  }

  DeleteImage(id: number, idUsuario: number) :Observable<Response<ImagemTeste>>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete<Response<ImagemTeste>>(`${this.apiUrl}/Imagem/deletaImagem?Id=${id}&IdUsuario=${idUsuario}`, { headers: headers });
  }

  EditImageDescription(imagemTeste: ImagemTeste) : Observable<Response<ImagemTeste[]>> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.put<Response<ImagemTeste[]>>(`${this.apiUrl}/Imagem/editaDescricao`, imagemTeste, { headers: headers });
  }
}
