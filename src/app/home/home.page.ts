import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { filter, map, Observable } from 'rxjs';
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
    IonicModule,
    RouterModule
  ],
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,

  // +----------------------+
  // |                      |
  // |  COMPONENT TEMPLATE  |
  // |                      |
  // +----------------------+
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Home
        </ion-title>
        <ion-buttons slot="end">
          <ion-button routerLink="/settings">
            <ion-icon slot="icon-only" name="settings-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div id="container">
        <ng-container *ngIf="{ name: name$ | async } as vm">
          <span *ngIf="!vm.name || vm.name == ''" class="welcome-message">Welcome!</span>
          <span *ngIf="vm.name" class="welcome-message">Welcome {{ name$ | async }}!</span>
        </ng-container>
      </div>
    </ion-content>
  `,

  // +--------------------+
  // |                    |
  // |  COMPONENT STYLES  |
  // |                    |
  // +--------------------+
  styles: [
    `
      #container {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
      }

      .welcome-message {
        font-weight: bold;
        font-size: 1.5rem;
      }
    `
  ]
})

// +-------------------+
// |                   |
// |  COMPONENT LOGIC  |
// |                   |
// +-------------------+
export class HomePage {

  private userService = inject(UserService)

  name$: Observable<string> = this.userService.userSettings$.pipe(
    filter(value => !!value),
    map(userSettings => userSettings!.name)
  )

}
