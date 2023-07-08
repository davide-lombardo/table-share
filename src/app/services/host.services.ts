// import {
//   collection,
//   DocumentData,
//   query,
//   where,
//   doc,
//   DocumentReference,
//   getDoc,
//   getDocs,
//   orderBy,
// } from 'firebase/firestore';
// import _ from 'lodash';
// import { Booking } from '../@types/Booking.d';
// import { Host } from '../@types/Host.d';
// import { db } from '../configs/firebase';
// import {
//   getDaysArray,
//   getWeekDayName,
//   isRequiredSlotCompatibleWithOpeningTime,
//   StringToDateTime,
// } from '../utils/date-utils';

// export default class HostService implements Host.Info {
//   public readonly name: string;
//   public readonly description: string;
//   public readonly address: Address;
//   public readonly spaces: Host.Space[];
//   public readonly contact: Host.Contact;
//   public readonly images: string[];
//   public readonly tags: string[];
//   public readonly openingDays: Host.OpeningDays;
//   public readonly id: string;

//   constructor({
//     name,
//     description,
//     address,
//     spaces,
//     contact,
//     images,
//     tags,
//     openingDays,
//     id,
//   }: Host.Info) {
//     this.name = name;
//     this.description = description;
//     this.address = address;
//     this.spaces = spaces;
//     this.contact = contact;
//     this.images = images;
//     this.tags = tags;
//     this.openingDays = openingDays;
//     this.id = id;
//   }

//   /**
//    * Performs query and return a list of hosts
//    * @param filters
//    * @returns
//    */
//   public static async findMany(
//     filters: Host.Filters
//   ): Promise<Host.SearchResult[]> {
//     const { address, tags } = filters;
//     let { date, timeSlot: requiredTimeSlot } = filters;

//     if (typeof address !== 'string' || !address.trim().length)
//       throw new TypeError('Address is not a valid string');

//     try {
//       const hostsRef = collection(db, 'host');
//       const spacesRef = collection(db, 'spaces');
//       const bookingsRef = collection(db, 'bookings');

//       const hostsQueryClauses = [where('address.city', '==', address)];

//       tags &&
//         tags.forEach((tag) =>
//           hostsQueryClauses.push(where('tags', 'array-contains', tag))
//         );

//       const hostsQuery = query(hostsRef, ...hostsQueryClauses);

//       const hostsQuerySnapshot = await getDocs(hostsQuery);

//       const filteredHostsRefs: DocumentReference<DocumentData>[] = [];

//       hostsQuerySnapshot.forEach(async (document) => {
//         const host = { ...document.data(), id: document.id } as Host.Info;

//         if (date) {
//           const { start: dateStart, end: dateEnd } = date;
//           const { openingDays } = host;
//           const isOpenInRequiredDates = getDaysArray(dateStart, dateEnd).every(
//             (day) => {
//               if (!requiredTimeSlot)
//                 return openingDays[getWeekDayName(day, 'it-IT')].length > 0;
//               else {
//                 return isRequiredSlotCompatibleWithOpeningTime(
//                   day,
//                   requiredTimeSlot,
//                   openingDays
//                 );
//               }
//             }
//           );

//           isOpenInRequiredDates && filteredHostsRefs.push(document.ref);
//         } else {
//           filteredHostsRefs.push(document.ref);
//         }
//       });

//       // SPACES
//       if (typeof date !== 'object') {
//         date = {
//           start: new Date().setHours(0),
//           end: new Date().setHours(23),
//         };
//       }

//       if (typeof requiredTimeSlot !== 'object') {
//         requiredTimeSlot = {
//           start: '00:00',
//           end: '23:59',
//         };
//       }

//       const spacesQueryClauses = [where('host', 'in', filteredHostsRefs)];

//       const spacesQuery = query(spacesRef, ...spacesQueryClauses);

//       const spacesQuerySnapshot = await getDocs(spacesQuery);

//       let availableHosts: Host.Info[] = [];

//       const spaces: (Host.Space & { ref: DocumentReference<DocumentData> })[] =
//         [];

//       spacesQuerySnapshot.forEach(async (document) => {
//         const space = { ...document.data(), id: document.id } as Host.Space;
//         spaces.push({ ...space, ref: document.ref });
//       });

//       for (const space of spaces) {
//         const hostRef = space.host;
//         // verifico se ci sono altre prenotazioni nel periodo scelto
//         const bookingsQuery = query(
//           bookingsRef,
//           where('space', '==', space.ref),
//           where('status', 'in', [
//             Booking.Status.confirmed,
//             Booking.Status.pending,
//           ]),
//           where('endDate', '>=', date!.start),
//           orderBy('endDate', 'desc')
//         );

//         const bookingsQuerySnapshot = await getDocs(bookingsQuery);

//         const bookings: Booking.Info[] = [];

//         bookingsQuerySnapshot.forEach((document) => {
//           const { startDate } = document.data() as Booking.Info;
//           if (startDate <= date!.end) {
//             bookings.push({
//               ...document.data(),
//               id: document.id,
//             } as Booking.Info);
//           }
//         });

//         const availableSpotsPerDay: number[] = [];
//         // per ogni giorno richiesto, verifico 1) se ci sono prenotazioni 2) se sono nella fascia oraria richiesta 3) quanti slot liberi rimangono.
//         getDaysArray(date!.start, date!.end).forEach((day) => {
//           const bookingsForThisDay = bookings.filter((booking) => {
//             const startDateTime = new Date(booking.startDate).getTime();
//             const endDateTime = new Date(booking.endDate).getTime();
//             const dayAsDateTime = new Date(day).getTime();
//             return (
//               startDateTime <= dayAsDateTime && endDateTime >= dayAsDateTime
//             );
//           });

//           const overlappingBookings = bookingsForThisDay.filter((booking) => {
//             const { timeSlot } = booking;
//             const { start: requiredStartTime, end: requiredEndTime } =
//               requiredTimeSlot!;
//             const startDateTime = StringToDateTime(day, timeSlot.start);
//             const endDateTime = StringToDateTime(day, timeSlot.end);
//             const requiredStartDateTime = StringToDateTime(
//               day,
//               requiredStartTime
//             );
//             const requiredEndDateTime = StringToDateTime(day, requiredEndTime);
//             if (
//               requiredStartDateTime > startDateTime &&
//               requiredStartDateTime < endDateTime
//             )
//               return true;
//             if (
//               requiredStartDateTime < startDateTime &&
//               requiredEndDateTime > startDateTime
//             )
//               return true;
//             return false;
//           });

//           // conto il numero di prenotazioni che si sovrappongono e poi lo rimuovo al numero di slot totali
//           availableSpotsPerDay.push(space.spots - overlappingBookings.length);
//         });
//         // aggiungo host a cui appartiene lo space alla lista degli hosts disponibili
//         const anyAvailableSpots = availableSpotsPerDay.every(
//           (freeSpots) => freeSpots > 0
//         );

//         if (anyAvailableSpots) {
//           const hostSnaphsot = await getDoc(hostRef);

//           if (availableHosts.every((host) => host.id !== hostSnaphsot.id)) {
//             availableHosts = _.cloneDeep(availableHosts);
//             availableHosts.push({
//               ...hostSnaphsot.data(),
//               id: hostSnaphsot.id,
//             } as Host.Info);
//           }
//         }
//       }

//       // returns results
//       return availableHosts;
//     } catch (error) {
//       throw error;
//     }
//   }

//   /**
//    * Return HostService instance
//    * @param id
//    * @returns {HostService}
//    */
//   public static async findById(id: string): Promise<HostService | null> {
//     try {
//       const hostsRef = collection(db, 'host');
//       const hostRef = doc(hostsRef, id);
//       const spacesRef = collection(db, 'spaces');
//       const spacesQuery = query(spacesRef, where('host', '==', hostRef));
//       const hostSnapshot = await getDoc(hostRef);
//       if (hostSnapshot.exists()) {
//         const spacesSnapshot = await getDocs(spacesQuery);

//         const host = {
//           ...hostSnapshot.data(),
//           id: hostSnapshot.id,
//         } as Host.Info;
//         host.spaces = [];
//         spacesSnapshot.forEach((space) => {
//           host.spaces.push({ ...space.data(), id: space.id } as Host.Space);
//         });

//         return new HostService(host);
//       }
//       return null;
//     } catch (error) {
//       throw error;
//     }
//   }

//   /**
//    *
//    * @returns a list of tags
//    */
//   public static async getAllTags() {
//     try {
//       const hostsRef = collection(db, 'host');
//       const q = query(hostsRef, where('tags', '!=', []));
//       const querySnapshot = await getDocs(q);
//       let tags: Host.Info['tags'] = [];

//       querySnapshot.forEach((snap) => {
//         const host = snap.data() as Host.Info;
//         tags = [...tags, ...host.tags];
//       });

//       return [...new Set(tags)];
//     } catch (error) {
//       throw error;
//     }
//   }
// }
