import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { map, startWith, tap, debounceTime, distinctUntilChanged, flatMap } from 'rxjs/operators';
import { DataService } from './data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [ ];

  subscription: Subscription;

  constructor(private readonly dataService: DataService) {}

  ngOnInit() {
    this.fields = this.start();
  }

  start() {
    return [
      {
        key: 'sport',
        type: 'select',
        templateOptions: {
          label: 'Sport',
          options: [
            { id: '1', name: 'Soccer' },
            { id: '2', name: 'Basketball' },
          ],
          valueProp: 'id',
          labelProp: 'name',
        },
        hooks: {
          onInit: (field) => {
            console.log(field);
            const control = this.form.get(field.key);
            const fieldItem = this.add(control, 'teams');
            this.fields = [...this.fields, fieldItem];
          }
        }
      },
    ];
  }

  private add(control, key) {
    return {
      key,
      type: 'select',
      templateOptions: {
        label: key,
        options: [],
        valueProp: 'id',
        labelProp: 'name',
      },
      hooks: {
        onInit: (field) => {

          // control.valueChanges
          //   .subscribe((value) => {
          //     console.log('teste');
          //     field.templateOptions.options = this.dataService.getData();

          //   });

          field.templateOptions.options = control.valueChanges.pipe(
            flatMap(() => this.dataService.getData()),
            distinctUntilChanged(),
            tap((value) => {
              console.log(control.value);
              // if (!control.value) {
              //   field.hide = true;
              // } else {
              //   field.hide = false;
              // }
              const currentControl = this.form.get(key);
              currentControl.setValue(null);
              console.log(currentControl);

              const validation = this.fields.find((item) => {
                return item.key == 'player';
              });
              if (!validation) {
                const fieldItem = this.add(currentControl, 'player');
                this.fields = [...this.fields, fieldItem];
              }
            }),
          );

          // const currentControl = field.formControl;
          // const fieldItem = this.add(currentControl, 'player');
          // this.fields = [...this.fields, fieldItem];
        }
      }
    };
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
