import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Repo } from 'src/app/core/interfaces/Repo.interface';
import { User } from 'src/app/core/interfaces/User.interface';
import { UserRepositoryService } from 'src/app/core/services/user-repository.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user!: User;
  userName!: string;
  userRepoCount!: number;
  repos!: Array<Repo> | [];
  page!: number | 1;
  perPage!: number | 10;
  totalPages!: number;

  constructor(private router: Router, private activatedRoutes: ActivatedRoute, private userService: UserService, private userRepoService: UserRepositoryService) { }

  ngOnInit() {
    try {
      // get userName from params
      this.activatedRoutes.params.subscribe((params: any) => {
        if (params && params['userName']) {
          this.userName = params['userName'];
          this.userService.getUserByUserName(this.userName).subscribe((data: any) => {
            if (data === null) {
              window.alert('User not found');
            } else {
              this.user = data;
            }
          });
        }
      });

      // get page from queryparams
      this.activatedRoutes.queryParams.subscribe((params: any)=>{
        if(params && params['page']){
          console.log(params)
          this.page=parseInt(params['page']);
        }else{
          this.page=1;
        }
        if(params['per_page']){
          this.perPage = parseInt(params.per_page);
          this.totalPages = this.userRepoCount / this.perPage;
        }
      });

      // get repo list of the user by username and pagination
      this.userRepoService.getRepositoriesOfTheUser(this.userName, this.page, this.perPage | 12).subscribe((repos: Array<Repo>)=>{
        console.log(repos);
        this.repos=repos;
      });

    } catch (error: any) {
      window.alert("User not found");
    }
  }

}
