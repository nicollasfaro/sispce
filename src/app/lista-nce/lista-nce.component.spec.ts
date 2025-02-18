import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNceComponent } from './lista-nce.component';

describe('ListaNceComponent', () => {
  let component: ListaNceComponent;
  let fixture: ComponentFixture<ListaNceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaNceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaNceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
