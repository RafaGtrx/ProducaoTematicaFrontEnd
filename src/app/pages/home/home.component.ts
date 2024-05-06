import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditarImagemDescricaoComponent } from 'src/app/components/imagem/editar-imagem-descricao/editar-imagem-descricao.component';
import { ExcluirImagemComponent } from 'src/app/components/imagem/excluir-imagem/excluir-imagem.component';
import { UploadImagemComponent } from 'src/app/components/imagem/upload-imagem/upload-imagem.component';
import { imageList } from 'src/app/models/imageList';
import { ImagemService } from 'src/app/services/imagem.service';

import { ComentarioService } from 'src/app/services/comentario.service';
import { EditarComentarioComponent } from 'src/app/components/comentario/editar-comentario/editar-comentario.component';
import { ExcluirComentarioComponent } from 'src/app/components/comentario/excluir-comentario/excluir-comentario.component';
import { CadastrarComentarioComponent } from 'src/app/components/comentario/cadastrar-comentario/cadastrar-comentario.component';
import { AuthService } from 'src/app/services/auth.service';
import { comentarioList } from 'src/app/models/comentarioList';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  imagens: imageList[] = [];
  comentarios: imageList[] = [];
  mensagem: string = '';
  idUsuarioLogado: number = 0;
  imagemSelecionadaId: number = 0;

  constructor(
    public dialog: MatDialog,
    private imagemService: ImagemService,
    private comentarioService: ComentarioService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.listarImagens();
    this.ListarComentarios();
    this.idUsuarioLogado = this.authService.getIdUsuarioLogado();
    this.spinner.show();
  }

  ListarComentarios(): void {
    this.comentarioService.ListImageComment().subscribe((response) => {
      if (response.sucesso) {
      
        this.comentarios = response.dados;
        this.comentarios.forEach((comentario) => {
          comentario.comentarios.forEach((comentarios: any) => {
            comentarios.dataCriacao = this.formatCreationDateComentario(
              comentarios.dataCriacao
            );
            comentarios.dataAlteracao = this.formatCreationDateComentario(
              comentarios.dataAlteracao
            );
          });
        });
        this.mensagem = response.Mensagem;
      } else {
        this.spinner.hide();
        this.mensagem = response.Mensagem;
        console.error('Erro ao obter imagens:', response.Mensagem);
      }
    });
  }

  listarImagens(): void {
    this.imagemService.ListImage().subscribe((response) => {
      if (response.Sucesso) {
        if (response.Dados && response.Dados.$values) {
          this.imagens = response.Dados.$values;
          this.imagens.forEach((imagem) => {
            imagem.formattedCreationDate = this.formatCreationDate(
              imagem.DataCriacao
            );
          });
        }
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      } else {
        this.spinner.hide();        
      }
    });
  }

  formatCreationDate(creationDate: string): string {
    const currentDate = new Date();
    const creationDateTime = new Date(creationDate);
    const diffTime = Math.abs(
      currentDate.getTime() - creationDateTime.getTime()
    );
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));

    if (diffSeconds < 60) {
      return (
        diffSeconds + (diffSeconds > 1 ? ' segundos atrás' : ' segundo atrás')
      );
    } else if (diffMinutes < 60) {
      return (
        diffMinutes + (diffMinutes > 1 ? ' minutos atrás' : ' minuto atrás')
      );
    } else if (diffHours < 24) {
      return diffHours + (diffHours > 1 ? ' horas atrás' : ' hora atrás');
    } else if (diffDays < 7) {
      return diffDays + (diffDays > 1 ? ' dias atrás' : ' dia atrás');
    } else if (diffWeeks < 4) {
      return diffWeeks + (diffWeeks > 1 ? ' semanas atrás' : ' semana atrás');
    } else if (diffMonths < 12) {
      return diffMonths + (diffMonths > 1 ? ' meses atrás' : ' mês atrás');
    } else {
      return diffYears + (diffYears > 1 ? ' anos atrás' : ' ano atrás');
    }
  }

  formatCreationDateComentario(creationDate: string): string {
    const currentDate = new Date();
    const creationDateTime = new Date(creationDate);
    const diffTime = Math.abs(
      currentDate.getTime() - creationDateTime.getTime()
    );
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));

    if (diffSeconds < 60) {
      return `${diffSeconds}s`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes}m`;
    } else if (diffHours < 24) {
      return `${diffHours}h`;
    } else if (diffDays < 7) {
      return `${diffDays}d`;
    } else if (diffWeeks < 4) {
      return `${diffWeeks}sem`;
    } else if (diffMonths < 12) {
      return `${diffMonths}mes`;
    } else {
      return `${diffYears}ano`;
    }
  }

  OpenDialogDeleteImage(id: number, idUsuario: number) {
    if (idUsuario !== this.idUsuarioLogado) {
      this.toastr.error('Você só pode deletar imagens que você postou.')
      return;
    }
    this.spinner.show();

    const dialogRef = this.dialog.open(ExcluirImagemComponent, {
      width: '450px',
      height: '405px',
      data: {
        id: id,
        idUsuario: idUsuario,
      },
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result && result.action === 'delete_image') {
        this.listarImagens();
      }
    });  
  }

  OpenDialogEditImageDescription(id: number, idUsuario: number) {
    if (idUsuario !== this.idUsuarioLogado) {
      this.toastr.error('Você só pode editar imagens que você postou.')
      return;
    }
    const dialogRef = this.dialog.open(EditarImagemDescricaoComponent, {
      width: '480px',
      height: '510px',
      data: {
        id: id,
        idUsuario: idUsuario,
      },
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result && result.action === 'edit_comment') {
        this.listarImagens();
      }
    });  
  }

  OpenDialogDeleteComments(idComentario: number, idUsuario: number) {
    if (idUsuario !== this.idUsuarioLogado) {
      this.toastr.error('Você só pode deletar comentários que você postou.')
      return;
    }

    const dialogRef = this.dialog.open(ExcluirComentarioComponent, {
      width: '480px',
      height: '320px',
      data: {
        id: idComentario,
        idUsuario: idUsuario,
      },
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result && result.action === 'delete_comment') {
        this.listarImagens();
        this.ListarComentarios(); // Atualiza a lista de comentários
      }
    });  
  }

  OpenDialogUpdateComments(idComentario: number, idUsuario: number) {
    if (idUsuario !== this.idUsuarioLogado) {
      this.toastr.error('Você só pode editar comentários que você postou.')
      return;
    }

    const dialogRef = this.dialog.open(EditarComentarioComponent, {
      width: '480px',
      height: '270px',
      data: {
        id: idComentario,
        idUsuario: idUsuario,
      },
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result && result.action === 'edit_comment') {
        this.listarImagens();
        this.ListarComentarios(); // Atualiza a lista de comentários
      }
    });  
  }

  OpenDialogPostComments(idImagem: number) {
    const dialogRef = this.dialog.open(CadastrarComentarioComponent, {
      width: '480px',
      height: '270px',
      data: {
        id: idImagem,
        idUsuario: this.idUsuarioLogado,
      },
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result && result.action === 'create_comment') {
        this.listarImagens();
        this.ListarComentarios(); // Atualiza a lista de comentários
        // Define a propriedade showComments como true para exibir os comentários
        this.imagens.forEach(imagem => {
          if (imagem.Id === idImagem) {
            imagem.showComments = true;
          }
        });
      }
    });  
  }
  OpenDialogUploadImage() {
    const dialogRef = this.dialog.open(UploadImagemComponent, {
      width: '480px',
      height: '380px',
    });
  
    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result && result.action === 'image_uploaded') {
        // Atualizar a lista de imagens sem recarregar a página
        this.listarImagens();
      }
    });
  }

  showFullDescription(item: any) {
    item.showFullDescription = true;
  }
  toggleComments(imagemId:any) {
    this.imagemSelecionadaId = this.imagemSelecionadaId === imagemId ? 0 : imagemId;
  }
  isComentario(obj: any): obj is comentarioList {
    return obj && typeof obj === 'object' && 'NomeUsuarioComentario' in obj;
  }
}
