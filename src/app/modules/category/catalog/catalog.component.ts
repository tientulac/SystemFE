import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { LIST_STATUS_CATEGORY } from 'src/app/_core/constant';
import { AppInjector } from 'src/app/app.module';
import { Category } from 'src/app/models/category';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent extends BaseComponent<Category> {
  statuses = LIST_STATUS_CATEGORY;
  dataTable: Category[] | undefined;

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
    private categoryService: BaseService<Category>
  ) {
    super(
      AppInjector.get(BaseService<Category>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.Entity = new Category();
    this.URL = 'api/v1/category';
    this.URL_Upload = appConfig.URL_UPLOAD;
    this.title.setTitle('Quản lý danh mục');
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

  getParentCategory() {
    this.ss_getAllCustom('api/v1/category/getAllParentCategory');
  }

  onSubmit() {
    this.onSubmitting = true;
    if (!this.isSubmit) {
      this.toastr.warning('Dữ liệu nhập chưa hợp lệ');
      return;
    }
    this.ss_save();
  }

  openModal(type: any, data: Category) {
    this.isInsert = true;
    this.Entity = new Category();
    this.getParentCategory();
    if (type === 'EDIT') {
      this.Entity = data;
    }
  }
}
