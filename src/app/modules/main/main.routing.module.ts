import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'feature',
                loadChildren: () => import('../feature/feature.module').then(m => m.FeatureModule)
            },
            {
                path: 'category',
                loadChildren: () => import('../category/category.module').then(m => m.CategoryModule)
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
