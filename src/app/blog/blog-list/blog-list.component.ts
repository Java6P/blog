import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.less']
})
export class BlogListComponent implements OnInit {
  isOkLoading = false;
  isVisible = false;
  word: string = "";
  loading: boolean = false;
  blogs: Blog[] = [];
  constructor(
    private blogService: BlogService,
    private nzMessageService: NzMessageService
    ) { }

  ngOnInit() {
    this.getblogs();
    // this.isLog('未登录！请登录');
  }

    /**获取数据 */
    getblogs(): void {
      this.loading = true;
      this.blogService.getBlogs()
        .subscribe(blogs => {
          this.blogs = blogs;
          this.loading = false;
        });
    }
    handleCancel(): void {
      this.isVisible = false;
    }

    findByTextBlog(): void {
      if(this.word == ""){
        this.nzMessageService.warning("请先输入关键词");
      }
      this.loading = true;
      this.blogService.findByTextBlog(this.word)
        .subscribe(blog => {
          this.blogs = blog;
          this.loading = false;
        });
    }
}
