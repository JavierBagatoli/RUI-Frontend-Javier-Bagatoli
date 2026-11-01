import { Component, computed, inject, input, Input, model, OnInit, signal } from '@angular/core';
import { HeroI } from '../../../core/interface/hero.interface';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { heroService } from '../../../core/service/hero.service';
import { Store } from '@ngrx/store';
import { HeroState } from '../../../core/interface/hero.store.interface';
import { heroActions } from '../../../core/action/hero.action';
import { HeroEffects } from '../../../core/effect/hero.effect';

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
    ReactiveFormsModule,
  ],
  templateUrl: './add-edit-hero.component.html',
  styleUrl: './add-edit-hero.component.scss',
  providers: [HeroEffects],
})
export class AddEditHeroComponent implements OnInit {
  protected isCreate = signal<boolean>(true);
  readonly dialogRef = inject(MatDialogRef<AddEditHeroComponent>);
  readonly data = inject<HeroI>(MAT_DIALOG_DATA);
  private readonly heroStore = inject(Store<{ hero: HeroState }>);

  readonly animal = model('');

  public heroForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    state: new FormControl<boolean>(true),
    age: new FormControl<number | null>(null, [Validators.required]),
    description: new FormControl<string>(''),
    power: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    id: new FormControl<number | null>(null),
  });

  readonly nameHero = computed(() => {
    if (!this.data) {
      return '';
    }
    return this.data.name;
  });

  ngOnInit(): void {
    if (this.data !== null) {
      this.isCreate.set(false);
      this.loadDataForm();
    } else {
      this.isCreate.set(true);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    if (this.heroForm.invalid) return;

    if (!this.heroForm.get('id')!.value) {
      if (this.heroForm.valid) {
        this.heroStore.dispatch(heroActions.addHero({ data: this.heroForm.value as HeroI }));
      }
      this.dialogRef.close();
      return;
    }

    this.heroStore.dispatch(heroActions.updateHero({ data: this.heroForm.value as HeroI }));
    this.dialogRef.close();
  }

  private loadDataForm(): void {
    this.heroForm.setValue(this.data);
  }
}
