import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { LIST_TYPE_SYSTEM_LOG } from 'src/app/_core/constant';
import { AppInjector } from 'src/app/app.module';
import { PaginationEntity } from 'src/app/entities/Pagination.Entity';
import { SystemLogEntity, SystemLogEntitySearch } from 'src/app/entities/SystemLog.Entity';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Component({
  selector: 'app-system-log',
  templateUrl: './system-log.component.html',
  styleUrls: ['./system-log.component.scss']
})
export class SystemLogComponent extends BaseComponent<SystemLogEntity> {
  override EntitySearch: SystemLogEntitySearch = {
    pagingAndSortingModel: new PaginationEntity,
    id: null,
    createdAt: null,
    createdBy: null,
    updatedAt: null,
    updatedBy: null,
    deletedAt: null,
    deletedBy: null,
    isSoftDeleted: null,
    searchString: null,
    type: null,
    name: ''
  };

  types = LIST_TYPE_SYSTEM_LOG;

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
  ) {
    super(
      AppInjector.get(BaseService<SystemLogEntity>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.Entity = new SystemLogEntity();
    this.URL = 'SystemLog';
    this.URL_Upload = appConfig.URL_UPLOAD;
    this.title.setTitle('Quản lý log hệ thống');
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
