import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  protected menuOpen = signal(false);
  protected dropdownOpen = signal(false);
  private sub?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.closeMenu());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  toggleDropdown(): void {
    this.dropdownOpen.update(open => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    this.dropdownOpen.set(false);
  }
}
