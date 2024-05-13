import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { LIST_STATUS_USER } from 'src/app/_core/constant';
import { AppInjector } from 'src/app/app.module';
import { RoleEntity, RoleEntitySearch } from 'src/app/entities/Role.Entity';
import { Account } from 'src/app/models/account';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseComponent<Account> {
  statuses = LIST_STATUS_USER;
  listRole: RoleEntity[] | undefined;

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
    private roleService: BaseService<RoleEntity>
  ) {
    super(
      AppInjector.get(BaseService<Account>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.Entity = new Account();
    this.URL = 'api/v1/account';
    this.URL_Upload = appConfig.URL_UPLOAD;
    this.title.setTitle('Quản lý người dùng');
    this.field_Validation = {
      roleId: false,
    };
    this.GROUP_BUTTON.RELOAD = true;
    this.getDataTable();
    this.getListRole();
  }

  getListRole() {
    this.roleService.ss_getAll('api/v1/role').subscribe(
      (res) => {
        this.listRole = res.data ?? [];
      }
    );
  }

  getDataTable() {
    this.ss_getAll();
  }

  onSubmit() {
    this.onSubmitting = true;
    if (!this.isSubmit) {
      this.toastr.warning('Dữ liệu nhập chưa hợp lệ');
      return;
    }
    this.save();
  }

  openModal(type: any, data: Account) {
    this.isInsert = true;
    this.Entity = new Account();
    if (type === 'EDIT') {
      this.Entity = data;
    }
  }
}
