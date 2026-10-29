import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'form-hero',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './form-hero.component.html',
  styleUrl: './form-hero.component.scss',
})
export class FormHeroComponent {}
