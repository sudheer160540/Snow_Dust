import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public power: string;
  username:string;
  powers: any[] = [{ value: 'Really Smart' },
                  { value: 'Super Flexible' },
                  { value: 'Super Hot' },

                 {  value: 'Weather Changer' }];

selectedValue: string;
                 foods: Food[] = [
                  {value: 'Login as-0', viewValue: 'Login as'},
                  {value: 'Gmail-1', viewValue: 'Gmail'},
                  {value: 'Facebook-2', viewValue: 'Facebook'}
                ];

  constructor() { }

  ngOnInit() {
  }
 
}
