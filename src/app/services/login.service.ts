import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AppConfig, AppConfiguration } from 'src/configuration';
import { ResponseAPI } from '../entities/ResponseAPI';
import { UserAccountEntity } from '../entities/UserAccount.Entity';
import { Response } from '../models/response';
import { Account } from '../models/account';

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

    login(request: any): Observable<Response<Account>> {
        return this.http.post<Response<Account>>(this.appConfig.API + 'api/v1/account/login', request).pipe(map((res) => { return res; }));
    }
}

