import { Injectable } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  addDoc,
  arrayUnion,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where
} from '@angular/fire/firestore';
import { faker } from '@faker-js/faker';
import { Observable, first, from, map, of, switchMap } from 'rxjs';
import { JoinTableRequestDto } from '../models/interfaces/requests/JoinTableRequestDto';
import { ParticipantsMetadata, Table } from '../models/interfaces/table.model';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private lastDocumentRef: any; // Store the reference to the last visible document

  constructor(private firestore: Firestore) {}

  public getTables(): Observable<Table[]> {
    const tablesRef = collection(this.firestore, 'tables');
    return collectionData(tablesRef, { idField: 'id' });
  }

  public loadMoreTables(): Observable<Table[]> {
    if (this.lastDocumentRef) {
      const tablesRef = collection(this.firestore, 'tables');
      const nextQuery = query(
        tablesRef,
        orderBy('createdAt'), 
        startAfter(this.lastDocumentRef),
        limit(10)
      );
      return collectionData(nextQuery, { idField: 'id' }).pipe(
        map((tables: Table[]) => {
          if (tables.length > 0) {
            this.lastDocumentRef = doc(
              this.firestore,
              'tables/' + tables[tables.length - 1].id
            );
          }
          return tables;
        })
      );
    } else {
      // Load initial set of tables
      return this.getTables().pipe(
        switchMap((tables: Table[]) => {
          if (tables.length > 0) {
            this.lastDocumentRef = doc(
              this.firestore,
              'tables/' + tables[tables.length - 1].id
            );
          }
          return of(tables); // Use `of` operator to wrap the tables array in an Observable
        })
      );
    }
  }

  public getTableById(tableId: string | undefined): Observable<DocumentData> {
    const tableDocRef = doc(this.firestore, `tables/${tableId}`);
    return docData(tableDocRef, { idField: 'id' });
  }

  public createTable(tableData: Table): Promise<DocumentReference> {
    tableData.address = 'indirizzo placeholder';
    tableData.location = 'location placeholder';
    tableData.description = 'description placeholder';
    tableData.images = [
      'https://picsum.photos/seed/MHfRj/640/480',
      'https://picsum.photos/seed/rbKIN/640/480',
      'https://picsum.photos/seed/9QZgm1f/640/480',
      'https://picsum.photos/seed/TNJLq7aO/640/480',
    ];

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

  public joinTable(tableId: string | undefined, req: JoinTableRequestDto) {
    // Generate a join code for the table
    // const joinCode = generateJoinCode();
    // Store the join code in the table document
    // updateDoc({ joinCode: joinCode });

    const joinCode = this.generateJoinCode();

    const tableDocRef = doc(this.firestore, `tables/${tableId}`);
    const participantsMetadata = {
      id: req.id,
      name: null,
      avatar: req.avatarUrl,
      age: null,
    };

    return updateDoc(tableDocRef, {
      participantsMetadata: arrayUnion(participantsMetadata),
    });
  }

  private generateJoinCode(): string {
    const codeLength = 6;
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let joinCode = '';

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      joinCode += characters[randomIndex];
    }

    return joinCode;
  }

  public joinTableByCode(
    joinCode: string,
    req: any | undefined
  ): Observable<void> {
    // Check if the provided join code exists and fetch the table details
    const tablesRef = collection(this.firestore, 'tables');
    const q = query(tablesRef, where('joinCode', '==', joinCode));

    return from(getDocs(q)).pipe(
      // Wrap the Promise with 'from' to convert it into an Observable
      switchMap((querySnapshot) => {
        if (!querySnapshot.empty) {
          const tableDoc = querySnapshot.docs[0];
          const tableId = tableDoc.id;

          // Assuming `req` has the necessary data for the participant (id, name, avatar, age)
          const participantData: ParticipantsMetadata = {
            id: req.id,
            name: req.name,
            avatar: req.avatar,
            age: req.age,
          };

          // Update the `participants` field in the table document with the new participant data
          const tableDocRef = doc(this.firestore, `tables/${tableId}`);
          return updateDoc(tableDocRef, {
            participantsMetadata: arrayUnion(participantData),
          });
        } else {
          // Handle case when the join code is invalid or not found
          console.log('Invalid join code.');
          throw new Error('Invalid join code.'); // Throw an error to handle it in the subscriber
        }
      }),
      first() // Only take the first emitted value and complete the observable
    );
  }

  public canUserJoinTable() {
    // if user has not other table joined in the same date
    // if user has not already table joined this table
    // if user has received and entered join code
  }

  // public canUserJoinTable2(
  //   userId: string,
  //   tableId: string
  // ): Observable<boolean> {
  //   // First, check if the user has not joined any other table on the same date
  //   const tablesRef = collection(this.firestore, 'tables');
  //   const q = query(
  //     tablesRef,
  //     where('participantsMetadata', 'array-contains', { userId })
  //   );

  //   return from(getDocs(q)).pipe(
  //     switchMap((querySnapshot) => {
  //       const hasOtherTableJoined = querySnapshot.docs.some(
  //         (doc) => doc.id !== tableId
  //       );
  //       if (hasOtherTableJoined) {
  //         // User has joined another table on the same date, so they cannot join this table
  //         return [false];
  //       } else {
  //         // Now, check if the user has already joined this table
  //         const tableRef = doc(this.firestore, `tables/${tableId}`);
  //         return docData(tableRef).pipe(
  //           switchMap((tableData: Table) => {
  //             const hasJoinedThisTable = tableData.participantsMetadata.some(
  //               (participant) => participant.id === userId
  //             );
  //             if (hasJoinedThisTable) {
  //               // User has already joined this table, so they cannot join again
  //               return [false];
  //             } else {
  //               // Lastly, check if the user has received and entered the join code
  //               // Assuming you have some mechanism to store and validate the join code
  //               const hasEnteredJoinCode = true; // Set this based on your implementation
  //               return [hasEnteredJoinCode];
  //             }
  //           })
  //         );
  //       }
  //     }),
  //     first()
  //   );
  // }

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
