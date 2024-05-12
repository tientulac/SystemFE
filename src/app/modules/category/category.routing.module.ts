import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicTypeComponent } from './topic-type/topic-type.component';
import { TopicComponent } from './topic/topic.component';
import { FavoriteTopicComponent } from './favorite-topic/favorite-topic.component';
import { CatalogComponent } from './catalog/catalog.component';
import { BrandComponent } from './brand/brand.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
    { path: 'topic-type', component: TopicTypeComponent },
    { path: 'topic', component: TopicComponent },
    { path: 'favorite-topic', component: FavoriteTopicComponent },
    { path: 'catalog', component: CatalogComponent },
    { path: 'brand', component: BrandComponent },
    { path: 'product', component: ProductComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }
