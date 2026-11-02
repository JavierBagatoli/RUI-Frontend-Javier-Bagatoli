import {
  Component,
  computed,
  effect,
  inject,
  input,
  Input,
  signal,
  ViewChild,
} from '@angular/core';
import { HeroI } from '../../../core/interface/hero.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddEditHeroComponent } from '../add-edit-hero/add-edit-hero.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DeleteHeroComponent } from '../delete-hero/delete-hero.component';

@Component({
  selector: 'hero-table',
  imports: [MatTableModule, MatButtonModule, MatPaginator, MatPaginatorModule],
  templateUrl: './hero-table.component.html',
  styleUrl: './hero-table.component.scss',
})
export class HeroTableComponent {
  displayedColumns: string[] = ['name', 'age', 'description', 'action'];
  readonly dialog = inject(MatDialog);
  data = input<HeroI[]>([]);
  dataSource = computed(() => new MatTableDataSource<HeroI>(this.data()));

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource().paginator = this.paginator;
  }

  openEditHero(hero: HeroI): void {
    const dialogRef = this.dialog.open(AddEditHeroComponent, {
      data: hero,
    });

    dialogRef.afterClosed().subscribe((result: HeroI) => {
      if (result !== undefined) {
        console.log(result);
      }
    });
  }

  openDeleteHero(hero: HeroI): void {
    const dialogRef = this.dialog.open(DeleteHeroComponent, {
      data: hero,
    });

    dialogRef.afterClosed().subscribe((result: HeroI) => {
      if (result !== undefined) {
        console.log(result);
      }
    });
  }
}
