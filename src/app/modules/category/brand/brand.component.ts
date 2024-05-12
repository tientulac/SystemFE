import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { LIST_STATUS_CATEGORY } from 'src/app/_core/constant';
import { AppInjector } from 'src/app/app.module';
import { Brand } from 'src/app/models/brand';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent extends BaseComponent<Brand> {
  statuses = LIST_STATUS_CATEGORY;
  dataTable: Brand[] | undefined;

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
    private brandService: BaseService<Brand>
  ) {
    super(
      AppInjector.get(BaseService<Brand>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.Entity = new Brand();
    this.URL = 'api/v1/brand';
    this.URL_Upload = appConfig.URL_UPLOAD;
    this.title.setTitle('Quản lý thương hiệu');
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

  openModal(type: any, data: Brand) {
    this.isInsert = true;
    this.Entity = new Brand();
    if (type === 'EDIT') {
      this.Entity = data;
    }
  }
}
