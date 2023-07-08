import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabBarComponent } from '../tab-bar/tab-bar.component';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';
import { TabsPage } from './tabs.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TabsPageRoutingModule],
  declarations: [TabsPage, ThemeSwitchComponent, TabBarComponent],
})
export class TabsPageModule {}
