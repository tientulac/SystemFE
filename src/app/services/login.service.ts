import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AppConfig, AppConfiguration } from 'src/configuration';
import { ResponseAPI } from '../entities/ResponseAPI';
import { UserAccountEntity } from '../entities/UserAccount.Entity';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(
        @Inject(AppConfig) private readonly appConfig: AppConfiguration,
        private router: Router,
        private http: HttpClient,
    ) {
    }

    login(request: any): Observable<ResponseAPI<UserAccountEntity>> {
        return this.http.post<ResponseAPI<UserAccountEntity>>(this.appConfig.API + 'UserAccount/login', request).pipe(map((res) => { return res; }));
    }
}

