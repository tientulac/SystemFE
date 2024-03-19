import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ToastrService } from 'ngx-toastr';
import { PaginatedList, ResponseAPI } from 'src/app/entities/ResponseAPI';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import * as _ from 'lodash';

interface statusModel {
  id?: number | null;
  code?: string | null;
  name?: string | null;
}

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})

export class BaseComponent<T> {

  sortOrder: any;

  Entity!: T | null | any;
  EntitySearch!: any | {};
  Entities!: T[] | null | undefined;
  URL: string = '';
  field_Validation: any = {};
  isSubmit: boolean = false;
  onSubmitting: boolean = false;

  isDisplayDelete: boolean = false;
  isDisplayCustomerInfo: boolean = false;
  isDisplayRatingBlog: boolean = false;
  isDisplayDetail: boolean = false;
  isInsertDetail: boolean = false;
  isInsert: boolean = false;
  isShownInfo = false;
  isChangePass = false;
  isFilter: boolean = false;

  uploadFileName: any = '';
  URL_Upload: any = '';
  URL_Record: any = '';
  id_record: any = null;
  id_edit: any = null;
  isEdit: boolean = false;
  dateRange: any;
  listStatus: any = [];

  GROUP_BUTTON = {
    EXCEL: false,
    FILTER: false,
    RELOAD: false,
    SEARCH: false,
    ADD: false
  }

  pageIndex = 1;
  currentPage = 1;
  pageSize = 10;
  searchString = '';
  totalCount = 0;
  pageSizes = [10, 20, 30, 40]
  constructor(
    public baseService: BaseService<T>,
    public modal: NzModalService,
    public title: Title,
    public uploadImageService: UploadImageService,
    public toastr: ToastrService
  ) {
  }

  filesUpload: NzUploadFile[] = [];
  isLoading: boolean = false;
  listFileUpload = [...this.filesUpload];

  search() {
    this.getList();
  }

  getList() {
    this.isLoading = true;
    this.baseService.getByRequest(this.URL, this.EntitySearch).subscribe(
      (res: ResponseAPI<PaginatedList<T>>) => {
        if (res.code != '200') {
          this.handlerError(res);
        }
        else {
          this.Entities = res.data.items;
          this.totalCount = res.data.totalCount ?? 0;
        }
        this.isLoading = false;
      }
    );
  }

  export() {
    this.baseService.export(this.URL).subscribe(
      (res: ResponseAPI<ArrayBuffer>) => {
        if (res.code != '200') {
          this.handlerError(res);
          return;
        }
        const linkSource = 'data:application/octet-stream;base64,' + res.data;
        const downloadLink = document.createElement('a');
        const fileName = `${this.URL}.xlsx`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      }
    );
  }

  getAll() {
    this.baseService.getAll(this.URL).subscribe(
      (res: ResponseAPI<T[]>) => {
        if (res.code != '200') {
          this.handlerError(res);
          return;
        }
        this.Entities = res.data;
      }
    );
  }

  save() {
    this.baseService.save(this.URL, this.Entity).subscribe(
      (res: ResponseAPI<T>) => {
        if (res.code != '200') {
          this.handlerError(res);
          return;
        }
        this.Entity = res.data;
        this.toastr.success("Thành công !");
        this.handleCancel();
      }
    );
  }

  validateCustom() {
    console.log(this.field_Validation);
    let values = Object.keys(this.field_Validation).map(key => this.field_Validation[key]);
    this.isSubmit = values.every(x => x == true);
  }

  handleCancel(): void {
    this.isInsert = false;
    this.isDisplayDelete = false;
    this.isDisplayCustomerInfo = false;
    this.isDisplayRatingBlog = false;
    this.isDisplayDetail = false;
    this.isInsertDetail = false;
    this.isShownInfo = false;
    this.isChangePass = false;

    // this.modal.closeAll();
    this.getList();
  }

  handleUpload = (item: any) => {
    const formData = new FormData();
    formData.append(item.name, item.file as any, this.uploadFileName);
    this.uploadImageService.upload(formData).subscribe(
      (res: ResponseAPI<File>) => {
        if (res.code != '200') {
          this.handlerError(res);
          return;
        }
        item.onSuccess(item.file);
        this.Entity.image = res.message;
        console.log(this.listFileUpload);
      }
    );
  };

  beforeUpload = (file: NzUploadFile): boolean => {
    this.uploadFileName = `${this.URL}_${this.Entity?.code}.jpg`;
    return true;
  };

  beforeUploadAttribute = (file: NzUploadFile): boolean => {
    this.uploadFileName = `image_${new Date().getTime()}.jpg`;
    return true;
  };

  displayFilter() {
    this.isFilter = !this.isFilter;
  }

  renderStatus(status: any) {
    return this.listStatus.filter((x: any) => x.id == status)[0].name ?? '';
  }

  handlerError(response: ResponseAPI<any> | null) {
    this.toastr.warning(response?.message ?? '');
  }

  renderNameStatus(list: statusModel[], value: any) {
    return list?.find(x => x.id == value)?.name ?? '';
  }

  renderContent(content: string | null) {
    return content ? (content.length > 200 ? content.substring(0, 200) + ' ...' : content) : '';
  }
}
