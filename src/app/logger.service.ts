import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  errorLog(message: string): void {
    console.error("ERROR: " + message);
  }

  warnLog(message: string): void {
    console.warn("WARN: " + message);
  }

  Log(message: string): void {
    console.log("LOG: " + message);
  }
}
