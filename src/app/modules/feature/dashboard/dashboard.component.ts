import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/_core/base/base.component';
import { AppInjector } from 'src/app/app.module';
import { BlogEntity, BlogEntitySearch } from 'src/app/entities/Blog.Entity';
import { PaginationEntity } from 'src/app/entities/Pagination.Entity';
import { ResponseAPI } from 'src/app/entities/ResponseAPI';
import { ResponseDashboard } from 'src/app/entities/ResponseDashboard';
import { BaseService } from 'src/app/services/base.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { AppConfig, AppConfiguration } from 'src/configuration';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent<BlogEntity> {
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

  dataDashboard?: ResponseDashboard;
  dataRatingBlogChart: any;
  chart: Chart | any;

  constructor(
    @Inject(AppConfig) public appConfig: AppConfiguration,
    public dashboardService: BaseService<any>
  ) {
    super(
      AppInjector.get(BaseService<BlogEntity>),
      AppInjector.get(NzModalService),
      AppInjector.get(Title),
      AppInjector.get(UploadImageService),
      AppInjector.get(ToastrService),
    );
    this.Entity = new BlogEntity();
    this.URL = 'Dashboard';
    this.URL_Upload = appConfig.URL_UPLOAD;
    this.URL_Record = appConfig.URL_RECORD;
    this.title.setTitle('Dashboard');
    this.dataDashboard = new ResponseDashboard();
    this.getDataDashboard();
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {

  }

  getDataDashboard() {
    this.isLoading = true;
    this.dashboardService.postAsync('Dashboard/get-count-dashboard', {}).subscribe(
      (res: ResponseAPI<ResponseDashboard>) => {
        this.dataDashboard = res.data;
      }
    );
    this.dashboardService.postAsync('Dashboard/get-count-comment-week', {}).subscribe(
      (res: ResponseAPI<any>) => {
        this.dataRatingBlogChart = res.data;
        this.chart = new Chart("MyChart", {
          type: 'bar', //this denotes tha type of chart
          data: {// values on X-Axis
            labels: this.dataRatingBlogChart.map((x: any) => x.dayInWeek.toString().substring(0, 10)),
            datasets: [
              {
                label: "Lượt đánh giá",
                data: this.dataRatingBlogChart.map((x: any) => x.total),
                backgroundColor: 'blue'
              }
            ]
          },
          options: {
            aspectRatio: 2.5
          }

        });
      }
    );
    this.isLoading = false;
  }
}
