import { Injectable } from '@angular/core';
import {
  Geolocation,
  GeolocationOptions,
  Geoposition,
} from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor(private geolocation: Geolocation) {}

  getCurrentPosition(options?: GeolocationOptions): Observable<Geoposition> {
    return new Observable<Geoposition>((observer) => {
      this.geolocation
        .getCurrentPosition(options)
        .then((position: Geoposition) => {
          observer.next(position);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }
}
