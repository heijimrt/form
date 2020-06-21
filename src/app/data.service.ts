import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// var faker = require('faker');

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  public getData(value): any {
    return this.http.post('http://localhost:3000/question', value);
  }

  public getData2(value): any {
    return this.http.post('http://localhost:3000/question2', value);
  }
}
