import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirImagemComponent } from './excluir-imagem.component';

describe('ExcluirImagemComponent', () => {
  let component: ExcluirImagemComponent;
  let fixture: ComponentFixture<ExcluirImagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluirImagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluirImagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
