import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { LIST_STATUS_BLOG, LIST_TYPE_BLOG } from 'src/app/_core/constant';
import { AppInjector } from 'src/app/app.module';
import { BlogEntity, BlogEntitySearch } from 'src/app/entities/Blog.Entity';
import { PaginationEntity } from 'src/app/entities/Pagination.Entity';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent extends BaseComponent<BlogEntity> {

  override EntitySearch: BlogEntitySearch = {
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

  statuses = LIST_STATUS_BLOG;
  types = LIST_TYPE_BLOG;

  constructor(
    @Inject(AppConfig) public appConfig: AppConfiguration,
  ) {
    super(
      AppInjector.get(BaseService<BlogEntity>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.Entity = new BlogEntity();
    this.URL = 'Blog';
    this.URL_Upload = appConfig.URL_UPLOAD;
    this.URL_Record = appConfig.URL_RECORD;
    this.title.setTitle('Quản lý bài đăng');
    this.field_Validation = {
      code: false,
      status: false
    };
    this.GROUP_BUTTON.ADD = false;
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

  openModal(type: any, data: BlogEntity) {
    this.isInsert = true;
    this.Entity = new BlogEntity();
    if (type === 'EDIT') {
      this.Entity = data;
    }
  }

  onSortOrderChange(column: string, sortOrder: string): void {
    this.sortOrder = this.sortOrder === 'ascend' ? 'descend' : 'ascend';
    this.EntitySearch.pagingAndSortingModel.orderColumn = column;
    this.EntitySearch.pagingAndSortingModel.orderDirection = sortOrder === 'ascend' ? 'asc' : sortOrder === 'descend' ? 'desc' : '';
    this.getDataTable();
  }

  onSubmit() {
    this.onSubmitting = true;
    if (!this.isSubmit) {
      this.toastr.warning('Dữ liệu nhập chưa hợp lệ');
      return;
    }
    this.save();
  }
}
