import { Component, computed, inject, input, signal, ViewChild } from '@angular/core';
import { HeroI } from '../../../core/interface/hero.interface';
import { MatTableModule } from '@angular/material/table';
import { AddEditHeroComponent } from '../add-edit-hero/add-edit-hero.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DeleteHeroComponent } from '../delete-hero/delete-hero.component';
import { HeroState, pagination } from '../../../core/interface/hero.store.interface';
import { Store } from '@ngrx/store';
import { heroActions, paginationRequest } from '../../../core/action/hero.action';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'hero-table',
  imports: [MatTableModule, MatButtonModule, MatPaginator, MatPaginatorModule],
  templateUrl: './hero-table.component.html',
  styleUrl: './hero-table.component.scss',
})
export class HeroTableComponent {
  readonly dialog = inject(MatDialog);
  private breakpointObserver = inject(BreakpointObserver);
  public esMovil = false;

  data = input<pagination<HeroI>>({
    vector: [],
    size: 0,
  });

  paginationControl = input.required<paginationRequest>();
  totalSize = computed(() => this.data().size);
  dataSource = computed(() => this.data().vector);

  pageIndex = signal<number>(0);
  pageSize = signal<number>(5);
  displayedColumns = signal<string[]>(['name', 'age', 'description', 'action']);

  private readonly heroStore = inject(Store<HeroState>);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.breakpointObserver
      .observe([Breakpoints.Handset, '(max-width: 768px)'])
      .subscribe((result) => {
        this.displayedColumns.set(['name', 'description', 'action']);
      });
  }

  openEditHero(hero: HeroI): void {
    const dialogRef = this.dialog.open(AddEditHeroComponent, {
      data: hero,
    });

    dialogRef.afterClosed().subscribe((result: HeroI) => {
      if (result !== undefined) {
        this.heroStore.dispatch(heroActions.updateHero({ data: result }));
      }
    });
  }

  openDeleteHero(hero: HeroI): void {
    const dialogRef = this.dialog.open(DeleteHeroComponent, {
      data: hero,
    });

    dialogRef.afterClosed().subscribe((result: HeroI) => {
      if (result) {
        this.heroStore.dispatch(heroActions.deleteHero({ data: hero.id as number }));
      }
    });
  }

  callNewPage(event: PageEvent): void {
    this.heroStore.dispatch(
      heroActions.setPagination({
        index: this.pageIndex(),
        size: this.pageSize(),
      }),
    );

    this.heroStore.dispatch(
      heroActions.getHeroes({
        data: {
          index: event.pageIndex,
          size: event.pageSize,
        },
      }),
    );
  }
}
