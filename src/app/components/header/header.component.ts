import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
/************************Menu-Start******************/
isMenuOpen = true;
contentMargin = 200;


  onToolbarMenuToggle(){
    console.log('On toolbar toggled', this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.contentMargin = 100;
    }
    else {
      this.contentMargin = 200;
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
