import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss'],
})
export class ThemeSwitchComponent {
  isDarkTheme: boolean | Event;

  constructor(private themeService: ThemeService) {
    this.isDarkTheme = this.themeService.isDarkTheme();
  }

  toggleTheme(event: any) {
    const checked = event.target.checked;
    this.themeService.toggleTheme();
    this.isDarkTheme = this.themeService.isDarkTheme();
    console.log('Theme switched:', this.isDarkTheme);
  }
}
