import { DOCUMENT } from '@angular/common';
import { inject, Injectable, effect, signal } from '@angular/core';

const STORAGE_KEY = 'sitejuju-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);

  /** true = modo noturno, false = modo claro */
  readonly isDark = signal(this.loadSaved());

  constructor() {
    this.applyToBody();
    effect(() => {
      this.isDark();
      this.applyToBody();
    });
  }

  toggle(): void {
    this.isDark.update((v) => !v);
    this.save();
    this.applyToBody();
  }

  private applyToBody(): void {
    const body = this.doc?.body;
    if (body) {
      body.classList.toggle('dark-mode', this.isDark());
    }
  }

  private loadSaved(): boolean {
    if (typeof this.doc.defaultView !== 'undefined' && this.doc.defaultView?.localStorage) {
      return this.doc.defaultView.localStorage.getItem(STORAGE_KEY) === 'dark';
    }
    return false;
  }

  private save(): void {
    this.doc.defaultView?.localStorage?.setItem(STORAGE_KEY, this.isDark() ? 'dark' : 'light');
  }
}
