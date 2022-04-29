import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Cookie, User } from '../login';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  doregister: boolean = false;
  gender: string = "";
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
  logging = false;
  userForm!: FormGroup;
  public static loginmenu: [] = [];
  /**登录 */
  userSubmit(account: string, password: string): void {
    if (!password || !account){
      this.nzMessageService.warning("请输入完整");
      return;
    }
    this.logging = true;
    this.loginService.login(account, password)
      .subscribe(cookie => {
        this.loginData = cookie;
        console.log(this.loginData.data);
        this.logging = false;
        if (this.loginData.code==200){
          window.location.href = "./blog/list";
          localStorage.setItem("Token", this.loginData.data.token);
          localStorage.setItem("uid",cookie.data.user.userid);
          localStorage.setItem("name",cookie.data.user.name);
          localStorage.setItem("introduce",cookie.data.user.introduce);
          localStorage.setItem("fans",cookie.data.user.fansnumber);
          // this.nzMessageService.success(this.loginData.msg);
        }
        else{
          this.nzMessageService.error(this.loginData.msg);
        }
      });
  }

  register(account: string, password: string, name: string, gender: string): void{
    if (!account || !name || !password || !gender) {
      this.nzMessageService.info('请填写完整！');
      return;
    }
    let fansnumber = 0;
    this.loginService.addUser({ account, name, password, gender, fansnumber } as unknown as User)
      .subscribe(_ => {
        this.doregister = !this.doregister;
      });
  }
  constructor(
    private nzMessageService: NzMessageService,
    private loginService: LoginService) { }

  ngOnInit(): void {
  }
}
