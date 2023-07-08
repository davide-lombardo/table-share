import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tables-tab',
        loadChildren: () =>
          import('./tables-tab/tables-tab.module').then(
            (m) => m.TablesTabModule
          ),
      },
      {
        path: 'chat-tab',
        loadChildren: () =>
          import('./chat-tab/chat-tab.module').then((m) => m.ChatTabModule),
      },
      {
        path: 'notifications-tab',
        loadChildren: () =>
          import('./notifications-tab/notifications-tab.module').then(
            (m) => m.NotificationsTabModule
          ),
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
