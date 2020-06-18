import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { map, startWith, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
    this.fields = [...this.start()]
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
            this.subscription = control.valueChanges
              .pipe(
                debounceTime(300)
                ,distinctUntilChanged()
              )
              .subscribe((value) => {
                console.log('teste', value);

                const item = field.parent.fieldGroup.find((item) => {
                  return item.key === 'team';
                });

                if (item) {
                    this.form.get('team').reset();
                    console.log('HERE', item);
                    item.templateOptions.options = this.dataService.getData2();
                } else {
                  const team = this.getCopyField('team');

                  this.fields = [
                    ...this.fields,
                    team
                  ]
                }

              });
          }
        }
      },
    ];
  }

  getTeam() {
    return {
      key: 'team',
      type: 'select',
      templateOptions: {
        label: 'Team',
        options: this.dataService.getData(),
        valueProp: 'id',
        labelProp: 'name',
      },
      hooks: {
        onInit: field => {
          console.log('oo', field);

            console.log(field);
            const control = this.form.get(field.key);
            this.subscription = control.valueChanges
              .pipe(
                debounceTime(300)
                ,distinctUntilChanged()
              )
              .subscribe((value) => {
                console.log('teste', value);

                const item = field.parent.fieldGroup.find((item) => {
                  return item.key === 'lake';
                });

                if (item || value == null) {
                    this.form.get('lake').reset();
                } else {
                  // const lake = this.getLake();

                  this.fields = [
                    ...this.fields,
                    // lake
                  ]
                }

              });




        },
      },
    };
}

getCopyField(key) {
  return {
    key,
    type: 'select',
    templateOptions: {
      label: key,
      options: this.dataService.getData(),
      valueProp: 'id',
      labelProp: 'name',
    },
    hooks: {
      onInit: field => {
        console.log('oo', field);

          console.log(field);
          const control = this.form.get(field.key);
          this.subscription = control.valueChanges
            .pipe(
              debounceTime(300)
              ,distinctUntilChanged()
            )
            .subscribe((value) => {
              console.log('teste', value);
              const savedKey = 'lake';

              const item = field.parent.fieldGroup.find((item) => {
                console.log(item);
                return item.key === savedKey;
              });
              console.log(item);
              if (item || value == null) {
                  this.form.get(savedKey).reset();
              } else {
                const copyField = this.getCopyField(savedKey);

                this.fields = [
                  ...this.fields,
                  copyField
                ]
              }

            });
      },
    },
  };
}


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
