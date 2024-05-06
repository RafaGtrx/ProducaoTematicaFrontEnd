import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.ApiUrl}`;
  private tokenKey = 'token';
  idKey = 'id';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  login(email: string, senha: string): Observable<boolean> {
    return this.http
      .post<any>(`${this.apiUrl}/Auth/Login`, { email, senha })
      .pipe(
        tap((response) => {
          if (response.sucesso) {
            setTimeout(() => {
              this.spinner.hide();
              this.toastr.error(response.mensagem)
            }, 1000);
            const token = response.dados.token;
            // Decodificar o token JWT para acessar os dados
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));

            // Extrair o ID do usuário do payload decodificado
            const userId = tokenPayload.Id;

            localStorage.setItem(this.tokenKey, token);
            localStorage.setItem(this.idKey, userId);

            this.toastr.success(response.mensagem)
            this.router.navigate(['/home']);
          } else {
            setTimeout(() => {
              this.spinner.hide();
              this.toastr.error(response.mensagem)
            }, 1000);
          }
        }),
        map((response) => response.sucesso),
        catchError((error) => {
          setTimeout(() => {
            this.spinner.hide();
            this.toastr.error('Erro ao fazer login: ' + error.error?.mensagem);
          }, 1000);
          
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.idKey);
    this.toastr.success('Usuario Deslogado com sucesso')

    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return (
      !!localStorage.getItem(this.tokenKey) &&
      !!localStorage.getItem(this.idKey)
    );
  }

  getIdUsuarioLogado(): number {
    const idUsuarioLogado = localStorage.getItem(this.idKey);
    return idUsuarioLogado ? parseInt(idUsuarioLogado) : 0;
  }

}
