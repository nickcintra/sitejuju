import { Component, input } from '@angular/core';

export type BgLogoPage = 'home' | 'portfolio' | 'sobre';

@Component({
  selector: 'app-bg-logo',
  standalone: true,
  templateUrl: './bg-logo.html',
  styleUrl: './bg-logo.css',
})
export class BgLogo {
  /** Define posição/tamanho conforme a página (home, portfolio, sobre) e viewport (web/mobile). */
  page = input<BgLogoPage>('home');
}
