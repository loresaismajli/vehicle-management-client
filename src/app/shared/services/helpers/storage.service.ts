import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  // expDate = -1 => store data forever
  set(key: string, value: any, delayMinutes?: number) {
    const expDate = delayMinutes ? this.addTimeInMiliseconds(delayMinutes) : -1;
    const valueJSON = this.stringifyToJSON(value, expDate);
    localStorage.setItem(key, valueJSON);
  }

  get(key: string) {
    const res = localStorage.getItem(key);
    if (!res) return;
    const { data, expDate } = this.parseJSON(res);
    if (expDate == -1) return data;
    const now = new Date().getTime();
    if (expDate > now) return data;
    // else
    this.remove(key);
    return null;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  //#region helpers
  private addTimeInMiliseconds(milisecondsToAdd: number) {
    return new Date().getTime() + milisecondsToAdd * 60000;
  }

  private stringifyToJSON(data: any, expDate: number): string {
    const result = JSON.stringify({ data, expDate });
    return result;
  }

  private parseJSON(value: string): any {
    const result = JSON.parse(value);
    return result;
  }
  //#endregion helpers
}
