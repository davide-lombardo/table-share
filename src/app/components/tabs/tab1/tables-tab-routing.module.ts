import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableDetailPage } from './table-detail/table-detail.page';
import { TablesTabPage } from './tables-tab.page';

const routes: Routes = [
  {
    path: '',
    component: TablesTabPage,
  },
  {
    path: 'table-detail',
    component: TableDetailPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesTabRoutingModule {}
