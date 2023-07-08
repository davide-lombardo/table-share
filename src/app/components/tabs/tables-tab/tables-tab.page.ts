import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { faker } from '@faker-js/faker';
import { NavController } from '@ionic/angular';
import { delay, timer } from 'rxjs';
import { Table } from 'src/app/models/interfaces/table.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  pageSize = 10; // Number of tables to load per page
  loadedTablesCount = 0; // Number of tables currently loaded

  tables: Table[] = [];

  constructor(private router: Router, private navCtrl: NavController) {
    this.loadTables();
  }

  loadTables(event?: any) {
    const newTables = Array.from({ length: this.pageSize }).map(() => ({
      id: faker.string.uuid(),
      name: faker.company.name(),
      description: faker.commerce.productDescription(),
      time: faker.date.future(),
      location: faker.location.city(),
      address: faker.location.streetAddress(),
      contact: faker.phone.number(),
      images: faker.image.urlPicsumPhotos(),
      totalSeats: 8,
      participants: faker.number.int({ min: 0, max: 8 }),
    }));

    this.tables.push(...newTables);
    this.loadedTablesCount += this.pageSize;

    if (event) {
      event.target.complete();
    }
  }

  loadMoreTables(event: Event) {
    const infiniteScroll = event.target as HTMLIonInfiniteScrollElement;

    if (this.loadedTablesCount >= 100) {
      // No more tables to load
      infiniteScroll.complete();
      infiniteScroll.disabled = true;
      return;
    }

    timer(1000)
      .pipe(delay(0))
      .subscribe(() => {
        this.loadTables(event);
      });
  }

  joinTable(table: Table) {
    // Navigate to the table detail page and pass the selected item data
    const navigationExtras: NavigationExtras = {
      state: {
        table: table,
      },
    };

    this.navCtrl.navigateForward('/table-detail', navigationExtras);
  }
}
