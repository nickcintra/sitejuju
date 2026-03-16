import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { BgLogo, type BgLogoPage } from './components/bg-logo/bg-logo';
import { ThemeService } from './services/theme.service';
import { AdminUnlockService } from './services/admin-unlock.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Header, BgLogo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(
    protected router: Router,
    _theme: ThemeService,
    protected adminUnlock: AdminUnlockService
  ) {}

  /** Ctrl+Shift+A alterna a palavrinha "Admin" no rodapé (mostra / esconde). Não age quando já está no admin. */
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.router.url.startsWith('/admin')) return;
    if (event.ctrlKey && event.shiftKey && (event.key === 'A' || event.key === 'a')) {
      event.preventDefault();
      this.adminUnlock.toggle();
    }
  }

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

  /** Admin = tela separada, sem header/bg-logo/rodapé do site. */
  get isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
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
