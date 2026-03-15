import { Component, input } from '@angular/core';

@Component({
  selector: 'app-portfolio-grid',
  imports: [],
  templateUrl: './portfolio-grid.html',
  styleUrl: './portfolio-grid.css',
})
export class PortfolioGrid {
  /** Array de caminhos das imagens (ex: ['images/design01.svg', ...]) */
  images = input.required<string[]>();
}
