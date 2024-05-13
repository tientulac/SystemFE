import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { AppInjector } from 'src/app/app.module';
import { Role } from 'src/app/models/role';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent extends BaseComponent<Role> {

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
  ) {
    super(
      AppInjector.get(BaseService<Role>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.Entity = new Role();
    this.URL = 'api/v1/role';
    this.URL_Upload = appConfig.URL_UPLOAD;
    this.title.setTitle('Quản lý quyền');
    this.field_Validation = {
      code: false,
      name: false,
    };

    this.GROUP_BUTTON.ADD = true;
    this.GROUP_BUTTON.RELOAD = true;

    this.getDataTable();
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
    this.ss_save();
  }

  openModal(type: any, data: Role) {
    this.isInsert = true;
    this.Entity = new Role();
    if (type === 'EDIT') {
      this.Entity = data;
    }
  }
}
