import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContactEditComponent } from './client-contact-edit.component';

describe('ClientContactEditComponent', () => {
  let component: ClientContactEditComponent;
  let fixture: ComponentFixture<ClientContactEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientContactEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientContactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
