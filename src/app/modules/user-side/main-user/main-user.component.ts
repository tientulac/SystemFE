import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { AppInjector } from 'src/app/app.module';
import { ProductDetail } from 'src/app/models/product-detail';
import { ProductImage } from 'src/app/models/product-image';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.scss']
})
export class MainUserComponent extends BaseComponent<ProductDetail> implements OnInit {
  dataTable: ProductDetail[] | undefined;
  images: ProductImage[] | undefined;

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
    private productDetailService: BaseService<ProductDetail>,
    private productImageService: BaseService<ProductImage>,
  ) {
    super(
      AppInjector.get(BaseService<ProductDetail>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.URL = 'api/v1/productDetail';
    this.URL_Upload = appConfig.URL_UPLOAD;
    this.title.setTitle('Trang chủ');
    this.productImageService.ss_getAll('api/v1/productImage').subscribe(
      (res) => {
        if (res.status == 200) {
          this.images = res.data;
        }
        else {
          this.toastr.warning(res.message);
        }
      }
    );
  }

  ngOnInit(): void {
    this.productDetailService.ss_getAll('api/v1/productDetail').subscribe(
      (res) => {
        if (res.status == 200) {
          this.dataTable = res.data;
          this.dataTable?.forEach(x => {
            x.poster = this.images && this.images.filter(p => p.product_id == x.id).length > 0 ? this.images?.filter(p => p.product_id == x.id)[0].image : '';
          });
          console.log(this.dataTable);
        }
        else {
          this.toastr.warning(res.message);
        }
      }
    );
  }
}
