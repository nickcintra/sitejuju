import { Component, computed, input } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

export type BgLogoPage = 'home' | 'portfolio' | 'sobre';

/** Modo claro: logo preta. Modo escuro: logo branca (logo-white.png). */
const LOGO_LIGHT = 'images/logo.png';
const LOGO_DARK = 'images/logowhite.png';

@Component({
  selector: 'app-bg-logo',
  standalone: true,
  templateUrl: './bg-logo.html',
  styleUrl: './bg-logo.css',
})
export class BgLogo {
  page = input<BgLogoPage>('home');

  protected logoUrl = computed(() => (this.theme.isDark() ? LOGO_DARK : LOGO_LIGHT));

  constructor(protected theme: ThemeService) {}
}
