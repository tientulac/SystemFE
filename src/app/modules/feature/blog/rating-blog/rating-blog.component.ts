import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { LIST_STATUS_RATING_BLOG, LIST_TYPE_RATING_BLOG } from 'src/app/_core/constant';
import { AppInjector } from 'src/app/app.module';
import { PaginationEntity } from 'src/app/entities/Pagination.Entity';
import { RatingBlogEntity, RatingBlogEntitySearch } from 'src/app/entities/RatingBlog.Entity';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Component({
  selector: 'app-rating-blog',
  templateUrl: './rating-blog.component.html',
  styleUrls: ['./rating-blog.component.scss']
})
export class RatingBlogComponent extends BaseComponent<RatingBlogEntity> {

  statuses = LIST_STATUS_RATING_BLOG;
  types = LIST_TYPE_RATING_BLOG;

  override EntitySearch: RatingBlogEntitySearch = {
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

  @Input() SHOWRATINGBLOG: any = false;
  @Input() ID: any;
  @Output() handleCancelEvent = new EventEmitter<string>();

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
    private roleService: BaseService<RatingBlogEntity>
  ) {
    super(
      AppInjector.get(BaseService<RatingBlogEntity>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.Entity = new RatingBlogEntity();
    this.URL = 'RatingBlog';
    this.URL_Upload = appConfig.URL_UPLOAD;
    this.URL_Record = appConfig.URL_RECORD;
  }

  ngAfterViewInit(): void {
    this.getDataTable();
  }

  getDataTable() {
    this.EntitySearch.blogId = this.ID;
    this.EntitySearch.pagingAndSortingModel.pageIndex = this.pageIndex;
    this.EntitySearch.pagingAndSortingModel.pageSize = this.pageSize;
    this.getList();
  }

  closeModal() {
    this.handleCancelEvent.emit();
  }

  submit(data: RatingBlogEntity) {
    this.baseService.save(this.URL + '/approve', data).subscribe(
      (res) => {
        if (res.code === '200') {
          this.toastr.success(res.message ?? '');
        }
        else {
          this.toastr.warning(res.message ?? '');
        }
      }
    );
  }

  onSortOrderChange(column: string, sortOrder: string): void {
    this.sortOrder = this.sortOrder === 'ascend' ? 'descend' : 'ascend';
    this.EntitySearch.pagingAndSortingModel.orderColumn = column;
    this.EntitySearch.pagingAndSortingModel.orderDirection = sortOrder === 'ascend' ? 'asc' : sortOrder === 'descend' ? 'desc' : '';
    this.getDataTable();
  }
}
