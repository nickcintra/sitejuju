import { Component } from '@angular/core';
import { CircleText } from '../../components/circle-text/circle-text';
import { SobreContent } from '../../components/sobre-content/sobre-content';

@Component({
  selector: 'app-sobre',
  imports: [CircleText, SobreContent],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css',
})
export class Sobre {}
