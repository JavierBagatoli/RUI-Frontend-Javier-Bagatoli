import { Component, inject, input, Input, model, OnInit, signal } from '@angular/core';
import { HeroI } from '../../../core/interface/hero.interface';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogContainer,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { HeroState } from '../../../core/interface/hero.store.interface';
import { heroActions } from '../../../core/action/hero.action';

@Component({
  selector: 'delete-hero',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
  ],
  templateUrl: './delete-hero.component.html',
  styleUrl: './delete-hero.component.scss',
})
export class DeleteHeroComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteHeroComponent>);
  readonly data = inject<HeroI>(MAT_DIALOG_DATA);
  private readonly heroStore = inject(Store<{ hero: HeroState }>);

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.heroStore.dispatch(heroActions.deleteHero({ data: this.data.id as number }));
    this.dialogRef.close();
  }
}
