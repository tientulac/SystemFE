import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { LIST_STATUS_CATEGORY_TYPE } from 'src/app/_core/constant';
import { AppInjector } from 'src/app/app.module';
import { CategoryTypeEntity, CategoryTypeEntitySearch } from 'src/app/entities/CategoryType.Entity';
import { PaginationEntity } from 'src/app/entities/Pagination.Entity';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Component({
  selector: 'app-topic-type',
  templateUrl: './topic-type.component.html',
  styleUrls: ['./topic-type.component.scss']
})
export class TopicTypeComponent extends BaseComponent<CategoryTypeEntity> {

  override EntitySearch: CategoryTypeEntitySearch = {
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

  statuses = LIST_STATUS_CATEGORY_TYPE;

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
  ) {
    super(
      AppInjector.get(BaseService<CategoryTypeEntity>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.Entity = new CategoryTypeEntity();
    this.URL = 'CategoryType';
    this.URL_Upload = appConfig.URL_UPLOAD;
    this.title.setTitle('Quản lý loại chủ đề');
    this.field_Validation = {
      code: false,
      name: false,
      status: false
    };
    this.GROUP_BUTTON.ADD = true;
    this.GROUP_BUTTON.RELOAD = true;
    this.GROUP_BUTTON.FILTER = true;
    this.GROUP_BUTTON.SEARCH = true;
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

  openModal(type: any, data: CategoryTypeEntity) {
    this.isInsert = true;
    this.Entity = new CategoryTypeEntity();
    if (type === 'EDIT') {
      this.Entity = data;
    }
    else {
      this.field_Validation.status = true;
      this.Entity.status = 0;
    }
  }

  onSortOrderChange(column: string, sortOrder: string): void {
    this.sortOrder = sortOrder ? sortOrder : '';
    this.EntitySearch.pagingAndSortingModel.orderColumn = column;
    this.EntitySearch.pagingAndSortingModel.orderDirection = sortOrder === 'ascend' ? 'asc' : sortOrder === 'descend' ? 'desc' : '';
    this.getDataTable();
  }
}
