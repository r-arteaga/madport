import { CommonModule } from '@angular/common';
import { Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserSettings } from 'src/app/shared/data-access/user.service';

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
    ReactiveFormsModule
  ],
  selector: 'app-user-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,

  // +----------------------+
  // |                      |
  // |  COMPONENT TEMPLATE  |
  // |                      |
  // +----------------------+
  template: `
    <ng-container *ngIf="userSettings; else loadingTpl">
      <form [formGroup]="formGroup">
        <ion-item>
          <ion-label position="stacked">Name</ion-label>
          <ion-input formControlName="name"></ion-input>
        </ion-item>
      </form>
    </ng-container>

    <ng-template #loadingTpl>
      <ion-skeleton-text animated style="width: 20%; height: 1rem"></ion-skeleton-text>
      <ion-skeleton-text animated style="width: 90%; height: 1rem"></ion-skeleton-text>
    </ng-template>
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
export class UserSettingsComponent {
  
  @Input() userSettings: UserSettings | null | undefined

  @Input() formGroup!: FormGroup

  @Output() settingsSaved = new EventEmitter<UserSettings>

  ngOnChanges() {
    if(this.userSettings)
      this.formGroup.patchValue(this.userSettings)
  }

}
