import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
// import { Observable }   from 'rxjs/Observable';
import { Userdetails } from '../model/userdetails';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ListService {


  private _users: BehaviorSubject<Userdetails[]>;
    private dataStore: {
      users: Userdetails[]
    }

 // private serviceUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {

    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<Userdetails[]>([]);
   }
  getUser(): Observable<Userdetails[]> {
    return this.http.get<Userdetails[]>(environment.servicesURL);
  }

  // get users(): Observable<Userdetails[]> {
  //       return this._users.asObservable();
  //     }
}



// import { Injectable } from '@angular/core';
// import { User } from '../models/user';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { promise } from 'protractor';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private _users: BehaviorSubject<User[]>;
//   private dataStore: {
//     users: User[]
//   }

//   constructor(private http: HttpClient) {
//     this.dataStore = { users: [] };
//     this._users = new BehaviorSubject<User[]>([]);
//   }

//   get users(): Observable<User[]> {
//     return this._users.asObservable();
//   }
//   addUser(user:User):Promise<User>{
//     return new Promise((resovler, reject) =>{
//         user.id = this.dataStore.users.length + 1;
//         this.dataStore.users.push(user);
//         this._users.next(Object.assign({}, this.dataStore).users)
//         resovler(user);
//     })
//   }

//   userById(id: number) {
//     return this.dataStore.users.find(x => x.id == id);
//   }

//   loadAll() {
//     const userUrl = "https://angular-material-api.azurewebsites.net/users";
//     return this.http.get<User[]>(userUrl)
//       .subscribe(data => {
//         console.log("hi")
//         this.dataStore.users = data;
//         this._users.next(Object.assign({}, this.dataStore).users)
//       },
//         error => {
//           console.log("hi")
//           console.log("error fetching data" + error);
//         })
//   }
// }

