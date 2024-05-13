import { NgModule } from "@angular/core";
import { BaseService } from "src/app/services/base.service";
import { UtilityModule } from "src/app/_core/ultility.module";
import { RoleComponent } from "./role/role.component";
import { FeatureRoutingModule } from "./feature.routing.module";
import { BlogComponent } from "./blog/blog.component";
import { UserComponent } from "./user/user.component";
import { UserCustomerComponent } from "./user/user-customer/user-customer.component";
import { RatingBlogComponent } from "./blog/rating-blog/rating-blog.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NotifycationComponent } from "./notifycation/notifycation.component";
import { SystemLogComponent } from "./system-log/system-log.component";
import { CartComponent } from "./cart/cart.component";
import { OrderComponent } from "./order/order.component";

@NgModule({
    declarations: [
        RoleComponent,
        BlogComponent,
        UserComponent,
        UserCustomerComponent,
        RatingBlogComponent,
        DashboardComponent,
        NotifycationComponent,
        SystemLogComponent,
        CartComponent,
        OrderComponent
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
