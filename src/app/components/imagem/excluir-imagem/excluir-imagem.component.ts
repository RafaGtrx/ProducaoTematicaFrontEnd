import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ImagemService } from 'src/app/services/imagem.service';
import { ImagemTeste } from 'src/app/models/imagemTeste';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-excluir-imagem',
  templateUrl: './excluir-imagem.component.html',
  styleUrls: ['./excluir-imagem.component.css'],
})
export class ExcluirImagemComponent implements OnInit {
  inputData: any;
  imagemExcluir: ImagemTeste[] = [];

  constructor(
    private imagemService: ImagemService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<ExcluirImagemComponent>,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.imagemService
      .GetImageById(this.inputData.id)
      .subscribe((data: any) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
        this.imagemExcluir = data.dados;
      });
  }

  ExcluirImagem() {
    this.spinner.show();
    this.imagemService
      .DeleteImage(this.inputData.id, this.inputData.idUsuario)
      .pipe()
      .subscribe((data) => {
        if (data.sucesso == true) {
          setTimeout(() => {
            this.spinner.hide();
            this.ref.close({ action: 'delete_image', data: data });
            this.toastr.success(data.mensagem);
          }, 1000);
        } else {
          setTimeout(() => {
            this.spinner.hide();
            this.ref.close({ action: 'delete_image', data: data });
            this.toastr.error(data.mensagem);
          }, 1000);
        }
      });
  }

  Cancelar() {
    this.ref.close();
  }
}
