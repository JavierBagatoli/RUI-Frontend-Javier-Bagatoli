import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeroI } from '../../../core/interface/hero.interface';
import { provideZonelessChangeDetection } from '@angular/core';
import { AddEditHeroComponent } from './add-edit-hero.component';

describe('AddEditHeroComponent', () => {
  let component: AddEditHeroComponent;
  let fixture: ComponentFixture<AddEditHeroComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AddEditHeroComponent>>;

  const mockHero: HeroI = {
    name: 'string',
    state: true,
    age: 40,
    description: 'string',
    id: 4,
    power: 'dinero',
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [AddEditHeroComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogRefSpy,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockHero,
        },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive hero data from MAT_DIALOG_DATA', () => {
    expect(component.data).toEqual(mockHero);
  });

  it('should close dialog with false when onNoClick is called', () => {
    component.onNoClick();

    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should close dialog with true when onYesClick is called', () => {
    component.onYesClick();

    expect(dialogRefSpy.close).toHaveBeenCalledOnceWith(mockHero);
  });
});
