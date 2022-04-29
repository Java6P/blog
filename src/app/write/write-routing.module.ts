import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { SuccessComponent } from './success/success.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { WriteComponent } from './write.component';

const routes: Routes = [
  {
    path: '', component: WriteComponent,
    children: [
        { path: 'create', component: CreateBlogComponent},
        { path: 'update/:aid', component: UpdateBlogComponent },
        { path: 'success/:aid', component: SuccessComponent}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WriteRoutingModule { }
