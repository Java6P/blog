import { Component, OnInit  } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.less']
})
export class WriteComponent implements OnInit {
  ngOnInit() {
    this.isLog('您还没有登录！请先登录哦~');
  }
  // 判断是否登录
  isLog(warning: string): void {
    if (localStorage.getItem("Token")) {
      let uid = localStorage.getItem("uid");
      console.log(uid);
      // this.getblog(uid);
    }
    // 如果没有登录则跳转到登录页
    else{
      this.nzMessageService.warning(`${warning}`);
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000)
    }
  }
  constructor(private nzMessageService: NzMessageService){ }
}
