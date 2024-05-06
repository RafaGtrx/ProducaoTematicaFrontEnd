import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirComentarioComponent } from './excluir-comentario.component';

describe('ExcluirComentarioComponent', () => {
  let component: ExcluirComentarioComponent;
  let fixture: ComponentFixture<ExcluirComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluirComentarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluirComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
