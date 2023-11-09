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
  page: number = 1;
  perPage: number = 10;
  totalPages!: number;
  pageArray!: Array<number>;

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
              this.userRepoCount = this.user.public_repos;
              // update pagination array
              this.totalPages = Math.ceil(this.userRepoCount / this.perPage);
              const count: number = (this.totalPages > 9) ? 9 : this.totalPages;
              this.pageArray = Array(count).fill(0).map((x, i) => i);
            }
          });
        }
      });

      // get page from queryparams
      this.activatedRoutes.queryParams.subscribe((params: any)=>{
        if(params && params['page']){
          this.page=parseInt(params['page']);
        }else{
          this.page=1;
        }
        if(params['per_page']){
          this.perPage = parseInt(params.per_page);
          this.totalPages = Math.ceil(this.userRepoCount / this.perPage);
          const count: number = (this.totalPages > 9) ? 9 : this.totalPages;
          this.pageArray = Array(count).fill(0).map((x, i) => i);
        }
      });

      // get repo list of the user by username and pagination
      this.userRepoService.getRepositoriesOfTheUser(this.userName, this.page, this.perPage | 12).subscribe((repos: Array<Repo>)=>{
        this.repos=repos;
      });

    } catch (error: any) {
      window.alert("User not found");
    }
  }

  changePage(newPage: number){
    try{
      // update repos as per the page no
      // skip if pageno is same as current page no
      if(this.page === newPage){
        return;
      }
      const currentParams = { ...this.activatedRoutes.snapshot.queryParams };
      currentParams['page'] = newPage;
      this.router.navigate([], {
        relativeTo: this.activatedRoutes,
        queryParams: currentParams,
        queryParamsHandling: 'merge'
      })
      this.page = newPage;
      this.userRepoService.getRepositoriesOfTheUser(this.userName, this.page, this.perPage | 12).subscribe((data: Array<Repo>)=>{
        this.repos = data;
      })

    }catch(error){
      throw(error);
    }
  }

  goBack(){
    this.router.navigate(['']);
  }

  // change page by previous and next button

  prevPage(){
    if(this.page > 1){
      this.changePage(this.page-1);
    }
  }

  nextPage(){
    if(this.page < this.totalPages){
      this.changePage(this.page+1);
    }
  }

}
