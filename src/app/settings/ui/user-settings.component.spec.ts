import { CommonModule } from '@angular/common'
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { IonicModule, IonSkeletonText } from '@ionic/angular'
import { UserSettingsComponent } from './user-settings.component'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'

describe('UserSettingsComponent', () => {
  let component: UserSettingsComponent
  let fixture: ComponentFixture<UserSettingsComponent>
  let cd: ChangeDetectorRef

  beforeEach(() => {
    TestBed.overrideComponent(UserSettingsComponent, {
      set: {
        imports: [CommonModule, IonicModule, ReactiveFormsModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    })

    fixture = TestBed.createComponent(UserSettingsComponent)
    component = fixture.componentInstance
    cd = fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef)

    component.formGroup = new FormGroup({ 'name': new FormControl() })
    cd.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have a skeleton animation if no template is provided', () => {
    const skeletonElements = fixture.debugElement.queryAll(By.directive(IonSkeletonText))
    expect(skeletonElements.length).toBeGreaterThan(0)
  })

  it('should have a form element if form and user settings are provided', () => {
    component.userSettings = {
      name: 'John'
    }
    cd.detectChanges()

    const form = fixture.debugElement.query(By.css('form'))
    expect(form).toBeTruthy()
  })

  it('should patch the form value if a user settings are provided', async () => {
    component.userSettings = {
      name: 'John'
    }

    component.ngOnChanges()

    expect(component.formGroup.value).toEqual(component.userSettings)
  })

})