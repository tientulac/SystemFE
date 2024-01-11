import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { LIST_STATUS_CATEGORY } from 'src/app/_core/constant';
import { AppInjector } from 'src/app/app.module';
import { CategoryEntity, CategoryEntitySearch } from 'src/app/entities/Category.Entity';
import { CategoryTypeEntity, CategoryTypeEntitySearch } from 'src/app/entities/CategoryType.Entity';
import { PaginationEntity } from 'src/app/entities/Pagination.Entity';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent extends BaseComponent<CategoryEntity> {

  override EntitySearch: CategoryEntitySearch = {
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

  statuses = LIST_STATUS_CATEGORY;
  listCategoryType: CategoryTypeEntity[] | undefined;

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
    private categoryTypeService: BaseService<CategoryTypeEntity>
  ) {
    super(
      AppInjector.get(BaseService<CategoryEntity>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.Entity = new CategoryEntity();
    this.URL = 'Category';
    this.URL_Upload = appConfig.URL_UPLOAD;
    this.title.setTitle('Quản lý chủ đề');
    this.field_Validation = {
      code: false,
      name: false,
      status: false,
      categoryTypeId: false,
    };
    this.GROUP_BUTTON.ADD = true;
    this.GROUP_BUTTON.RELOAD = true;
    this.GROUP_BUTTON.FILTER = true;
    this.GROUP_BUTTON.SEARCH = true;
    this.getDataTable();
    this.getListCategoryType();
  }

  getListCategoryType() {
    let pageSearch: CategoryTypeEntitySearch = {
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
    this.categoryTypeService.getByRequest('CategoryType', pageSearch).subscribe(
      (res) => {
        this.listCategoryType = res.data.items ?? [];
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

  openModal(type: any, data: CategoryEntity) {
    this.isInsert = true;
    this.Entity = new CategoryEntity();
    if (type === 'EDIT') {
      this.Entity = data;
    }
    else {
      this.field_Validation.status = true;
      this.Entity.status = 0;
    }
  }
}
