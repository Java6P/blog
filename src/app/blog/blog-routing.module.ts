import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogComponent } from './blog.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: BlogComponent,
    children: [
      { path: 'list', component: BlogListComponent },
      { path: 'home', component: HomeComponent },
      { path: 'detail/:aid', component: BlogDetailComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
