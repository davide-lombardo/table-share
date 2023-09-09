import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateTableRequestDto } from 'src/app/models/interfaces/requests/CreateTableRequestDto';
import { TableService } from 'src/app/services/table.service';

declare var google: any; // Declare Google as any

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.page.html',
  styleUrls: ['./add-table.page.scss'],
})
export class AddTablePage {
  tableForm: FormGroup;
  autocomplete: any;
  geolocation: any;

  constructor(
    private formBuilder: FormBuilder,
    private tableService: TableService,
    private router: Router,
    private zone: NgZone
  ) {
    this.tableForm = this.formBuilder.group({
      place: ['', Validators.required],
      name: ['', Validators.required],
      time: [null, Validators.required],
      minMaxSeats: ['', [Validators.required, Validators.required]],
      maxAge: ['', [Validators.required, Validators.max(65)]],
      minAge: ['', [Validators.required, Validators.min(18)]],
    });
  }

  ionViewDidEnter(): void {
    this.initAutocomplete();
    this.getCurrentLocation();
  }

  private initAutocomplete(): void {
    const input = document.getElementById(
      'autocomplete-input'
    ) as HTMLInputElement;
    const options = {
      types: ['bar', 'pub'],
      componentRestrictions: { country: 'IT' },
    };

    this.autocomplete = new google.maps.places.Autocomplete(input, options);

    this.autocomplete.addListener('place_changed', () => {
      this.zone.run(() => {
        const place = this.autocomplete.getPlace();
        if (place && place.geometry) {
          this.tableForm.get('place')?.setValue(place.name);
          const latitude = place.geometry.location.lat();
          const longitude = place.geometry.location.lng();
        }
      });
    });
  }

  private getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.zone.run(() => {
            this.geolocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
          });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  public onSubmit(): void {
    if (this.tableForm.invalid) {
      return;
    }

    const request: CreateTableRequestDto = this.tableForm.value;

    this.tableService.createTable(request).then(() => {
      this.router.navigate(['/tabs/tables-tab']);
    });
  }

  goTo() {
    // return (window.location.href =
    //   'https://www.google.com/maps/search/?api=1&query=Google&query_place_id=' +
    //   this.placeid);
  }
}
