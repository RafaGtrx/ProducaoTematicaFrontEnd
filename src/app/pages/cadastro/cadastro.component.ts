import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private usuarioService: UsuarioService,
    private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      confirmSenha: ['', Validators.required]
    });
  }

  createUsuario() {
    if (this.registerForm.valid) {
        const nome = this.registerForm.get('nome');
        const email = this.registerForm.get('email');
        const senha = this.registerForm.get('senha');
    
      if (nome && email && senha) {
        const usuario: Usuario = {
          nome: nome.value,
          email: email.value.toLowerCase(),
          senha: senha.value
        };
  
        this.usuarioService.CreateUsuario(usuario).subscribe(data => {
          if(data['sucesso'] == true)
          {
            this.authService.login(email.value, senha.value).subscribe(success => {
              if (success) {
                // Redirecionar ou fazer alguma outra ação após o login automático
              }
            });
          }
        });
      }
    }
  }

  checkConfirmPassword() {
    const senhaControl = this.registerForm.get('senha');
    const confirmSenhaControl = this.registerForm.get('confirmSenha');

    if (senhaControl && confirmSenhaControl) {
      const senha = senhaControl.value;
      const confirmSenha = confirmSenhaControl.value;

      if (senha && confirmSenha && senha !== confirmSenha) {
        confirmSenhaControl.setErrors({ 'passwordMismatch': true });
      } else {
        confirmSenhaControl.setErrors(null);
      }
    }
  }

  isEmailValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}