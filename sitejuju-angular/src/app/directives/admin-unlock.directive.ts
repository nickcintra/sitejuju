import { Directive, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminUnlockService } from '../services/admin-unlock.service';

/**
 * Conta cliques/toques no elemento. No 7º toque (em até 2s), alterna a palavrinha "Admin" no rodapé (mostra / esconde).
 * Igual ao Ctrl+Shift+A no desktop.
 */
@Directive({
  selector: '[appAdminUnlock]',
  standalone: true,
})
export class AdminUnlockDirective {
  private readonly router = inject(Router);
  private readonly adminUnlock = inject(AdminUnlockService);
  private count = 0;
  private resetTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly delayMs = 2000;

  @HostListener('click')
  onClick(): void {
    if (this.router.url.startsWith('/admin')) return;
    if (this.resetTimer) clearTimeout(this.resetTimer);
    this.count++;
    if (this.count >= 7) {
      this.adminUnlock.toggle();
      this.count = 0;
      return;
    }
    this.resetTimer = setTimeout(() => {
      this.count = 0;
      this.resetTimer = null;
    }, this.delayMs);
  }
}
