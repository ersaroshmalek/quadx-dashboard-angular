import { Routes } from '@angular/router';

// import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { OtableComponent } from 'src/app/pages/overview_table/otable/otable.component';

export const AdminLayoutRoutes: Routes = [
    // { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'employee',       component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'overview',       component: MapsComponent },
    { path: 'overviewtable',  component: OtableComponent},
];
