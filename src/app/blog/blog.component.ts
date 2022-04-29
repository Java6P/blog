import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.less']
})
export class BlogComponent implements OnInit {
  search: boolean = false;
  // name: string | null | undefined ;
  name = localStorage.getItem("name")
  constructor() { }

  ngOnInit(): void {
  }

  // 退出登录
  logout(): void {
    localStorage.clear();
  }
}
