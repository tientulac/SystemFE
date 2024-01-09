import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
        path: 'main',
        component: MainComponent,
        children: [
            {
                path: 'feature',
                loadChildren: () => import('../feature/feature.module').then(m => m.FeatureModule)
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
