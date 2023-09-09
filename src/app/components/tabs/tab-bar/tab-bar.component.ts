import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
})
export class TabBarComponent implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit(): void {}

  public goToAddTablePage(): void {
    this.navCtrl.navigateForward(['/tabs/add-table']);
  }
}
