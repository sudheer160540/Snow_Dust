import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientproEditComponent } from './clientpro-edit.component';

describe('ClientproEditComponent', () => {
  let component: ClientproEditComponent;
  let fixture: ComponentFixture<ClientproEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientproEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientproEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
