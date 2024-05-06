import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-excluir-comentario',
  templateUrl: './excluir-comentario.component.html',
  styleUrls: ['./excluir-comentario.component.css']
})
export class ExcluirComentarioComponent implements OnInit {
  inputData: any;
  comentarioExcluir: any[] = [];

  constructor(
    private comentarioService: ComentarioService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ExcluirComentarioComponent>,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.inputData = this.data;
    this.comentarioService
    .GetCommentsByImageId(this.inputData.id)
    .subscribe((data: any) => {
      this.comentarioExcluir = data.dados;
    });
  }
  
  DeleteComment() {
    this.spinner.show()
    this.comentarioService
      .DeleteComment(this.inputData.id, this.inputData.idUsuario)
      .pipe()
      .subscribe((data) => {
        if (data.sucesso == true) {
          setTimeout(() => {
            this.spinner.hide();
            this.ref.close({ action: 'delete_comment', data: data });
            this.toastr.success(data.mensagem);
          }, 1000);
        } else {
          setTimeout(() => {
            this.spinner.hide();
            this.ref.close({ action: 'delete_comment', data: data });
            this.toastr.error(data.mensagem);
          }, 1000);
        }
      });
  }
  Cancelar() {
    this.ref.close();
  }

}
