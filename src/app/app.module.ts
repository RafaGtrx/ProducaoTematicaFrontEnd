import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NgxSpinnerModule } from 'ngx-spinner';


import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import { ExcluirImagemComponent } from './components/imagem/excluir-imagem/excluir-imagem.component';
import { EditarImagemDescricaoComponent } from './components/imagem/editar-imagem-descricao/editar-imagem-descricao.component';
import { UploadImagemComponent } from './components/imagem/upload-imagem/upload-imagem.component';
import { ExcluirComentarioComponent } from './components/comentario/excluir-comentario/excluir-comentario.component';
import { EditarComentarioComponent } from './components/comentario/editar-comentario/editar-comentario.component';
import { CadastrarComentarioComponent } from './components/comentario/cadastrar-comentario/cadastrar-comentario.component';
import { AuthGuard } from './guard/auth.guard';
import { PerfilComponent } from './components/perfil/perfil.component';


@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    LoginComponent,
    HomeComponent,
    ExcluirImagemComponent,
    EditarImagemDescricaoComponent,
    UploadImagemComponent,
    ExcluirComentarioComponent,
    EditarComentarioComponent,
    CadastrarComentarioComponent,
    PerfilComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // Adicione ReactiveFormsModule aos imports,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    NgxSpinnerModule,
    MatCheckboxModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    })
    ,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
