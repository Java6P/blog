import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogListComponent } from './blog-list/blog-list.component';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { IconsProviderModule } from '../icons-provider.module';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
@NgModule({
  declarations: [
    HomeComponent,
    BlogComponent,
    BlogDetailComponent,
    BlogListComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzDividerModule,
    NzBadgeModule,
    NzDropDownModule,
    NzAvatarModule,
    NzSpaceModule,
    NzInputModule,
    NzListModule,
    IconsProviderModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    NzCommentModule,
    NzAffixModule,
    NzButtonModule,
    NzFormModule,
    FormsModule,
    NzModalModule,
    NzPopconfirmModule,
  ]
})
export class BlogModule { }
