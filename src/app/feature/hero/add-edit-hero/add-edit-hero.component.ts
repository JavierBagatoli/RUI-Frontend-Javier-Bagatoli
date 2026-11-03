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
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeroEffects } from '../../../core/effect/hero.effect';
import { REGEX_0_TO_120 } from '../../../core/regex/regex.const';

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
  hasBeenEdited = signal<boolean>(false);
  isValid = signal<boolean>(false);

  public heroForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    state: new FormControl<boolean>(true),
    age: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern(REGEX_0_TO_120),
    ]),
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

    this.heroForm.statusChanges.subscribe((_val) => {
      this.hasBeenEdited.set(true);
      this.isValid.set(this.heroForm.valid);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.heroForm.markAllAsTouched();
    if (this.heroForm.invalid) return;

    this.dialogRef.close(this.heroForm.value as HeroI);
  }

  private loadDataForm(): void {
    this.heroForm.setValue(this.data);
  }
}
