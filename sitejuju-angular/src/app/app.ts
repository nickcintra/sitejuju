import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { BgLogo, type BgLogoPage } from './components/bg-logo/bg-logo';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, BgLogo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(
    protected router: Router,
    /** Injetado para inicializar o tema (classe no body) no carregamento. */
    _theme: ThemeService
  ) {}

  get isHomePage(): boolean {
    const url = this.router.url;
    return url === '/' || url === '';
  }

  get isPortfolioPage(): boolean {
    return this.router.url.startsWith('/portfolio');
  }

  get isSobrePage(): boolean {
    return this.router.url.startsWith('/sobre');
  }

  /** Página atual para o logo decorativo (home | portfolio | sobre). */
  get bgLogoPage(): BgLogoPage {
    const url = this.router.url;
    if (url === '/' || url === '') return 'home';
    if (url.startsWith('/portfolio')) return 'portfolio';
    if (url.startsWith('/sobre')) return 'sobre';
    return 'home';
  }
}
