import { Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, map, of } from 'rxjs';
import { Table } from 'src/app/models/interfaces/table.model';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-tables-tab',
  templateUrl: 'tables-tab.page.html',
  styleUrls: ['tables-tab.page.scss'],
})
export class TablesTabPage {
  tables$: Observable<Table[]> = of([]);

  // loadedTablesCount = 0;
  noMoreTablesToLoad = false;
  loading = false;

  constructor(
    private navCtrl: NavController,
    private tableService: TableService
  ) {
    this.loadTables();
  }

  loadTables() {
    this.tables$ = this.tableService.loadMoreTables();
  }

  public onScroll(): void {
    if (this.noMoreTablesToLoad) {
      return; 
    }
    
    this.loading = true;
    this.tableService.loadMoreTables().subscribe((newTables: Table[]) => {
     if (newTables.length === 0) {
      this.noMoreTablesToLoad = true;
      this.loading = false;
     } else {
       this.tables$ = this.tables$.pipe(
         map((tables: Table[]) => tables.concat(newTables))
       );
     }
     this.loading = false;
    });
  }

  public viewTable(table: Table): void {
    this.tableService.getTableById(table.id).subscribe((tableData) => {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          table: JSON.stringify(tableData),
        },
      };

      this.navCtrl.navigateForward(
        '/tabs/tables-tab/table-detail',
        navigationExtras
      );
    });
  }
}
