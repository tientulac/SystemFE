import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { AppInjector } from 'src/app/app.module';
import { CustomerEntity, CustomerEntitySearch } from 'src/app/entities/Customer.Entity';
import { PaginationEntity } from 'src/app/entities/Pagination.Entity';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Component({
  selector: 'app-user-customer',
  templateUrl: './user-customer.component.html',
  styleUrls: ['./user-customer.component.scss']
})
export class UserCustomerComponent extends BaseComponent<CustomerEntity> {

  override EntitySearch: CustomerEntitySearch = {
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

  @Input() SHOWCUSTOMERINFO: any = false;
  @Input() ID: any;
  @Output() handleCancelEvent = new EventEmitter<string>();

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
    private roleService: BaseService<CustomerEntity>
  ) {
    super(
      AppInjector.get(BaseService<CustomerEntity>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.Entity = new CustomerEntity();
    this.URL = 'Customer';
    this.URL_Upload = appConfig.URL_UPLOAD;
  }

  ngAfterViewInit(): void {
    this.getDataTable();
  }

  getDataTable() {
    this.EntitySearch.userId = this.ID;
    this.EntitySearch.pagingAndSortingModel.pageIndex = this.pageIndex;
    this.EntitySearch.pagingAndSortingModel.pageSize = this.pageSize;
    this.getList();
  }

  closeModal() {
    this.handleCancelEvent.emit();
  }

  onSortOrderChange(column: string, sortOrder: string): void {
    this.sortOrder = this.sortOrder === 'ascend' ? 'descend' : 'ascend';
    this.EntitySearch.pagingAndSortingModel.orderColumn = column;
    this.EntitySearch.pagingAndSortingModel.orderDirection = sortOrder === 'ascend' ? 'asc' : sortOrder === 'descend' ? 'desc' : '';
    this.getDataTable();
  }
}
