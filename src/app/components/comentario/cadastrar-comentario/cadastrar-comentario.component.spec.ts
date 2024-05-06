import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarComentarioComponent } from './cadastrar-comentario.component';

describe('CadastrarComentarioComponent', () => {
  let component: CadastrarComentarioComponent;
  let fixture: ComponentFixture<CadastrarComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarComentarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
