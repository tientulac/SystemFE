import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { AppInjector } from 'src/app/app.module';
import { Brand } from 'src/app/models/brand';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductDescription } from 'src/app/models/product-description';
import { ProductDetail } from 'src/app/models/product-detail';
import { ProductImage } from 'src/app/models/product-image';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends BaseComponent<Product> {
  dataTable: Product[] | undefined;
  categories: Category[] | undefined;
  brands: Brand[] | undefined;
  productDetail = new ProductDetail();
  productDescription = new ProductDescription();
  productImage = new ProductImage();
  productsDetail: ProductDetail[] | undefined;
  productsDescription: ProductDescription[] | undefined;
  productsImage: ProductImage[] | undefined;
  isProductDescription: boolean = false;
  isProductImage: boolean = false;

  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
    private productService: BaseService<Product>,
    private productDetailService: BaseService<ProductDetail>,
    private productDescriptionService: BaseService<ProductDescription>,
    private productImageService: BaseService<ProductImage>,
  ) {
    super(
      AppInjector.get(BaseService<Product>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.Entity = new Product();
    this.URL = 'api/v1/product';
    this.URL_Upload = appConfig.URL_UPLOAD;
    this.title.setTitle('Quản lý sản phẩm');
    this.field_Validation = {
      code: false,
      name: false,
      brand_id: false,
      category_id: false,
    };
    this.GROUP_BUTTON.ADD = true;
    this.GROUP_BUTTON.RELOAD = true;
    this.getDataTable();
  }

  getDataTable() {
    this.ss_getAll();
  }

  onSubmit() {
    this.onSubmitting = true;
    if (!this.isSubmit) {
      this.toastr.warning('Dữ liệu nhập chưa hợp lệ');
      return;
    }
    this.ss_save();
  }

  openModal(type: any, data: Product) {
    this.getDataCustom();
    this.isInsert = true;
    this.Entity = new Product();
    if (type === 'EDIT') {
      this.Entity = data;
    }
    if (type === 'DETAIL') {
      this.productDetail = new ProductDetail();
      this.productDetail.product_id = data.id;
      this.isInsert = false;
      this.isDisplayDetail = true;
      this.Entity = data;
      this.productDetail.product_id = this.Entity.id;
    }
  }

  openModalAttribute(type: any, data: ProductDetail) {
    this.getDataCustom();
    if (type === 'DESCRIPTION') {
      this.productDetail = data;
      this.productDescription = new ProductDescription();
      this.productDescription.product_id = data.id;
    }
    if (type === 'IMAGE') {
      this.productDetail = data;
      this.productImage = new ProductImage();
      this.productImage.product_id = data.id;
    }
  }
  getDataCustom() {
    this.baseService.ss_getAllCustom('api/v1/category').subscribe(
      (res) => {
        if (res.status == 200) {
          this.categories = res.data.filter((x: Category) => x._delete != true && x.parent_category_id);
        }
        else {
          this.toastr.warning(res.message);
        }
      }
    );
    this.baseService.ss_getAllCustom('api/v1/brand').subscribe(
      (res) => {
        if (res.status == 200) {
          this.brands = res.data.filter((x: any) => x._delete != true);
        }
        else {
          this.toastr.warning(res.message);
        }
      }
    );
    this.baseService.ss_getAllCustom('api/v1/productDetail').subscribe(
      (res) => {
        if (res.status == 200) {
          this.productsDetail = res.data.filter((x: ProductDetail) => x.product_id == this.Entity.id);
        }
        else {
          this.toastr.warning(res.message);
        }
      }
    );
    this.baseService.ss_getAllCustom('api/v1/productDescription').subscribe(
      (res) => {
        if (res.status == 200) {
          this.productsDescription = res.data.filter((x: ProductDescription) => x.product_id == this.productDetail.id);
        }
        else {
          this.toastr.warning(res.message);
        }
      }
    );
    this.baseService.ss_getAllCustom('api/v1/productImage').subscribe(
      (res) => {
        if (res.status == 200) {
          this.productsImage = res.data.filter((x: ProductImage) => x.product_id == this.productDetail.id);
        }
        else {
          this.toastr.warning(res.message);
        }
      }
    );
  }

  addDetail() {
    this.productDetail.product_id = this.Entity.id;
    this.productDetail.amount = Number(this.productDetail.amount);
    this.productDetail.price = Number(this.productDetail.price);
    this.productDetailService.ss_save('api/v1/productDetail', this.productDetail).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success('Thành công');
          this.getDataCustom();
          this.productDetail = new ProductDetail();
          this.isEdit = false;
        }
        else {
          this.toastr.warning(res.message);
        }
      }
    );
  }

  addDescription() {
    this.productDescriptionService.ss_save('api/v1/productDescription', this.productDescription).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success('Thành công');
          this.getDataCustom();
          this.productDescription = new ProductDescription();
        }
        else {
          this.toastr.warning(res.message);
        }
      }
    );
  }

  addImage() {
    this.productDetailService.ss_save('api/v1/productImage', this.productImage).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success('Thành công');
          this.getDataCustom();
          this.productImage = new ProductImage();
        }
        else {
          this.toastr.warning(res.message);
        }
      }
    );
  }
  deleteDetail(item: ProductDetail) {
    this.productDetailService.ss_delete('api/v1/productDetail/' + item.id).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success('Thành công');
          this.getDataCustom();
        }
        else {
          this.toastr.warning(res.message);
        }
      }
    );
  }

  deleteDesc(item: ProductDescription) {
    this.productDescriptionService.ss_delete('api/v1/productDescription/' + item.id).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success('Thành công');
          this.getDataCustom();
        }
        else {
          this.toastr.warning(res.message);
        }
      }
    );
  }

  deleteImage(item: ProductImage) {
    this.productImageService.ss_delete('api/v1/productImage/' + item.id).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success('Thành công');
          this.getDataCustom();
        }
        else {
          this.toastr.warning(res.message);
        }
      }
    );
  }

  handleCancelProductAttribute() {
    this.isProductDescription = false;
    this.isProductImage = false;
  }
}
