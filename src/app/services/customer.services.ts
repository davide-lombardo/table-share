// import {
//   browserLocalPersistence,
//   getAuth,
//   setPersistence,
//   signOut,
//   UserCredential,
// } from 'firebase/auth';
// import {
//   addDoc,
//   collection,
//   doc,
//   getDocs,
//   query,
//   updateDoc,
//   where,
// } from 'firebase/firestore';
// import { AuthProvider } from '../@types/AuthProvider.d';
// import { Booking } from '../@types/Booking.d';
// import { Customer } from '../@types/Customer.d';
// import { DbCollections } from '../@types/DbCollections.d';
// import {
//   db,
//   logout,
//   signInWithFacebook,
//   signInWithGoogle,
// } from '../configs/firebase';

// export default class CustomerService {
//   /**
//    *
//    * @returns
//    */
//   public static async getAllBookings(uid: string): Promise<Booking.Info[]> {
//     try {
//       const bookingsRef = collection(db, DbCollections.bookings);
//       const q = query(bookingsRef, where('customerId', '==', uid));
//       const bookingSnapshot = await getDocs(q);
//       const bookings: Booking.Info[] = [];
//       bookingSnapshot.forEach((document) => {
//         const booking = { ...document.data(), id: document.id } as Booking.Info;
//         bookings.push(booking);
//       });
//       return bookings;
//     } catch (error) {
//       throw error;
//     }
//   }

//   /**
//    *
//    * @param booking
//    * @returns the booking id
//    */
//   public static async addBooking(booking: Booking.Info): Promise<string> {
//     try {
//       const bookingsRef = collection(db, DbCollections.bookings);
//       const bookingRef = await addDoc(bookingsRef, booking);
//       return bookingRef.id;
//     } catch (error) {
//       throw error;
//     }
//   }

//   /**
//    *
//    * @param bookingId
//    * @returns the booking id
//    */
//   public static async cancelBooking(
//     bookingId: Booking.Info['id']
//   ): Promise<void> {
//     try {
//       const bookingsRef = collection(db, DbCollections.bookings);
//       const bookingRef = doc(bookingsRef, bookingId);
//       await updateDoc(bookingRef, {
//         status: Booking.Status.canceled,
//       });
//     } catch (error) {
//       throw error;
//     }
//   }

//   /**
//    *
//    * @returns
//    */
//   public static async signOut() {
//     return logout();
//   }

//   public static async signIn(provider: AuthProvider): Promise<Customer | null> {
//     let customer: UserCredential;

//     switch (provider) {
//       case AuthProvider.google:
//         customer = await signInWithGoogle();
//         break;
//       case AuthProvider.facebook:
//         customer = await signInWithFacebook();
//         break;
//       default:
//         return await Promise.resolve(null);
//     }

//     const { displayName, email, photoURL, uid } = customer.user;

//     return { displayName, email, photoURL, uid };
//   }

//   public static getInfo(): Customer | null {
//     const auth = getAuth();
//     if (auth.currentUser !== null) {
//       const { displayName, email, photoURL, uid } = auth.currentUser;
//       return { displayName, email, photoURL, uid };
//     } else return null;
//   }
// }
