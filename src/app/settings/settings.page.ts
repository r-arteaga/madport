import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserService, UserSettings } from '../shared/data-access/user.service';
import { UserSettingsComponent } from './ui/user-settings.component';

@Component({
  // +--------------------+
  // |                    |
  // |  COMPONENT CONFIG  |
  // |                    |
  // +--------------------+
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    UserSettingsComponent
  ],
  selector: 'app-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,

  // +----------------------+
  // |                      |
  // |  COMPONENT TEMPLATE  |
  // |                      |
  // +----------------------+
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="home"></ion-back-button>
        </ion-buttons>
        <ion-title>
          Settings
        </ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="saveUserSettings()">
            <ion-icon slot="icon-only" name="save-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <app-user-settings [formGroup]="formGroup" [userSettings]="userSettings$ | async"></app-user-settings>
    </ion-content>
  `,

  // +--------------------+
  // |                    |
  // |  COMPONENT STYLES  |
  // |                    |
  // +--------------------+
  styles: [
    `
    `
  ]
})

// +-------------------+
// |                   |
// |  COMPONENT LOGIC  |
// |                   |
// +-------------------+
export class SettingsPage {

  private userService = inject(UserService)
  private fb = inject(FormBuilder)
  private router = inject(Router)

  userSettings$: Observable<UserSettings | null> = this.userService.userSettings$

  formGroup = this.fb.group({
    name: ''
  })

  saveUserSettings() {
    const userSettings: UserSettings = this.formGroup.value as UserSettings
    this.userService.setUserSettings(userSettings)

    this.router.navigateByUrl('/', { replaceUrl: true })
  }

}
