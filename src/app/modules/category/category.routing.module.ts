import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicTypeComponent } from './topic-type/topic-type.component';
import { TopicComponent } from './topic/topic.component';
import { FavoriteTopicComponent } from './favorite-topic/favorite-topic.component';

const routes: Routes = [
    { path: 'topic-type', component: TopicTypeComponent },
    { path: 'topic', component: TopicComponent },
    { path: 'favorite-topic', component: FavoriteTopicComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }
