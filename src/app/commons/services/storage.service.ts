import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  public exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  public get(key: string): string | null {
    return this.exists(key) ? localStorage.getItem(key) : null;
  }

  public set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public getBoolean(key: string): boolean {
    if (!this.exists(key)) { return false; }
    return this.get(key) === 'true';
  }

  public setBoolean(key: string, value: boolean): void {
    const stringValue: string = String(value);
    this.set(key, stringValue);
  }

}
