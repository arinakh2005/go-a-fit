import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {
    public isLoading = false;

    public show(): void {
        this.isLoading = true;
    }

    public hide(): void {
        this.isLoading = false;
    }
}
