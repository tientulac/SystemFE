import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { BlogComponent } from './blog/blog.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotifycationComponent } from './notifycation/notifycation.component';
import { SystemLogComponent } from './system-log/system-log.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
    { path: 'role', component: RoleComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'user', component: UserComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'notifycation', component: NotifycationComponent },
    { path: 'system-log', component: SystemLogComponent },
    { path: 'cart', component: CartComponent },
    { path: 'order', component: OrderComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule { }
