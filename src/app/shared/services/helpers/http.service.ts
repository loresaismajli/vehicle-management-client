import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl: string;

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {
    this.apiUrl = environment.baseUrl;
  }

  /**
   * Create POST request
   * @param path Path after base url
   * @param body Body.
   * @param options Optional object with HttpParams and/or HttpHeaders.
   * @returns Generic observable.
   */
  post<T>(options?: CustomHttpOptions): Observable<T> {
    const httpParams = this.mapHttpParams(options.params);
    return this.httpClient
      .post<T>(this.apiUrl + options.path, options.body, {
        headers: options?.headers,
        params: httpParams,
      })
      .pipe(map((res) => this.extractDataFromResponseModel(res)));
  }

  /**
   * Create GET request
   * @param path Path after base url
   * @param body Body.
   * @param options Optional object with HttpParams and/or HttpHeaders and cacheTime in minutes
   * @returns Generic observable.
   */
  get<T>(options?: CustomHttpOptions): Observable<T> {
    let { withoutBaseUrl, path, cacheTime, params } = options;

    path = withoutBaseUrl ? path : this.apiUrl + path;

    const cacheKey = params ? path + '?' + params?.toString() : path;

    const data = this.getDataFromCache(cacheKey);

    const httpParams = this.mapHttpParams(params);

    if (data) {
      return new Observable((subscriber) => {
        subscriber.next(data);
        subscriber.complete();
      });
    } else {
      return this.httpClient
        .get<any>(path, {
          headers: options?.headers,
          params: httpParams,
        })
        .pipe(
          map((res) => this.extractDataFromResponseModel(res)),
          tap((res) => this.cacheDataIfNeeded(cacheKey, res, cacheTime))
        );
    }
  }

  /**
   * Download file
   */
  getFile(options?: CustomHttpOptions): Observable<any> {
    let { fileName, path, withoutBaseUrl, params } = options;

    const httpParams = this.mapHttpParams(params);

    path = withoutBaseUrl ? path : this.apiUrl + path;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'blob',
    });
    return this.httpClient
      .get(path, {
        headers,
        responseType: 'blob',
        params: httpParams,
      })
      .pipe(map((res) => this.onGetFileFetch(res, fileName)));
  }

  /**
   * Create PUT request
   * @param path Path after base url
   * @param body Body.
   * @param options Optional object with HttpParams and/or HttpHeaders.
   * @returns Generic observable.
   */
  put<T>(options?: CustomHttpOptions): Observable<T> {
    const httpParams = this.mapHttpParams(options.params);

    return this.httpClient
      .put<T>(this.apiUrl + options.path, options.body, {
        headers: options?.headers,
        params: httpParams,
      })
      .pipe(map((res) => this.extractDataFromResponseModel(res)));
  }

  /**
   * Create DELETE request
   * @param path Path after base url
   * @param body Body.
   * @param options Optional object with HttpParams and/or HttpHeaders.
   * @returns Generic observable.
   */
  delete<T>(options?: CustomHttpOptions): Observable<T> {
    const httpParams = this.mapHttpParams(options.params);

    return this.httpClient
      .delete<T>(this.apiUrl + options.path, {
        headers: options?.headers,
        params: httpParams,
      })
      .pipe(map((res) => this.extractDataFromResponseModel(res)));
  }

  private onGetFileFetch(res: Blob, filename: string) {
    const blob = new Blob([res], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  private extractDataFromResponseModel(response) {
    if ('isError' in response) {
      if (response.isError) return response.message;
      else return response.result;
    }
    return response;
  }

  private getDataFromCache(path: string): any {
    return this.storageService.get(path);
  }

  private cacheDataIfNeeded(
    cacheKey: string,
    data: any,
    cacheTime: number
  ): void {
    if (data && cacheTime) {
      this.storageService.set(cacheKey, data, cacheTime);
    }
  }

  private mapHttpParams(filters: any): HttpParams {
    let params = new HttpParams();
    for (const key in filters) {
      const value = filters[key];
      if (value !== undefined && value !== null) {
        params = params.append(key, value.toString());
      }
    }
    return params;
  }
}

interface CustomHttpOptions {
  path: string;
  body?: any;
  headers?: HttpHeaders;
  params?: any;
  cacheTime?: number;
  fileName?: string;
  withoutBaseUrl?: boolean;
}
