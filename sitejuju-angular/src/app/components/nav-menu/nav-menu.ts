import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.css',
})
export class NavMenu implements OnInit, OnDestroy {
  protected menuOpen = signal(false);
  private sub?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.menuOpen.set(false));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
