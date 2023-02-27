import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences'

export interface UserSettings {
  name: string
}

const USER_SETTINGS_KEY = 'user-settings-key'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSettings = new BehaviorSubject<UserSettings | null>(null)

  userSettings$ = this.userSettings.asObservable()

  constructor() {
    this.readUserSettings()
  }

  private async readUserSettings() {
    const result = await Preferences.get({
      key: USER_SETTINGS_KEY
    })

    if(!result.value) {
      const defaultUserSettings: UserSettings = {
        name: ""
      }

      this.setUserSettings(defaultUserSettings)
      return
    }

    const currentUserSettings: UserSettings = JSON.parse(result.value)
    this.userSettings.next(currentUserSettings)
  }

  async setUserName(newName: string) {
    const currentUserSettings: UserSettings | null = this.userSettings.value

    if(currentUserSettings && currentUserSettings.name != newName) {
      const newUserSettings: UserSettings = { ...currentUserSettings, name: newName }
      await this.setUserSettings(newUserSettings)
    }
  }

  async setUserSettings(newUserSettings: UserSettings) {
    await Preferences.set({
      key: USER_SETTINGS_KEY,
      value: JSON.stringify(newUserSettings)
    })

    this.userSettings.next(newUserSettings)
  }
}
