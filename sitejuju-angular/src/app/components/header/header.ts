import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected menuOpen = signal(false);
  protected dropdownOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.dropdownOpen.update(open => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    this.dropdownOpen.set(false);
  }
}
