import { Injectable, signal } from '@angular/core';

/**
 * Controla a visibilidade da palavrinha "Admin" no rodapé.
 * Ctrl+Shift+A ou 7 toques no círculo: alterna (mostra / esconde) o link.
 */
@Injectable({ providedIn: 'root' })
export class AdminUnlockService {
  readonly showAdminLink = signal(false);

  /** Alterna: se está visível, esconde; se está escondido, mostra. */
  toggle(): void {
    this.showAdminLink.update(v => !v);
  }
}
