import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ComentarioModel } from 'src/app/models/comentarioModel';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cadastrar-comentario',
  templateUrl: './cadastrar-comentario.component.html',
  styleUrls: ['./cadastrar-comentario.component.css'],
})
export class CadastrarComentarioComponent implements OnInit {
  inputData: any;
  cadastrarComentario: any[] = [];

  comentarioForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private comentarioService: ComentarioService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<CadastrarComentarioComponent>
  ) {
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.inputData = this.data;
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', Validators.required],
    });
  }

  submitComentario() {
    if (this.comentarioForm.valid) {
      this.spinner.show();
      const comentarioNovo: ComentarioModel = {
        comentario: this.comentarioForm.get('comentario')!.value,
        idImagem: this.data.id,
        idUsuario: this.data.idUsuario,
      };

      this.comentarioService.CreateComment(comentarioNovo).subscribe((data) => {
        if (data.sucesso == true) {
          setTimeout(() => {
            this.spinner.hide();
            this.ref.close({ action: 'create_comment', data: data });
            this.toastr.success(data.mensagem);
          }, 1000);
        } else {
          setTimeout(() => {
            this.spinner.hide();
            this.ref.close({ action: 'create_comment', data: data });
            this.toastr.error(data.mensagem);
          }, 1000);
        }
      });
    }
  }
  Cancelar() {
    this.ref.close();
  }
}
