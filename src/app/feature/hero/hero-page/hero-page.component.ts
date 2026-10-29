import { Component, inject, input, Input, signal } from '@angular/core';
import { HeroI } from '../../../core/interface/hero.interface';
import { MatTableModule } from '@angular/material/table';
import { AddEditHeroComponent } from '../add-edit-hero/add-edit-hero.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HeroTableComponent } from '../hero-table/hero-table.component';

@Component({
  selector: 'hero-page',
  imports: [HeroTableComponent, MatButtonModule],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.scss',
})
export class HeroPage {
  readonly dialog = inject(MatDialog);
  public readonly dataTable: HeroI[] = [
    {
      id: 0,
      name: 'string',
      state: true,
      age: 12,
      description: 'string',
    },
    {
      id: 1,
      name: 'string1',
      state: true,
      age: 12,
      description: 'string',
    },
    {
      id: 2,
      name: 'string2',
      state: true,
      age: 12,
      description: 'string',
    },
    {
      id: 3,
      name: 'string3',
      state: true,
      age: 12,
      description: 'string',
    },
  ];

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
