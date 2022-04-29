import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WriteRoutingModule } from './write-routing.module';
import { WriteComponent } from '../write/write.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IconsProviderModule } from '../icons-provider.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { NzResultModule } from 'ng-zorro-antd/result';
import { SuccessComponent } from './success/success.component';

@NgModule({
  declarations: [
    WriteComponent,
    UpdateBlogComponent,
    CreateBlogComponent,
    SuccessComponent,
  ],
  imports: [
    CommonModule,
    WriteRoutingModule,
    NzLayoutModule,
    NzButtonModule,
    NzGridModule,
    NzInputModule,
    IconsProviderModule,
    NzModalModule,
    FormsModule,
    NzResultModule,
  ]
})
export class WriteModule { }
