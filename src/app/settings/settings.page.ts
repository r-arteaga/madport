import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../shared/data-access/user.service';

@Component({
  // +--------------------+
  // |                    |
  // |  COMPONENT CONFIG  |
  // |                    |
  // +--------------------+
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
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
      </ion-toolbar>
    </ion-header>

    <ion-content>
      settings working!
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

  constructor(private userService: UserService) { }

}
