import { Component, Input } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-full-screen-spinner',
  template: `
    <div *ngIf="isLoading" class="full-screen-spin">
      <nz-spin [nzSize]="'large'"></nz-spin>
    </div>
  `,
  styles: [
    `
      .full-screen-spin {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.8);
      }
    `,
  ],
})
export class FullScreenSpinnerComponent {
  @Input() isLoading?: boolean;

  constructor(private loadingService: LoadingService) {
    this.loadingService.getLoading().subscribe((loading) => {
      this.isLoading = loading;
    });
  }
}
