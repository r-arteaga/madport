import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { HomePage } from './home.page';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { UserService } from '../shared/data-access/user.service';

const userServiceMock = {
   userSettings$: of({
    name: "John"
   })
}

describe('HomePage', () => {
  let page: HomePage
  let fixture: ComponentFixture<HomePage>
  let cd: ChangeDetectorRef

  beforeEach(async () => {
    TestBed.overrideComponent(HomePage, {
      set: {
        imports: [CommonModule, IonicModule, RouterTestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [{ provide: UserService, useValue: userServiceMock }]
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

  it('should have a welcome message', () => {
    const welcome = fixture.debugElement.query(By.css('.welcome-message'))
    expect(welcome.nativeElement.textContent).toContain('Welcome')
  })

  it('should show user name in greeting message', () => {
    const welcome = fixture.debugElement.query(By.css('.welcome-message'))
    expect(welcome.nativeElement.textContent).toContain('John')
  })
})
