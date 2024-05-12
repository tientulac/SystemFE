import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { ROUTE_PATH } from 'src/app/_core/constant';
import { AppInjector } from 'src/app/app.module';
import { Account } from 'src/app/models/account';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent<Account> {

  isCollapsed = false;
  userInfo = new Account();
  pathRouting: any;
  recentURL: any;

  constructor(
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(
      AppInjector.get(BaseService<Account>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.userInfo = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo')))) ?? {};
    this.Entity = this.userInfo;
    this.pathRouting = ROUTE_PATH;
    this.recentURL = this.router.url;
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

  openModal(type: any, data: Account) {
    this.Entity = data;
    if (type === 'INFO') {
      this.isShownInfo = true;
    }
    if (type === 'CHANGEPASS') {
      this.isChangePass = true;
    }
  }

  async onSubmit(): Promise<boolean> {
    this.onSubmitting = true;
    if (this.isShownInfo) {
      this.baseService.ss_save('api/v1/account', this.Entity).subscribe(
        (res) => {
          if (res.status == 200) {
            this.toastr.success('Thành công');
            let data = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo'))));
            data.address = this.Entity.address;
            data.avatar = this.Entity.avatar;
            data.phone = this.Entity.phone;
            data.full_name = this.Entity.full_name;
            data.email = this.Entity.email;
            localStorage.setItem('UserInfo', JSON.stringify(data));
          }
          else {
            this.toastr.warning(res.message ?? '');
          }
        }
      );
    }
    if (this.isChangePass) {
      if (!this.Entity?.new_password || !this.Entity?.confirm_password) {
        this.toastr.warning('Mật khẩu không được bỏ trống');
        return false;
      }
      if (this.Entity?.new_password != this.Entity?.confirm_password) {
        this.toastr.warning('Xác nhận mật khẩu chưa đúng');
        return false;
      }
      this.Entity.password = this.Entity.confirm_password;
      this.baseService.ss_save('api/v1/account', this.Entity).subscribe(
        (res) => {
          if (res.status == 200) {
            this.toastr.success('Thành công. Hệ thống sẽ yêu cầu đăng nhập lại sau 3s');
            setTimeout(this.logout, 3000);
          }
          else {
            this.toastr.warning(res.message ?? '');
          }
        }
      );
    }
    return true;
  }

  override handleCancel(): void {
    this.isShownInfo = false;
    this.isChangePass = false;
    this.userInfo = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo')))) ?? {};
  }
}

