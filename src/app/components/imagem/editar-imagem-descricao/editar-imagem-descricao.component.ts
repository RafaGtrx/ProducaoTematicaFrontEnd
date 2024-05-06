import {Component,OnInit,Inject,ViewChild,ElementRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImagemService } from 'src/app/services/imagem.service';
import { ImagemTeste } from 'src/app/models/imagemTeste';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-imagem-descricao',
  templateUrl: './editar-imagem-descricao.component.html',
  styleUrls: ['./editar-imagem-descricao.component.css'],
})
export class EditarImagemDescricaoComponent implements OnInit {
  imagemEditar: any;
  @ViewChild('textAreaNovo') textAreaNovo!: ElementRef;

  constructor(
    private imagemService: ImagemService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<EditarImagemDescricaoComponent>,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.imagemEditar = this.data;
    this.imagemService
      .GetImageById(this.imagemEditar.id)
      .subscribe((data: any) => {
        this.imagemEditar = data.dados;
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      });
  }

  EditarImagemDescricao() {
    const imageTeste: ImagemTeste = {
      id: this.imagemEditar[0].id,
      idUsuario: this.imagemEditar[0].idUsuario,
      descricaoImagem: this.textAreaNovo.nativeElement.value,
    };

    this.imagemService.EditImageDescription(imageTeste).subscribe((data) => {
      this.spinner.show();
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
