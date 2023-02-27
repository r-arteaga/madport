import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { HomePage } from './home.page';

describe('HomePage', () => {
  let page: HomePage
  let fixture: ComponentFixture<HomePage>
  let cd: ChangeDetectorRef

  beforeEach(async () => {
    TestBed.overrideComponent(HomePage, {
      set: {
        imports: [CommonModule, IonicModule, RouterTestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    })

    fixture = TestBed.createComponent(HomePage)
    page = fixture.componentInstance
    cd = fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef)
    cd.detectChanges()
  });

  it('should create the page', () => {
    expect(page).toBeTruthy();
  })
})
