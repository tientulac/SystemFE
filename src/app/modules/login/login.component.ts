import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { AppInjector } from 'src/app/app.module';
import { ResponseAPI } from 'src/app/entities/ResponseAPI';
import { UserAccountEntity, UserAccountLoginEntity } from 'src/app/entities/UserAccount.Entity';
import { BaseService } from 'src/app/services/base.service';
import { LoadingService } from 'src/app/services/loading.service';
import { LoginService } from 'src/app/services/login.service';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent<UserAccountEntity> implements OnInit {

  _userName: any = '';
  _password: any = '';

  constructor(
    public loginService: LoginService,
    public router: Router,
    public loadingService: LoadingService
  ) {
    super(
      AppInjector.get(BaseService<UserAccountEntity>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.title.setTitle('Đăng nhập');
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  login() {
    this.isLoading = true;
    let req = {
      userName: this._userName ?? '',
      password: this._password ?? ''
    };
    if (this._userName == '' || this._password == '') {
      this.toastr.warning('Thông tin không được để trống');
      this.isLoading = false;
      return;
    }
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
          this.router.navigateByUrl('/main/feature/dashboard');
        }
        else {
          this.toastr.warning('Tên đăng nhập hoặc mật khẩu không chính xác');
        }
        this.isLoading = false;
      }
    );
  }
}
