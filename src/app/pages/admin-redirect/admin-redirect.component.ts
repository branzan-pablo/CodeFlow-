import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-admin-redirect',
  standalone: true,
  template: '<p>Redirecionando para o CMS...</p>',
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 50vh;
      font-size: 1.2rem;
      color: #666;
    }
  `],
})
export class AdminRedirectComponent {
  private document = inject(DOCUMENT);

  constructor() {
    // Redirect to admin using native browser location
    this.document.location.href = '/admin/index.html';
  }
}
