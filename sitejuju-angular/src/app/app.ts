import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { BgLogo, type BgLogoPage } from './components/bg-logo/bg-logo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, BgLogo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(protected router: Router) {}

  get isHomePage(): boolean {
    const url = this.router.url;
    return url === '/' || url === '';
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
