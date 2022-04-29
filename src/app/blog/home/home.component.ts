import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  date = new Date().toLocaleDateString();
  loading: boolean = false;
  name: any = '未登录';
  introduce: any = "这个人很懒还没有简介";
  fans: any = "0";
  blogs: Blog[] = [];
  constructor(
    private blogService: BlogService,
    public nzMessageService: NzMessageService
    ) { }

  ngOnInit() {
    this.isLog('未登录！即将跳转登录');
  }
  // 判断是否登录
  isLog(warning: string): void {
    if (localStorage.getItem("Token")) {
      let uid = localStorage.getItem("uid");
      this.name = localStorage.getItem("name");
      this.introduce = localStorage.getItem("introduce");
      this.fans = localStorage.getItem("fans");
      console.log(uid);
      this.getblog(uid);
    }
    // 如果没有登录则跳转到登录页
    else{
      this.nzMessageService.warning(`${warning}`);
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000)
    }
  }
  /**获取数据 */
  getblog(uid: any): void {
    this.loading = true;
    this.blogService.getBlog({uid} as unknown as Blog)
      .subscribe(blogs => {
        this.blogs = blogs;
        this.nzMessageService.info("加载成功！")
        this.loading = false;
      });
  }
  /** 删除博客 */
  del(blog: Blog): void{
    this.blogService.deleteBlog(blog.aid)
      .subscribe(_ => {
        this.blogs = this.blogs.filter((h: Blog) => h !== blog);
      });
  }
  /** 取消删除 */
  cancel(): void {
    this.nzMessageService.info('已取消');
  }
}
