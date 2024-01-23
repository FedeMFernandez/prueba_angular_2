import { Injectable } from "@angular/core";
import { RestService } from "./rest.service";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {

  get loggedIn(): boolean {
    return this.storageService.getBoolean('loggedIn');
  }

  constructor(
    private restService: RestService,
    private storageService: StorageService,
  ) { }

  async login(request: LoginRequestDTO): Promise<void> {
    try {
      await this.restService.post<void>('login', request);
      this.storageService.setBoolean('loggedIn', true);
      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  logout(): void {
    this.storageService.remove('loggedIn');
  }

}

export interface LoginRequestDTO {
  email: string;
  password: string;
}
