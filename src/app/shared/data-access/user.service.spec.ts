import { TestBed } from '@angular/core/testing'
import { skip } from 'rxjs'

import { UserService, UserSettings } from './user.service'

describe('UserService', () => {
  let service: UserService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should populate a default value to storage if not already there', () => {
    const defaultValue: UserSettings = {
      name: ""
    }

    service.userSettings$.pipe(
      skip(1) // Since first value will be null, we need to skip it so we can received the populated value
    ).subscribe(userSettings => {
      expect(userSettings).toEqual(defaultValue)
    })
  })

  it('should update user settings when user modifies the name', () => {
    const expectedValue: UserSettings = {
      name: "John"
    }

    service.setUserName("John")

    service.userSettings$.pipe(
      skip(2) // Since first value will be null and the second value will be "",  we need to skip them so we can received the updated value
    ).subscribe(userSettings => {
      expect(userSettings).toEqual(expectedValue)
    })
  })

})
