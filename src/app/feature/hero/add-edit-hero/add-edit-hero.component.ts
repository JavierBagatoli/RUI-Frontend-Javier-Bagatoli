import { Component, inject, input, Input, model, OnInit, signal } from '@angular/core';
import { HeroI } from '../../../core/interface/hero.interface';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormHeroComponent } from '../form-hero/form-hero.component';

@Component({
  selector: 'add-edit-hero',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './add-edit-hero.component.html',
  styleUrl: './add-edit-hero.component.scss',
})
export class AddEditHeroComponent implements OnInit {
  protected isCreate = signal<boolean>(true);
  readonly dialogRef = inject(MatDialogRef<AddEditHeroComponent>);
  readonly data = inject<HeroI>(MAT_DIALOG_DATA);
  readonly animal = model('');

  ngOnInit(): void {
    if (this.data !== null) {
      this.isCreate.set(false);
    } else {
      this.isCreate.set(true);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
