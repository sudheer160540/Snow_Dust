import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentregisterComponent } from './momentregister.component';

describe('MomentregisterComponent', () => {
  let component: MomentregisterComponent;
  let fixture: ComponentFixture<MomentregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomentregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
