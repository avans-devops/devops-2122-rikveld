import { Component } from '@angular/core';

import { User, UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  users: User[] = [];

  user = new User('');

  constructor(private userService: UserService ){}

  onInit() : void{
    this.getUsers();
  }

  onSubmit() {
    if(this.user.name){
      this.userService.addUser(this.user).subscribe(user => {
        console.log(this.user);
        this.users.push(this.user)
        console.log(this.users)});
    }
  }

  getUsers(){
    this.userService.getAllUsers().subscribe(users => {
      console.log(users);
      if(users){
        this.users = users;
      }
    });
  }
}
