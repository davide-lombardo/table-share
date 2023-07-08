import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private colorScheme: string | null = null;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initializeTheme() {
    this.getColorScheme();
    this.loadTheme();
  }

  toggleTheme() {
    this.colorScheme = this.colorScheme === 'dark' ? 'light' : 'dark';
    this.saveColorScheme();
    this.loadTheme();
  }

  private loadTheme() {
    const colorScheme =
      this.colorScheme ||
      (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    document.body.setAttribute('color-scheme', colorScheme);

    if (colorScheme === 'dark') {
      this.applyDarkTheme();
    } else {
      this.applyLightTheme();
    }
  }

  private applyDarkTheme() {
    // Dynamically update CSS variables for dark theme
    this.renderer.setStyle(document.body, '--ion-color-primary', '#cc8400');
    this.renderer.setStyle(
      document.body,
      '--ion-color-primary-rgb',
      '204, 132, 0'
    );
    // Add other CSS variables for dark theme here
  }

  private applyLightTheme() {
    // Dynamically update CSS variables for light theme
    this.renderer.setStyle(document.body, '--ion-color-primary', '#FFA500');
    this.renderer.setStyle(
      document.body,
      '--ion-color-primary-rgb',
      '255, 165, 0'
    );
    // Add other CSS variables for light theme here
  }

  private getColorScheme() {
    this.colorScheme =
      localStorage.getItem('colorScheme') ||
      (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
  }

  private saveColorScheme() {
    localStorage.setItem('colorScheme', this.colorScheme || '');
  }

  isDarkTheme(): boolean {
    return this.colorScheme === 'dark';
  }
}
