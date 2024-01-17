import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { AppInjector } from 'src/app/app.module';
import { PaginationEntity } from 'src/app/entities/Pagination.Entity';
import { RoleEntity, RoleEntitySearch } from 'src/app/entities/Role.Entity';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent extends BaseComponent<RoleEntity> {

  override EntitySearch: RoleEntitySearch = {
    code: null,
    name: null,
    isActive: null,
    isAdmin: null,
    id: null,
    createdAt: null,
    createdBy: null,
    updatedAt: null,
    updatedBy: null,
    deletedAt: null,
    deletedBy: null,
    isSoftDeleted: null,
    searchString: null,
    pagingAndSortingModel: new PaginationEntity,
  };

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
  ) {
    super(
      AppInjector.get(BaseService<RoleEntity>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.Entity = new RoleEntity();
    this.URL = 'role';
    this.URL_Upload = appConfig.URL_UPLOAD;
    this.title.setTitle('Quản lý quyền');
    this.field_Validation = {
      code: false,
      name: false
    };

    this.GROUP_BUTTON.ADD = true;
    this.GROUP_BUTTON.RELOAD = true;

    this.getDataTable();
  }

  getDataTable() {
    this.EntitySearch.pagingAndSortingModel.pageIndex = this.pageIndex;
    this.EntitySearch.pagingAndSortingModel.pageSize = this.pageSize;
    this.getList();
  }

  onSubmit() {
    this.onSubmitting = true;
    if (!this.isSubmit) {
      this.toastr.warning('Dữ liệu nhập chưa hợp lệ');
      return;
    }
    this.save();
  }

  openModal(type: any, data: RoleEntity) {
    this.isInsert = true;
    this.Entity = new RoleEntity();
    if (type === 'EDIT') {
      this.Entity = data;
    }
  }
}
