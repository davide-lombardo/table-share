import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faker } from '@faker-js/faker';
import { ModalController } from '@ionic/angular';
import { Table } from 'src/app/models/interfaces/table.model';

@Component({
  selector: 'app-table-detail',
  templateUrl: 'table-detail.page.html',
  styleUrls: ['table-detail.page.scss'],
})
export class TableDetailPage implements OnInit {
  table: Table = {
    id: faker.string.uuid(),
    name: faker.company.name(),
    description: faker.commerce.productDescription(),
    time: faker.date.future(),
    location: faker.location.city(),
    address: faker.location.streetAddress(),
    contact: faker.phone.number(),
    images: Array.from({ length: 5 }).map(() => faker.image.urlPicsumPhotos()),
    totalSeats: 8,
    participants: faker.number.int({ min: 0, max: 8 }),
    ageRange: faker.number.int({ min: 20, max: 50 }),
    participantsMetadata: [
      {
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        avatar: faker.image.avatar(),
        age: faker.number.int({ min: 18, max: 65 }),
      },
      {
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        avatar: faker.image.avatar(),
        age: faker.number.int({ min: 18, max: 65 }),
      },
      {
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        avatar: faker.image.avatar(),
        age: faker.number.int({ min: 18, max: 65 }),
      },
    ],
  };

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.route.paramMap.subscribe((params) => {
      const tableString = params.get('state');
      if (tableString) {
        this.table = JSON.parse(tableString);
      }
    });
  }

  // async openImageModal(imageUrl: string) {
  //   const modal = await this.modalCtrl.create({
  //     component: ImageModalComponent,
  //     componentProps: {
  //       imageUrl: imageUrl,
  //     },
  //   });
  //   await modal.present();
  // }
}
