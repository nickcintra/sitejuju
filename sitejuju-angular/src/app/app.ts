import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(protected router: Router) {}

  get isHomePage(): boolean {
    const url = this.router.url;
    return url === '/' || url === '';
  }
}
