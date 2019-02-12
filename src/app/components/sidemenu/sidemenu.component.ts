import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
// import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
 showSubmenu: boolean = false;
 showSubmenu1: boolean = false;
 showSubmenu2: boolean = false;

 panelOpenState = false;

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  // users: Observable<User[]>;

  constructor(zone: NgZone,
    private router: Router){

    }

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  ngOnInit() {

    this.router.events.subscribe(() => {
      if (this.isScreenSmall())   
        this.sidenav.close();
    })
  
  }
  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
 
}


