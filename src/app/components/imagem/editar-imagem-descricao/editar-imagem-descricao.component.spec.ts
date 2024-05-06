import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarImagemDescricaoComponent } from './editar-imagem-descricao.component';

describe('EditarImagemDescricaoComponent', () => {
  let component: EditarImagemDescricaoComponent;
  let fixture: ComponentFixture<EditarImagemDescricaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarImagemDescricaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarImagemDescricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
