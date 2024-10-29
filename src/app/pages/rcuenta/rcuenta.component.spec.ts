import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcuentaComponent } from './rcuenta.component';

describe('RcuentaComponent', () => {
  let component: RcuentaComponent;
  let fixture: ComponentFixture<RcuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RcuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RcuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
