import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';
import { UsuarioLogado } from 'src/app/models/usuarioLogado';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  usuarioEditar!: UsuarioLogado;
  usuarioForm!: FormGroup;
  idUsuarioLogado?: number;

  constructor(
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.idUsuarioLogado = this.authService.getIdUsuarioLogado();

    this.usuarioService
      .GetFuncionarioById(this.idUsuarioLogado)
      .subscribe((data) => {
        this.usuarioEditar = data.dados;
        this.initForm();
      });
  }

  private initForm() {
    if (this.usuarioEditar) {
      this.usuarioForm = new FormGroup({
        id: new FormControl(this.idUsuarioLogado),
        nome: new FormControl(this.usuarioEditar.nome, [Validators.required]),
        email: new FormControl(this.usuarioEditar.email, [Validators.required]),
        atualizarSenha: new FormControl(false),
        senha: new FormControl('', [Validators.required]),
        confirmaSenha: new FormControl('', [Validators.required]),
      });
    }
  }

  EditPerfilUser() {
    this.spinner.show();
    this.usuarioService
      .EditUsuario(this.usuarioForm.value)
      .subscribe((data) => {
        if (data.sucesso == true) {
          this.toastr.success(data.mensagem);
          setTimeout(() => {
            this.spinner.hide();
            window.location.reload();
          }, 3000);
        } else {
          this.toastr.error(data.mensagem);
          setTimeout(() => {
            this.spinner.hide();
            window.location.reload();
          }, 3000);
        }
      });
  }

  checkConfirmPassword() {
    const senhaControl = this.usuarioForm.get('senha');
    const confirmSenhaControl = this.usuarioForm.get('confirmaSenha');

    if (senhaControl && confirmSenhaControl) {
      const senha = senhaControl.value;
      const confirmSenha = confirmSenhaControl.value;

      if (senha && confirmSenha && senha !== confirmSenha) {
        confirmSenhaControl.setErrors({ passwordMismatch: true });
      } else {
        confirmSenhaControl.setErrors(null);
      }
    }
  }

  isEmailValid(email: string) {
    return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
  }
}
