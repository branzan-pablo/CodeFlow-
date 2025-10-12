import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50">
      <app-header />

      <main class="flex-1">
        <router-outlet />
      </main>

      <app-footer />
    </div>
  `,
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
