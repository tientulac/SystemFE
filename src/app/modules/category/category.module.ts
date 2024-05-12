import { NgModule } from "@angular/core";
import { CategoryRoutingModule } from "./category.routing.module";
import { TopicTypeComponent } from "./topic-type/topic-type.component";
import { TopicComponent } from "./topic/topic.component";
import { FavoriteTopicComponent } from "./favorite-topic/favorite-topic.component";
import { UtilityModule } from "src/app/_core/ultility.module";
import { BaseService } from "src/app/services/base.service";
import { CatalogComponent } from "./catalog/catalog.component";
import { BrandComponent } from "./brand/brand.component";
import { ProductComponent } from "./product/product.component";

@NgModule({
    declarations: [
        TopicTypeComponent,
        TopicComponent,
        FavoriteTopicComponent,
        CatalogComponent,
        BrandComponent,
        ProductComponent,
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
