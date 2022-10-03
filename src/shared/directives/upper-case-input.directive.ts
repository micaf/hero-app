import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUpperCaseInput]'
})
export class UpperCaseInputDirective implements AfterViewInit {

  constructor(private element: ElementRef) { }

  @HostListener('input') input() {
    this.updateValue();
  }

  ngAfterViewInit(): void {
    this.updateValue();
  }

  updateValue(){
    this.element.nativeElement.value = this.element.nativeElement.value.toUpperCase();
  }


}
