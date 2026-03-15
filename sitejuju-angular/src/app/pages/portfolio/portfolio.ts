import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CircleText } from '../../components/circle-text/circle-text';
import { PortfolioGrid } from '../../components/portfolio-grid/portfolio-grid';

const PORTFOLIO_IMAGES: Record<string, string[]> = {
  fotos: ['images/foto01.svg', 'images/foto02.svg', 'images/foto03.svg'],
  videos: ['images/video01.svg', 'images/video2.svg', 'images/video03.svg'],
  design: ['images/design01.svg', 'images/design02.svg', 'images/design03.svg'],
};

@Component({
  selector: 'app-portfolio',
  imports: [CircleText, PortfolioGrid],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  private tipo = signal<string>('fotos');

  protected images = computed(() => {
    const t = this.tipo();
    return PORTFOLIO_IMAGES[t] ?? PORTFOLIO_IMAGES['fotos'];
  });

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      const tipo = params.get('tipo') ?? 'fotos';
      const valid = ['fotos', 'videos', 'design'].includes(tipo) ? tipo : 'fotos';
      this.tipo.set(valid);
    });
  }
}
