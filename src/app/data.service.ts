import { Injectable } from '@angular/core';
import { of } from 'rxjs';
// var faker = require('faker');

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getField() {
    return {
      key: 'team',
      type: 'select',
      templateOptions: {
        label: 'team',
        options: [
          { id: '1', name: 'Soccer' },
          { id: '2', name: 'Basketball' },
        ],
        valueProp: 'id',
        labelProp: 'name',
      },
    };
  }



  getData() {
    return of([
      { id: '1', name: 'Bayern Munich', sportId: '1' },
      { id: '2', name: 'Real Madrid', sportId: '1' },
      { id: '3', name: 'Cleveland', sportId: '2' },
      { id: '4', name: 'Miami', sportId: '2' },
    ]);
  }

  getData2() {
    return of([
      { id: '1', name: 'Bayern Munich2', sportId: '1' },
      { id: '2', name: 'Real Madrid2', sportId: '1' },
      { id: '3', name: 'Cleveland3', sportId: '2' },
      { id: '4', name: 'Miami4', sportId: '2' },
    ]);
  }

  fromApi() {
    return {
      question: {
        title: 'teste',
        answers: [
          'ci'
        ]
      },
      analysis: {
        id: Math.random()
      }
    }
  }
}
