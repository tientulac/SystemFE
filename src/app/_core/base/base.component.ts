import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ToastrService } from 'ngx-toastr';
import { ResponseAPI } from 'src/app/entities/ResponseAPI';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})

export class BaseComponent<T> {

  Entity!: T | null | any;
  EntitySearch!: T | {};
  Entities!: T[];
  URL: string = '';
  field_Validation: any = {};
  isSubmit: boolean = false;
  onSubmitting: boolean = false;

  isDisplayDelete: boolean = false;
  isDisplayDetail: boolean = false;
  isInsertDetail: boolean = false;
  isShownInfo = false;
  isChangePass = false;
  isFilter: boolean = false;
  isInsert: boolean = false;

  uploadFileName: any = '';
  URL_Upload: any = '';
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

  constructor(
    public baseService: BaseService<T>,
    public modal: NzModalService,
    public title: Title,
    public uploadImageService: UploadImageService,
    public toastr: ToastrService
  ) {
  }

  filesUpload: NzUploadFile[] = [];

  listFileUpload = [...this.filesUpload];

  search() {
    this.getList();
  }

  getList() {
    this.baseService.getByRequest(this.URL, this.EntitySearch).subscribe(
      (res: ResponseAPI<T[]>) => {
        if (res.code != '200') {
          this.handlerError(res);
          return;
        }
        this.Entities = res.data;
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
    let values = Object.keys(this.field_Validation).map(key => this.field_Validation[key]);
    this.isSubmit = values.every(x => x == true);
  }

  handleCancel(): void {
    this.modal.closeAll();
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
    this.handleCancel();
  }
}
