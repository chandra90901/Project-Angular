import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightPermission]'
})
export class HighlightPermissionDirective implements OnChanges {

  @Input('appHighlightPermission') permissionValue: boolean | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(): void {
    const color = this.permissionValue ? 'green' : 'red';
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
}
