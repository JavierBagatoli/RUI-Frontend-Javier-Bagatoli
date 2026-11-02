import { Component, computed, inject, input, Input, OnInit, signal } from '@angular/core';
import { HeroI } from '../../../core/interface/hero.interface';
import { AddEditHeroComponent } from '../add-edit-hero/add-edit-hero.component';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HeroTableComponent } from '../hero-table/hero-table.component';
import { selectHeroData } from '../../../core/selector/hero.selector';
import { Store } from '@ngrx/store';
import { HeroState } from '../../../core/interface/hero.store.interface';
import { heroActions } from '../../../core/action/hero.action';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormField, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import {
  FormGroup,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'hero-page',
  imports: [
    HeroTableComponent,
    MatButtonModule,
    MatProgressBarModule,
    MatFormField,
    MatLabel,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.scss',
})
export class HeroPage implements OnInit {
  readonly dialog = inject(MatDialog);
  private readonly heroStore = inject(Store<HeroState>);

  public readonly dataTable = this.heroStore.selectSignal(selectHeroData);
  public searchForm = new FormGroup({
    name: new FormControl<string | null>(''),
  });
  readonly canSearch = signal<boolean>(false);

  ngOnInit(): void {
    this.heroStore.dispatch(heroActions.getHeroes());
    this.searchForm.valueChanges.subscribe((val) => {
      const v = this.searchForm.get('name')!.value;
      if (!v) {
        this.canSearch.set(false);
      } else {
        this.canSearch.set(true);
      }
    });
  }

  openAddHero(): void {
    const dialogRef = this.dialog.open(AddEditHeroComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((result: HeroI) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
      }
    });
  }

  callSearch(): void {
    const nameToFilter: string | null = this.searchForm.get('name')!.value;
    if (!nameToFilter) return;
    this.searchForm.reset();
    this.heroStore.dispatch(heroActions.filterHeroes({ data: nameToFilter as string }));
  }
}
