import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog, userComment } from '../blog';
import { BlogService } from '../blog.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Cookie, User } from 'src/app/login';
import { LoginService } from 'src/app/login.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.less'],
  providers: [DatePipe]
})
export class BlogDetailComponent implements OnInit {
  // 登录模块
  password = "";
  account = "";
  // 控制登录对话框显示
  isOkLoading = false;
  isVisible = false;
  // 
  likes = 0;
  blog: Blog = {
    aid: 0,
    date: '',
    keyword: '',
    like_count: 0,
    text: '',
    title: '',
    uid: 0,
    summary: '',
  };

  loginData: Cookie = {
    msg: '',
    code: 0,
    data: {
      token: '',
      user: {
        userid: '',
        account: '',
        answer: '',
        entranceDate: '',
        fansnumber: '',
        gender: '',
        introduce: '',
        name: '',
        password: '',
        question: '',
      },
    }
  };
  
  data: any[] = [];
  // 评论发送延时控制
  submitting = false;
  blogWriter: User = {
    userid: '',
    account: '',
    answer: '',
    entranceDate: '',
    fansnumber: '',
    gender: '',
    introduce: '',
    name: '',
    password: '',
    question: ''
  };
  commentValue = '';

  isDel: boolean = false;
  aid = Number(this.route.snapshot.paramMap.get('aid'));
  uid = localStorage.getItem("uid");
  username = localStorage.getItem("name");
  loading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private nzMessageService: NzMessageService,
    private loginService: LoginService,
    private datePipe: DatePipe
    ) { }

  ngOnInit(): void {
    this.getBlog();
    this.getComments();
  }
  // 获取博客
  getBlog(): void {
    const aid = this.aid;
    this.blogService.getBlog({aid} as unknown as Blog)
      .subscribe(blog => {
        this.blog = blog[0];
        this.loading = false;
        this.likes = this.blog.like_count;
        this.getUser();
        if (this.uid == String(this.blog.uid)){
          this.isDel = true;
        }
      });
  }
  // 获取博主信息
  getUser(): void {
    const userid = this.blog.uid;
    this.blogService.getUser({"userid":userid})
      .subscribe(user => {
        this.blogWriter = user[0];
      });
  }
  // 点赞
  like(): void {
    this.blog.like_count = this.blog.like_count + 1;
    this.blogService.updateLikeBlog(this.blog)
    .subscribe();
  }
  // 获取此篇文章的评论
  getComments(): void{
    let aid = this.aid;
    this.blogService.findUserComment({aid} as unknown as userComment)
      .subscribe(data => {
        this.data = data;
        // 处理获取的数据
        for (const item of this.data){
          // 格式化时间
          item.date = this.datePipe.transform(item.date, 'yyyy-MM-dd HH:mm:ss')
          // 判断是否是自己的评论
          if (item.uid == this.uid) item["del"] = true;
          else item["del"] = false;
        }
      });
  }
  // 提交评论
  submitComment(): void{
    // 判断是否登录
    if(localStorage.getItem("Token") == null){
      this.nzMessageService.warning("请先登录哦");
      // 弹出登录框
      this.isVisible = true;
    }
    // 登录后提交评论
    else{
      this.submitting = true;
      let commentid = 0;
      let aid = this.aid;
      let uid = this.uid;
      let username = this.username;
      let date = new Date();
      const comment = this.commentValue;
      this.blogService.addUserComment({commentid, aid, uid, username, date, comment} as unknown as userComment)
        .subscribe(_ => {
          this.submitting = false;
          this.commentValue = '';
          this.getComments();
        });
    }

  }
  handleCancel(): void {
    this.isVisible = false;
  }

  /**登录 */
  userSubmit(): void {
    if (!this.password || !this.account){
      this.nzMessageService.warning("请输入完整");
      return;
    }
    this.loginService.login(this.account, this.password)
      .subscribe(cookie => {
        this.loginData = cookie;
        console.log(this.loginData.data);
        if (this.loginData.code==200){
          localStorage.setItem("Token", this.loginData.data.token);
          localStorage.setItem("uid",cookie.data.user.userid);
          localStorage.setItem("name",cookie.data.user.name);
          localStorage.setItem("introduce",cookie.data.user.introduce);
          localStorage.setItem("fans",cookie.data.user.fansnumber);
          this.nzMessageService.success(this.loginData.msg);
          this.isVisible = false;
        }
        else{
          this.nzMessageService.error(this.loginData.msg);
        }
      });
  }

 /** 删除评论 */
  del(comment: userComment): void{
    this.blogService.deleteuserComment(comment.commentid)
      .subscribe(_ => {
        this.data = this.data.filter((h: userComment) => h !== comment);
      });
  }

    /** 取消删除 */
    cancel(): void {
      this.nzMessageService.info('已取消');
    }
}
