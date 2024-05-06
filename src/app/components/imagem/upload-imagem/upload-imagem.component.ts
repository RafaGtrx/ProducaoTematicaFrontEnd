import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ImagemService } from 'src/app/services/imagem.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-imagem',
  templateUrl: './upload-imagem.component.html',
  styleUrls: ['./upload-imagem.component.css'],
})
export class UploadImagemComponent implements OnInit {
  formData = {
    idUsuario: 0,
    descricaoImagem: '',
  };

  selectedFile!: File;
  constructor(
    private imagemService: ImagemService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UploadImagemComponent>,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formData.idUsuario = parseInt(
      localStorage.getItem(this.authService.idKey) || '0',
      10
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitForm(form: any) {
    if (form.valid) {
      const formData = new FormData();
      formData.append('idUsuario', this.formData.idUsuario.toString());
      formData.append('descricaoImagem', this.formData.descricaoImagem);
      formData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.spinner.show();
      this.imagemService.UploadImage(formData).subscribe((data) => {
        this.toastr.success(data.mensagem)
        this.spinner.hide();
        this.ref.close({ action: 'image_uploaded', data: data }); 
      });
    } else {
      this.spinner.hide();

    }
  }
  Cancelar() {
    this.ref.close();
  }
}
