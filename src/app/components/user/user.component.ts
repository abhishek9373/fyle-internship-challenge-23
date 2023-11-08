import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/User.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user!: User;
  userName!: string;

  constructor(private router: Router) {
    try {
      
    } catch (error: any) {
      throw (error);
    }
  }

  ngOnInit(): void {

  }

}
