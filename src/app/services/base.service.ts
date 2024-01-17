import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AppConfig, AppConfiguration } from 'src/configuration';
import { PaginatedList, ResponseAPI } from '../entities/ResponseAPI';

@Injectable({
    providedIn: 'root',
})
export class BaseService<T> {

    constructor(
        @Inject(AppConfig) private readonly appConfig: AppConfiguration,
        private router: Router,
        private http: HttpClient,
    ) {
    }

    getByRequest(url: string, request: any | null): Observable<ResponseAPI<PaginatedList<T>>> {
        return this.http.post<ResponseAPI<PaginatedList<T>>>(this.appConfig.API + url + '/get-by-request', request).pipe(map((res) => { return res; }));
    }

    getAll(url: string): Observable<ResponseAPI<T[]>> {
        return this.http.get<ResponseAPI<T[]>>(this.appConfig.API + url).pipe(map((res) => { return res; }));
    }

    export(url: string): Observable<ResponseAPI<ArrayBuffer>> {
        return this.http.get<ResponseAPI<ArrayBuffer>>(this.appConfig.API + url + '/export').pipe(map((res) => { return res; }));
    }

    getById(url: string): Observable<ResponseAPI<T>> {
        return this.http.get<ResponseAPI<T>>(this.appConfig.API + url).pipe(map((res) => { return res; }));
    }

    save(url: string, entity: T): Observable<ResponseAPI<T>> {
        return this.http.post<ResponseAPI<T>>(this.appConfig.API + url, entity).pipe(map((res) => { return res; }));
    }

    delete(url: string): Observable<ResponseAPI<T>> {
        return this.http.delete<ResponseAPI<T>>(this.appConfig.API + url).pipe(map((res) => { return res; }));
    }

    search(url: string, request: any): Observable<ResponseAPI<T[]>> {
        return this.http.post<ResponseAPI<T[]>>(this.appConfig.API + url + '/search', request).pipe(map((res) => { return res; }));
    }

    postAsync(url: string, request: any | null): Observable<ResponseAPI<any>> {
        return this.http.post<ResponseAPI<any>>(this.appConfig.API + url, request).pipe(map((res) => { return res; }));
    }
}

