import { Component } from '@angular/core';
import { DocumentData, Timestamp } from '@angular/fire/firestore';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Table } from 'src/app/models/interfaces/table.model';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-tables-tab',
  templateUrl: 'tables-tab.page.html',
  styleUrls: ['tables-tab.page.scss'],
})
export class TablesTabPage {
  pageSize = 10; // Number of tables to load per page
  loadedTablesCount = 0; // Number of tables currently loaded

  tables: Table[] = [];

  constructor(
    private navCtrl: NavController,
    private tableService: TableService,
  ) {
    this.loadTables();
  }

  private loadTables(): void {
    this.tableService.getTables().subscribe((res: DocumentData[]) => {
      res.map((table) => {
        table['time'] = null;
        this.tables.push(table as Table);
      });
      this.loadedTablesCount = this.tables.length;
    });
  }

  public loadMoreTables(event: any): void {
    this.tableService.getTables().subscribe((res: DocumentData[]) => {
      const newTables: Table[] = res
        .slice(this.loadedTablesCount, this.loadedTablesCount + this.pageSize)
        .map((table) => {
          table['time'] = null;
          return table as Table;
        });
      this.tables.push(...newTables);
      this.loadedTablesCount += newTables.length;

      if (event) {
        event.target.complete();
      }
    });
  }

  private formatTimestamp(timestamp: Timestamp): Date {
    const date = timestamp.toDate();
    return date;
  }

  public viewTable(table: Table) {
    this.tableService.getTableById(table.id).subscribe((tableData) => {
        tableData['time'] = null;

      let navigationExtras: NavigationExtras = {
        queryParams: {
          table: JSON.stringify(tableData)
        },
      };
      this.navCtrl.navigateForward(
        '/tabs/tables-tab/table-detail',
        navigationExtras
      );

    });
  }

}
