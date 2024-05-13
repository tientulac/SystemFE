import { NgModule } from "@angular/core";
import { UtilityModule } from "src/app/_core/ultility.module";
import { BaseService } from "src/app/services/base.service";
import { FeatureModule } from "../feature/feature.module";
import { CategoryModule } from "../category/category.module";
import { MainUserComponent } from "./main-user/main-user.component";
import { MainRoutingModule } from "../main/main.routing.module";
import { UserSideRoutingModule } from "./user-side.routing.module";

@NgModule({
    declarations: [
        MainUserComponent,
    ],
    imports: [
        UserSideRoutingModule,
        UtilityModule,
        FeatureModule,
    ],
    providers: [
        BaseService
    ],
})

export class UserSideModule { }
