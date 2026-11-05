import { Directive, ElementRef, HostListener, inject, OnInit } from '@angular/core';
@Directive({
  selector: '[uppercase]',
  standalone: true,
  host: { '(onChange)': 'toUppercase()' },
})
export class UppercaseDirective implements OnInit {
  private readonly input = inject(ElementRef);

  @HostListener('input')
  ngOnInit(): void {
    this.toUppercase();
  }

  @HostListener('input')
  public toUppercase(): void {
    const val = this.input.nativeElement.value.toUpperCase();
    this.input.nativeElement.value = val;
  }
}
