import { Component, OnInit } from '@angular/core';

import { User, UserService } from '../../services/user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  title = 'frontend';
  users: User[] = [];

  user = new User('');

  constructor(private userService: UserService ){}

  ngOnInit(): void {
    this.getUsers();
  }

  onSubmit() {
    if(this.user.name){
      this.userService.addUser(this.user).subscribe(user => {
        this.users.push(this.user)
      })
    }
  }

  getUsers(){
    this.userService.getAllUsers().subscribe(users => {
      if(users){
        this.users = users;
      }
    });
  }

}
