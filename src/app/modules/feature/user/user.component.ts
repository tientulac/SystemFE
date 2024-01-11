import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { LIST_STATUS_USER } from 'src/app/_core/constant';
import { AppInjector } from 'src/app/app.module';
import { PaginationEntity } from 'src/app/entities/Pagination.Entity';
import { RoleEntity, RoleEntitySearch } from 'src/app/entities/Role.Entity';
import { UserAccountEntity, UserAccountEntitySearch } from 'src/app/entities/UserAccount.Entity';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseComponent<UserAccountEntity> {
  override EntitySearch: UserAccountEntitySearch = {
    id: null,
    createdAt: null,
    createdBy: null,
    updatedAt: null,
    updatedBy: null,
    deletedAt: null,
    deletedBy: null,
    isSoftDeleted: null,
    searchString: null,
    pagingAndSortingModel: new PaginationEntity
  };

  statuses = LIST_STATUS_USER;
  listRole: RoleEntity[] | undefined;

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
    private roleService: BaseService<RoleEntity>
  ) {
    super(
      AppInjector.get(BaseService<UserAccountEntity>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.Entity = new UserAccountEntity();
    this.URL = 'UserAccount';
    this.URL_Upload = appConfig.URL_UPLOAD;
    this.title.setTitle('Quản lý người dùng');
    this.field_Validation = {
      roleId: false,
      status: false,
    };
    this.GROUP_BUTTON.RELOAD = true;
    this.GROUP_BUTTON.FILTER = true;
    this.GROUP_BUTTON.SEARCH = true;
    this.getDataTable();
    this.getListRole();
  }

  getListRole() {
    let pageSearch: RoleEntitySearch = {
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
      pagingAndSortingModel: new PaginationEntity
    };
    pageSearch.pagingAndSortingModel.pageIndex = 1;
    pageSearch.pagingAndSortingModel.pageSize = 1000000;
    this.roleService.getByRequest('Role', pageSearch).subscribe(
      (res) => {
        this.listRole = res.data.items ?? [];
      }
    );
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

  openModal(type: any, data: UserAccountEntity) {
    this.isInsert = true;
    this.Entity = new UserAccountEntity();
    if (type === 'EDIT') {
      this.Entity = data;
    }
  }
}
