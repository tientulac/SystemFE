import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { LIST_STATUS_NOTIFYCATION, LIST_TYPE_NOTIFYCATION } from 'src/app/_core/constant';
import { AppInjector } from 'src/app/app.module';
import { NotifycationEntity, NotifycationEntitySearch } from 'src/app/entities/Notification.Entity';
import { PaginationEntity } from 'src/app/entities/Pagination.Entity';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Component({
  selector: 'app-notifycation',
  templateUrl: './notifycation.component.html',
  styleUrls: ['./notifycation.component.scss']
})
export class NotifycationComponent extends BaseComponent<NotifycationEntity> {
  override EntitySearch: NotifycationEntitySearch = {
    pagingAndSortingModel: new PaginationEntity,
    id: null,
    createdAt: null,
    createdBy: null,
    updatedAt: null,
    updatedBy: null,
    deletedAt: null,
    deletedBy: null,
    isSoftDeleted: null,
    message: '',
    searchString: null
  };
  statuses = LIST_STATUS_NOTIFYCATION;
  types = LIST_TYPE_NOTIFYCATION;

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
  ) {
    super(
      AppInjector.get(BaseService<NotifycationEntity>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.Entity = new NotifycationEntity();
    this.URL = 'Notifycation';
    this.URL_Upload = appConfig.URL_UPLOAD;
    this.title.setTitle('Quản lý thông báo');
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
}
