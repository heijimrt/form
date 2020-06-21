import { Component, ChangeDetectorRef } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';
import { DataService } from './data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'formly-repeat-section',
  templateUrl: 'repeat-section.template.html'
})
export class RepeatTypeComponent extends FieldArrayType {

  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef
  ) {
    super();
  }
}