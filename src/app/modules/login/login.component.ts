import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseAPI } from 'src/app/entities/ResponseAPI';
import { UserAccountEntity, UserAccountLoginEntity } from 'src/app/entities/UserAccount.Entity';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  _userName: any = '';
  _password: any = '';

  constructor(
    public loginService: LoginService,
    public toastr: ToastrService,
    public router: Router
  ) {
  }

  login() {
    let req = {
      userName: this._userName ?? '',
      password: this._password ?? ''
    };
    if (this._userName == '' || this._password == '') {
      this.toastr.warning('Thông tin không được để trống');
    }
    else {
      this.loginService.login(req).subscribe(
        (res: ResponseAPI<UserAccountLoginEntity>) => {
          if (res.code == "200") {
            if (res.data.status != 1) {
              this.toastr.warning('Tài khoản chưa được kích hoạt');
              return;
            }
            if (!(res.data.role?.code == '001')) {
              this.toastr.warning('Tài khoản không có quyền truy cập quản trị');
              return;
            }
            this.toastr.success("Đăng nhập thành công");
            localStorage.setItem('TOKEN', res.data.token?.toString() ?? '');
            localStorage.setItem('UserInfo', JSON.stringify(res.data) ?? {});
            this.router.navigateByUrl('/main/category/topic-type');
          }
          else {
            this.toastr.warning('Tên đăng nhập hoặc mật khẩu không chính xác');
          }
        }
      );
    }
  }
}
