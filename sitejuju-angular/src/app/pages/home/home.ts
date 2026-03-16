import { Component } from '@angular/core';
import { CircleText } from '../../components/circle-text/circle-text';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-home',
  imports: [CircleText],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(protected theme: ThemeService) {}
}
