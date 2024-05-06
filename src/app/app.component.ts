import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsuarioLogado } from './models/usuarioLogado';
import { UsuarioService } from './services/usuario.service';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UploadImagemComponent } from './components/imagem/upload-imagem/upload-imagem.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Produção';
  usuarioLogado?: UsuarioLogado;

  constructor(private authService: AuthService, 
    private usuarioService: UsuarioService, private router: Router,private dialog: MatDialog) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.onRouteChange();
    });
  }

  ngOnInit(): void {
    this.onRouteChange();
  }

  private onRouteChange(): void {
    if (this.authService.isLoggedIn()) {
      const idUsuario = localStorage.getItem(this.authService.idKey);
      if (idUsuario) {
        const id = parseInt(idUsuario);
        if (!isNaN(id)) {
          this.usuarioService.GetFuncionarioById(id).subscribe((data) => {  
            this.usuarioLogado = data.dados;
          });
        }
      }
    }
  }

  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }

  formatarNomeCompleto(nomeCompleto: string): string {
    const nomeMaiusculo = nomeCompleto.toUpperCase();
    const partesNome = nomeMaiusculo.split(' ');
    if (partesNome.length > 1) {
      return `${partesNome[0]} ${partesNome[partesNome.length - 1]}`;
    } else {
      return nomeMaiusculo;
    }
  }

  OpenDialogPerfil() {
    const dialogRef = this.dialog.open(PerfilComponent, {
      width: '480px',
      height: '580px',
    });
  
    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result && result.action === 'image_uploaded') {
        // Atualizar a lista de imagens sem recarregar a página
        //this.listarImagens();
      }
    });
  }  
}