import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidationMessageService } from '../sevices/validation.service';

@Directive({
  selector: '[appInvalidFormControl]',
})
export class InvalidFormControlDirective implements OnInit, OnDestroy {
  public errorSpanId: string = '';

  private statusChangeSubscription: Subscription | null = null;

  constructor(
    private readonly ngControl: NgControl,
    private readonly elementRef: ElementRef,
    private readonly validationMsgService: ValidationMessageService
  ) { }

  public ngOnInit(): void {
    if (!this.ngControl || !this.ngControl.statusChanges) return;

    this.errorSpanId = this.ngControl.name + '-' + new Date();
    this.statusChangeSubscription = this.ngControl.statusChanges.subscribe((status) => {
      status === 'INVALID' ? this.showError() : this.removeError();
    });
  }

  public ngOnDestroy(): void {
    this.statusChangeSubscription?.unsubscribe();
  }

  @HostListener('blur', ['$event'])
  public onBlur(): void {
    if (this.ngControl.value) return;

    this.ngControl.errors ? this.showError() : this.removeError();
  }

  private showError(): void {
    this.removeError();

    const errors = this.ngControl.errors as ValidationErrors;
    const firstKey = Object.keys(errors)[0];
    const errorMessage = this.validationMsgService.getValidationMessage(firstKey);
    const errorSpan = '<span style="color: red;" id="' + this.errorSpanId + '">' + errorMessage + '</span>';

    this.elementRef.nativeElement.parentElement.insertAdjacentHTML('beforeend', errorSpan);
  }

  private removeError(): void {
    const errorElement = document.getElementById(this.errorSpanId);

    if (errorElement) errorElement.remove();
  }
}
