/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BladeComponent } from './blade.component';

describe('BladeComponent', () => {
  let component: BladeComponent;
  let fixture: ComponentFixture<BladeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BladeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BladeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
