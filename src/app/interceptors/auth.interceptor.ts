import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AuthService } from '../sevices/auth.service';
import { UserService } from '../sevices/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly router: Router,
        private readonly messageService: MessageService,
    ) { }

    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        request = this.addAuthenticationToken(request);

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 403) {
                    this.router.navigate(['home']);

                    return throwError(error);
                }

                if (error.status === 401) {
                    // TODO: add token refresh
                    this.userService.reset();
                    this.router.navigate(['login']);

                    return throwError(error);
                }
                this.messageService.add({ summary: error.message, severity: 'error' });

                return throwError(error);
            }),
        );
    }

    private addAuthenticationToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
        const jwtToken = this.authService.getJwtToken();

        if (jwtToken) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + jwtToken) });
        } else {
            this.authService.logout();
        }

        return request;
    }
}
