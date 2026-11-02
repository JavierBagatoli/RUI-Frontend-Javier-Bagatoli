import { Component, inject, input, Input, OnInit, signal } from '@angular/core';
import { HeroI } from '../../../core/interface/hero.interface';
import { MatTableModule } from '@angular/material/table';
import { AddEditHeroComponent } from '../add-edit-hero/add-edit-hero.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HeroTableComponent } from '../hero-table/hero-table.component';
import { HEROES } from '../../../core/service/fakeData';
import { selectHeroData } from '../../../core/selector/hero.selector';
import { Store } from '@ngrx/store';
import { HeroState } from '../../../core/interface/hero.store.interface';
import { heroActions } from '../../../core/action/hero.action';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'hero-page',
  imports: [HeroTableComponent, MatButtonModule, MatProgressBarModule],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.scss',
})
export class HeroPage implements OnInit {
  readonly dialog = inject(MatDialog);
  private readonly heroStore = inject(Store<HeroState>);

  public readonly dataTable = this.heroStore.selectSignal(selectHeroData);

  ngOnInit(): void {
    this.heroStore.dispatch(heroActions.getHeroes());
    console.log('hola');
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
}
