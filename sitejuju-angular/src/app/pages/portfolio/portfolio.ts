import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CircleText } from '../../components/circle-text/circle-text';
import { PortfolioGrid } from '../../components/portfolio-grid/portfolio-grid';

type PortfolioSection = 'fotos' | 'videos' | 'design';

/** Lista de imagens por seção. 6 por seção; repetindo as 3 existentes até você adicionar foto04–06, video04–06, design04–06. */
const PORTFOLIO_IMAGES: Record<string, string[]> = {
  fotos: [
    'images/foto01.svg',
    'images/foto02.svg',
    'images/foto03.svg',
    'images/foto01.svg',
    'images/foto02.svg',
    'images/foto03.svg',
  ],
  videos: [
    'images/video01.svg',
    'images/video2.svg',
    'images/video03.svg',
    'images/video01.svg',
    'images/video2.svg',
    'images/video03.svg',
  ],
  design: [
    'images/design01.svg',
    'images/design02.svg',
    'images/design03.svg',
    'images/design01.svg',
    'images/design02.svg',
    'images/design03.svg',
  ],
};

function sectionFromUrl(url: string): PortfolioSection {
  if (url.includes('portfolio/design') || url.includes('portfolio/design/')) return 'design';
  if (url.includes('portfolio/videos') || url.includes('portfolio/videos/')) return 'videos';
  if (url.includes('portfolio/fotos') || url.includes('portfolio/fotos/')) return 'fotos';
  return 'fotos';
}

@Component({
  selector: 'app-portfolio',
  imports: [CircleText, PortfolioGrid],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  protected tipo = signal<PortfolioSection>('fotos');

  /** Seção para o círculo: sempre derivada da URL na navegação (design ↔ video certo). */
  protected circleSection = signal<PortfolioSection>('fotos');

  protected images = computed(() => {
    const t = this.tipo();
    return PORTFOLIO_IMAGES[t] ?? PORTFOLIO_IMAGES['fotos'];
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      const tipo = params.get('tipo') ?? 'fotos';
      const valid: PortfolioSection = ['fotos', 'videos', 'design'].includes(tipo) ? (tipo as PortfolioSection) : 'fotos';
      this.tipo.set(valid);
    });

    this.circleSection.set(sectionFromUrl(this.router.url));
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.circleSection.set(sectionFromUrl(this.router.url)));
  }
}
