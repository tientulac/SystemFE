import { NgModule } from "@angular/core";
import { BaseService } from "src/app/services/base.service";
import { UtilityModule } from "src/app/_core/ultility.module";
import { RoleComponent } from "./role/role.component";
import { FeatureRoutingModule } from "./feature.routing.module";

@NgModule({
    declarations: [
        RoleComponent,
    ],
    imports: [
        FeatureRoutingModule,
        UtilityModule
    ],
    providers: [
        BaseService
    ],
})

export class FeatureModule { }
