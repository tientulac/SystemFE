import { NgModule } from "@angular/core";
import { BaseService } from "src/app/services/base.service";
import { UtilityModule } from "src/app/_core/ultility.module";
import { RoleComponent } from "./role/role.component";
import { FeatureRoutingModule } from "./feature.routing.module";
import { BlogComponent } from "./blog/blog.component";
import { UserComponent } from "./user/user.component";

@NgModule({
    declarations: [
        RoleComponent,
        BlogComponent,
        UserComponent
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
