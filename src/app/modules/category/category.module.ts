import { NgModule } from "@angular/core";
import { CategoryRoutingModule } from "./category.routing.module";
import { BaseService } from "src/app/services/base.service";
import { UtilityModule } from "src/app/_core/ultility.module";

@NgModule({
    declarations: [
    ],
    imports: [
        CategoryRoutingModule,
        UtilityModule
    ],
    providers: [
        BaseService
    ],
})

export class CategoryModule { }
