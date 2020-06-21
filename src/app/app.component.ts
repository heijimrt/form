import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { map, startWith, tap, debounceTime, distinctUntilChanged, flatMap } from 'rxjs/operators';
import { DataService } from './data.service';
import { Subscription } from 'rxjs';

export interface act {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  typeLoadName: string;
  lFormGroup: FormGroup;
  stateControl: AbstractControl;
  stateFormControls: FormGroup;

  get lFormArray(): FormArray {
    return this.lFormGroup.get("lFormArray") as FormArray;
  }

  statelist = [ ];
  citylist = [];
  constructor(private fb: FormBuilder, private dataService: DataService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.initControls();
  }

  initControls() {
    this.lFormGroup = this.fb.group({
      lFormArray: this.fb.array([])
    });
    // this.statelist.forEach(element => {
    //   this.stateFormControls = this.createControls();
    //   this.lFormArray.push(this.stateFormControls);
    // });
    this.dataService
      .getData({})
      .subscribe((data: any) => {
        console.log(data);
        this.statelist = data.question.answers;
        this.stateFormControls = this.createControls();
        this.lFormArray.push(this.stateFormControls);
      });
  }

  onChangeState(event, index) {
    //this.lFormArray.get([index + '', 'cities_list']).patchValue(event.cities);
    console.log(event);
    if (event) {
      this.dataService
      .getData2(event)
      .pipe(debounceTime(300), distinctUntilChanged() ,tap((data: any) => {
        console.log(data);
        this.statelist = data.question.answers;
        this.stateFormControls = this.createControls();
        this.lFormArray.push(this.stateFormControls);
      }))
      .subscribe((value: any) => {
        const item = this.lFormArray.at(index);
        console.log(item);
        item.disable();
        this.cd.detectChanges();
      });
    }

  }
  createControls() {
    return this.fb.group({
      state: ""
    });
  }

}
