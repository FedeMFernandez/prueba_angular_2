import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { LoadingController } from "../components/loading/loading.controller";

@Injectable()
export class RestService {

  constructor(
    private httpClient: HttpClient,
    private loadingController: LoadingController,
  ) { }

  private urlComposer(endpoint: string): string {
    return `${environment.apiURL}${endpoint}`;
  }

  private getHttpOptions(): Object {
    const httpOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: false,
    };
    return httpOptions;
  }

  async get<T>(endpoint: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.loadingController.show();
      const successCallback = (response: any) => {
        this.loadingController.hide();
        resolve(response as T);
      }

      const errorCallback = (error: HttpErrorResponse) => {
        this.loadingController.hide();
        reject(error);
      }

      this.httpClient.get(this.urlComposer(endpoint), this.getHttpOptions()).subscribe({
        next: successCallback,
        error: errorCallback,
      });
    });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return new Promise((resolve, reject) => {
      this.loadingController.show();
      const successCallback = (response: any) => {
        this.loadingController.hide();
        resolve(response as T);
      }

      const errorCallback = (error: HttpErrorResponse) => {
        this.loadingController.hide();
        reject(error);
      }

      this.httpClient.post(this.urlComposer(endpoint), data, this.getHttpOptions()).subscribe({
        next: successCallback,
        error: errorCallback,
      });
    });
  }
}
