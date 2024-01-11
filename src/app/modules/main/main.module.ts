import { NgModule } from "@angular/core";
import { MainRoutingModule } from "./main.routing.module";
import { HeaderComponent } from "src/app/layouts/header/header.component";
import { FooterComponent } from "src/app/layouts/footer/footer.component";
import { SidebarComponent } from "src/app/layouts/sidebar/sidebar.component";
import { MainComponent } from "./main.component";
import { UtilityModule } from "src/app/_core/ultility.module";
import { BaseService } from "src/app/services/base.service";
import { FeatureModule } from "../feature/feature.module";
import { CategoryModule } from "../category/category.module";

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        MainComponent,
    ],
    imports: [
        MainRoutingModule,
        UtilityModule,
        FeatureModule,
        CategoryModule
    ],
    providers: [
        BaseService
    ],
})

export class MainModule { }
