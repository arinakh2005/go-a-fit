import { Injectable } from '@angular/core';

@Injectable()
export class ValidationMessageService {
  private errorMessages: any = {
    required: 'Поле є обов\'язковим до заповнення',
  }

  public getValidationMessage(validationKey: string): string{
    return this.errorMessages[validationKey];
  }
}