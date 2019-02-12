import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatAllocationComponent } from './mat-allocation.component';

describe('MatAllocationComponent', () => {
  let component: MatAllocationComponent;
  let fixture: ComponentFixture<MatAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
