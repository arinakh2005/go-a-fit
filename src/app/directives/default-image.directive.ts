import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[defaultImg]',
  standalone: true,
})
export class DefaultImageDirective {
  @Input() defaultSrc: string = 'assets/images/default-avatar.jpg';

  @HostListener('error')
  public onError(): void {
    this.src = this.defaultSrc;
  }

  @HostBinding('src')
  @Input() src: string = '';
}
