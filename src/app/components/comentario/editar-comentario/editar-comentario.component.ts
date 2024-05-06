import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ComentarioModel } from 'src/app/models/comentarioModel';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-editar-comentario',
  templateUrl: './editar-comentario.component.html',
  styleUrls: ['./editar-comentario.component.css'],
})
export class EditarComentarioComponent implements OnInit {
  @ViewChild('textAreaNovo2') textAreaNovo!: ElementRef;
  comentarioEditar: any;

  constructor(
    private comentarioService: ComentarioService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<EditarComentarioComponent>,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.comentarioService
      .GetCommentsByImageId(this.data.id)
      .subscribe((data: any) => {
        this.comentarioEditar = data.dados;
      });
  }

  EditarImagemComentario() {
    this.spinner.show();
    const imageTeste: ComentarioModel = {
      id: this.comentarioEditar[0].id,
      idUsuario: this.comentarioEditar[0].idUsuario,
      comentario: this.textAreaNovo.nativeElement.value,
    };

    this.comentarioService.EditImageComment(imageTeste).subscribe((data) => {
      if (data.sucesso == true) {
        setTimeout(() => {
          this.spinner.hide();
          this.ref.close({ action: 'edit_comment', data: data });
          this.toastr.success(data.mensagem);
        }, 1000);
      } else {
        setTimeout(() => {
          this.spinner.hide();
          this.ref.close({ action: 'edit_comment', data: data });
          this.toastr.error(data.mensagem);
        }, 1000);
      }
    });
  }
  Cancelar() {
    this.ref.close();
  }
}
