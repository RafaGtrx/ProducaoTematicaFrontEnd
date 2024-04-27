import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar'; // Importe MatSnackBar e suas posições

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.ApiUrl}`; 

  // Defina as posições horizontal e vertical
  horizontalPosition: MatSnackBarHorizontalPosition = 'end'; // 'start' | 'center' | 'end' | 'left' | 'right'
  verticalPosition: MatSnackBarVerticalPosition = 'top';  // Alterado para 'bottom' para posicionar o snack-bar na parte inferior

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  login(email: string, senha: string): Observable<boolean> {
    console.log('caiuAqui')
    return this.http.post<any>(`${this.apiUrl}/Auth/Login`, { email, senha }).pipe(
      tap(response => {
        localStorage.setItem('token', response.dados); // Define o token a partir da propriedade 'dados'
        if (response.sucesso) {
          this.showSuccessMessage('Login bem-sucedido: ' + response.mensagem);
          this.router.navigate(['/login']); // Redireciona o usuário para outra rota
        } else {
          this.showErrorMessage('Erro ao fazer login: ' + response.mensagem);
        }
      }),
      map(response => response.sucesso), // Retorna true se o login foi bem-sucedido
      catchError(error => {
        this.showErrorMessage('Erro ao fazer login: ' + error);
        return of(false); // Retorna false se o login falhou
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Redireciona para a rota de login
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 4000, // Duração da mensagem (em milissegundos)
      panelClass: ['snackbar-success'], // Estilos personalizados para mensagem de sucesso
      horizontalPosition: this.horizontalPosition, // Posição horizontal
      verticalPosition: this.verticalPosition // Posição vertical
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 4000, // Duração da mensagem (em milissegundos)
      panelClass: ['snackbar-error'], // Estilos personalizados para mensagem de erro
      horizontalPosition: this.horizontalPosition, // Posição horizontal
      verticalPosition: this.verticalPosition // Posição vertical
    });
  }
}