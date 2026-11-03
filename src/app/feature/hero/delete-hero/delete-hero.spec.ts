import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteHeroComponent } from './delete-hero.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeroI } from '../../../core/interface/hero.interface';
import { provideZonelessChangeDetection } from '@angular/core';

describe('DeleteHeroComponent', () => {
  let component: DeleteHeroComponent;
  let fixture: ComponentFixture<DeleteHeroComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DeleteHeroComponent>>;

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
      imports: [DeleteHeroComponent],
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

    fixture = TestBed.createComponent(DeleteHeroComponent);
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

    expect(dialogRefSpy.close).toHaveBeenCalledOnceWith(false);
  });

  it('should close dialog with true when onYesClick is called', () => {
    component.onYesClick();

    expect(dialogRefSpy.close).toHaveBeenCalledOnceWith(true);
  });
});
