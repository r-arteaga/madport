import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { SettingsPage } from './settings.page';
import { of } from 'rxjs';
import { UserService } from '../shared/data-access/user.service';

const userServiceMock = {
   userSettings$: of({
    name: "John"
   })
}

describe('SettingsPage', () => {
  let page: SettingsPage
  let fixture: ComponentFixture<SettingsPage>
  let cd: ChangeDetectorRef

  beforeEach(async () => {
    TestBed.overrideComponent(SettingsPage, {
      set: {
        imports: [CommonModule, IonicModule, RouterTestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [{ provide: UserService, useValue: userServiceMock }]
      }
    })

    fixture = TestBed.createComponent(SettingsPage)
    page = fixture.componentInstance
    cd = fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef)
    cd.detectChanges()
  });

  it('should create the page', () => {
    expect(page).toBeTruthy();
  })
  
})
