import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { HeroPage } from './hero-page.component';
import { HeroState } from '../../../core/interface/hero.store.interface';
import { MOCK_STORE_HERO } from '../../../const.spec';
import { heroActions } from '../../../core/action/hero.action';
import { AddEditHeroComponent } from '../add-edit-hero/add-edit-hero.component';
import { HeroI } from '../../../core/interface/hero.interface';

describe('HeroPage', () => {
  let component: HeroPage;
  let fixture: ComponentFixture<HeroPage>;
  let store: MockStore;
  let dialog: jasmine.SpyObj<MatDialog>;

  const mockState: HeroState = MOCK_STORE_HERO;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [HeroPage],
      providers: [
        provideMockStore({
          initialState: {
            hero: mockState,
          },
        }),
        provideZonelessChangeDetection(),
        {
          provide: MatDialog,
          useValue: dialog,
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(HeroPage);
    component = fixture.componentInstance;

    spyOn(store, 'dispatch');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should dispatch getHeroes when initialized', () => {
      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalledWith(
        heroActions.getHeroes({
          data: {
            index: 0,
            size: 5,
          },
        }),
      );
    });

    it('should set canSearch to true when name has a value', () => {
      fixture.detectChanges();

      component.searchForm.get('name')?.setValue('Batman');

      expect(component.canSearch()).toBeTrue();
    });

    it('should set canSearch to false when name is empty', () => {
      fixture.detectChanges();

      component.searchForm.get('name')?.setValue('');

      expect(component.canSearch()).toBeFalse();
    });

    it('should set canSearch to false when name is null', () => {
      fixture.detectChanges();

      component.searchForm.get('name')?.setValue(null);

      expect(component.canSearch()).toBeFalse();
    });
  });

  describe('openAddHero', () => {
    it('should open AddEditHeroComponent dialog', () => {
      dialog.open.and.returnValue({
        afterClosed: () => of(undefined),
      } as MatDialogRef<AddEditHeroComponent>);

      component.openAddHero();

      expect(dialog.open).toHaveBeenCalledWith(AddEditHeroComponent, {
        data: null,
      });
    });
  });

  describe('callSearch', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should dispatch filterHeroes with the search name', () => {
      component.searchForm.get('name')?.setValue('Batman');

      component.callSearch();

      expect(store.dispatch).toHaveBeenCalledWith(
        heroActions.filterHeroes({
          data: 'Batman',
        }),
      );
    });

    it('should reset the search form after searching', () => {
      component.searchForm.get('name')?.setValue('Batman');

      component.callSearch();

      expect(component.searchForm.get('name')?.value).toBeNull();
    });

    it('should set isFilterSearch to true', () => {
      component.searchForm.get('name')?.setValue('Batman');

      component.callSearch();

      expect(component.isFilterSearch()).toBeTrue();
    });

    it('should not dispatch an action when search is empty', () => {
      component.searchForm.get('name')?.setValue('');

      (store.dispatch as jasmine.Spy).calls.reset();

      component.callSearch();

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should not dispatch an action when search is null', () => {
      component.searchForm.get('name')?.setValue(null);

      (store.dispatch as jasmine.Spy).calls.reset();

      component.callSearch();

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('restartFilter', () => {
    it('should dispatch getHeroes with initial pagination', () => {
      component.restartFilter();

      expect(store.dispatch).toHaveBeenCalledWith(
        heroActions.getHeroes({
          data: {
            index: 0,
            size: 5,
          },
        }),
      );
    });

    it('should set isFilterSearch to false', () => {
      component.isFilterSearch.set(true);

      component.restartFilter();

      expect(component.isFilterSearch()).toBeFalse();
    });
  });
});
