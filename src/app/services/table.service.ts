import { Injectable } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  updateDoc,
} from '@angular/fire/firestore';
import { faker } from '@faker-js/faker';
import { Observable } from 'rxjs';
import { ParticipantsMetadata, Table } from '../models/interfaces/table.model';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private firestore: Firestore) {}

  public getTables(): Observable<DocumentData[]> {
    const tablesRef = collection(this.firestore, 'tables');
    return collectionData(tablesRef, { idField: 'id' });
  }

  public getTableById(tableId: string | undefined): Observable<DocumentData> {
    const tableDocRef = doc(this.firestore, `tables/${tableId}`);
    return docData(tableDocRef, { idField: 'id' });
  }

  public createTable(tableData: Table): Promise<DocumentReference> {
    const tablesRef = collection(this.firestore, 'tables');
    return addDoc(tablesRef, tableData);
  }

  public deleteTable(tableId: string): Promise<void> {
    const tableDocRef = doc(this.firestore, `tables/${tableId}`);
    return deleteDoc(tableDocRef);
  }

  public updateTable(tableData: Partial<Table>): Promise<void> {
    const request = {
      name: tableData.name,
      description: tableData.description,
      time: tableData.time,
    };
    const tableDocRef = doc(this.firestore, `tables/${tableData.id}`);
    return updateDoc(tableDocRef, request);
  }

  public joinTable(tableId: string, userId: string): Promise<void> {
    const tableDocRef = doc(this.firestore, `tables/${tableId}`);
    const request = {
      participants: userId,
    };

    return updateDoc(tableDocRef, request);
  }

  public leaveTable(tableId: string, userId: string): Promise<void> {
    const tableDocRef = doc(this.firestore, `tables/${tableId}`);
    const request = {
      participants: userId,
    };

    return updateDoc(tableDocRef, request);
  }

  public createDummyTables(): Promise<void> {
    const tablePromises: Promise<DocumentReference>[] = [];

    for (let i = 0; i < 100; i++) {
      const tableData: Table = {
        id: faker.string.uuid(),
        name: faker.company.name(),
        description: faker.commerce.productDescription(),
        time: faker.date.future(), // Convert to Timestamp
        location: faker.location.city(),
        address: faker.location.streetAddress(),
        contact: faker.phone.number(),
        images: Array.from({ length: 4 }).map(() =>
          faker.image.urlPicsumPhotos()
        ),
        totalSeats: 8,
        participants: faker.number.int({ min: 0, max: 8 }),
        maxAge: 40,
        minAge: 20,
        participantsMetadata: [],
      };

      if (tableData.participants) {
        tableData.participantsMetadata = [];

        for (let j = 0; j < tableData?.participants; j++) {
          const participantMetadata: ParticipantsMetadata = {
            id: faker.string.uuid(),
            name: faker.person.firstName(),
            avatar: faker.image.avatar(),
            age: faker.number.int({ min: 18, max: 65 }),
          };

          tableData.participantsMetadata.push(participantMetadata);
        }
      }

      const tablePromise = this.createTable(tableData);
      tablePromises.push(tablePromise);
    }

    return Promise.all(tablePromises)
      .then(() => {
        console.log('Dummy tables created successfully');
      })
      .catch((error) => {
        console.error('Error creating dummy tables:', error);
      });
  }
}
