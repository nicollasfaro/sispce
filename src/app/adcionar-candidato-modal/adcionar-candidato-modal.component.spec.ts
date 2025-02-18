import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdcionarCandidatoModalComponent } from './adcionar-candidato-modal.component';

describe('AdcionarCandidatoModalComponent', () => {
  let component: AdcionarCandidatoModalComponent;
  let fixture: ComponentFixture<AdcionarCandidatoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdcionarCandidatoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdcionarCandidatoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
