import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { HeroTableComponent } from './hero-table.component';
import { AddEditHeroComponent } from '../add-edit-hero/add-edit-hero.component';
import { DeleteHeroComponent } from '../delete-hero/delete-hero.component';

import { HeroI } from '../../../core/interface/hero.interface';
import { HeroState, pagination } from '../../../core/interface/hero.store.interface';
import { heroActions } from '../../../core/action/hero.action';
import { provideZonelessChangeDetection } from '@angular/core';

describe('HeroTableComponent', () => {
  let component: HeroTableComponent;
  let fixture: ComponentFixture<HeroTableComponent>;

  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let storeSpy: jasmine.SpyObj<Store<HeroState>>;

  const mockHero = {
    id: 1,
    name: 'Batman',
    age: 40,
    description: 'string',
  } as HeroI;

  const mockPagination: pagination<HeroI> = {
    vector: [mockHero],
    size: 1,
  };

  const mockPaginationRequest = {
    index: 0,
    size: 5,
  };

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [HeroTableComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: dialogSpy,
        },
        {
          provide: Store,
          useValue: storeSpy,
        },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroTableComponent);
    component = fixture.componentInstance;

    // Configuramos los inputs requeridos
    fixture.componentRef.setInput('data', mockPagination);
    fixture.componentRef.setInput('paginationControl', mockPaginationRequest);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Init data', () => {
    it('should initialize displayedColumns correctly', () => {
      expect(component.displayedColumns()).toEqual(['name', 'description', 'action']);
      expect(component.totalSize()).toBe(1);
      expect(component.dataSource()).toEqual([mockHero]);
      expect(component.pageIndex()).toBe(0);
      expect(component.pageSize()).toBe(5);
    });
  });

  describe('Call edit hero', () => {
    it('should open edit dialog with the selected hero', () => {
      dialogSpy.open.and.returnValue({
        afterClosed: () => of(undefined),
      } as any);

      component.openEditHero(mockHero);

      expect(dialogSpy.open).toHaveBeenCalledWith(AddEditHeroComponent, {
        data: mockHero,
      });
    });

    it('should dispatch updateHero when edit dialog returns a hero', () => {
      const updatedHero = {
        ...mockHero,
        name: 'Batman Updated',
      };

      dialogSpy.open.and.returnValue({
        afterClosed: () => of(updatedHero),
      } as any);

      component.openEditHero(mockHero);

      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        heroActions.updateHero({
          data: updatedHero,
        }),
      );
    });

    it('should not dispatch updateHero when edit dialog is cancelled', () => {
      dialogSpy.open.and.returnValue({
        afterClosed: () => of(undefined),
      } as any);

      component.openEditHero(mockHero);

      expect(storeSpy.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('Call delete hero', () => {
    it('should open delete dialog with the selected hero', () => {
      dialogSpy.open.and.returnValue({
        afterClosed: () => of(false),
      } as any);

      component.openDeleteHero(mockHero);

      expect(dialogSpy.open).toHaveBeenCalledWith(DeleteHeroComponent, {
        data: mockHero,
      });
    });

    it('should dispatch deleteHero when deletion is confirmed', () => {
      dialogSpy.open.and.returnValue({
        afterClosed: () => of(true),
      } as any);

      component.openDeleteHero(mockHero);

      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        heroActions.deleteHero({
          data: mockHero.id as number,
        }),
      );
    });

    it('should not dispatch deleteHero when deletion is cancelled', () => {
      dialogSpy.open.and.returnValue({
        afterClosed: () => of(false),
      } as any);

      component.openDeleteHero(mockHero);

      expect(storeSpy.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('Pagination', () => {
    it('should dispatch setPagination and getHeroes when changing page', () => {
      const pageEvent = {
        pageIndex: 1,
        pageSize: 10,
        length: 20,
      };

      component.callNewPage(pageEvent);

      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        heroActions.setPagination({
          index: 0,
          size: 5,
        }),
      );

      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        heroActions.getHeroes({
          data: {
            index: 1,
            size: 10,
          },
        }),
      );

      expect(storeSpy.dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
