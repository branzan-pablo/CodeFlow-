import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4 sm:py-6">
          <!-- Logo/Brand -->
          <div class="flex items-center">
            <a
              routerLink="/"
              class="text-responsive-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {{ blogTitle() }}
            </a>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex space-x-6 lg:space-x-8">
            <a
              routerLink="/"
              routerLinkActive="text-blue-600"
              [routerLinkActiveOptions]="{ exact: true }"
              class="text-responsive-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Home
            </a>
            <a
              routerLink="/posts"
              routerLinkActive="text-blue-600"
              class="text-responsive-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Posts
            </a>
            <a
              routerLink="/about"
              routerLinkActive="text-blue-600"
              class="text-responsive-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Sobre
            </a>
          </nav>

          <!-- Mobile menu button -->
          <button
            (click)="toggleMobileMenu()"
            class="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            [attr.aria-expanded]="mobileMenuOpen()"
            aria-label="Menu principal"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              @if (!mobileMenuOpen()) {
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
              } @else {
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
              }
            </svg>
          </button>
        </div>

        <!-- Mobile Navigation -->
        @if (mobileMenuOpen()) {
        <nav class="md:hidden pb-4 sm:pb-6 space-y-3 sm:space-y-4">
          <a
            routerLink="/"
            routerLinkActive="text-blue-600"
            [routerLinkActiveOptions]="{ exact: true }"
            class="block text-responsive-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            (click)="closeMobileMenu()"
          >
            Home
          </a>
          <a
            routerLink="/posts"
            routerLinkActive="text-blue-600"
            class="block text-responsive-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            (click)="closeMobileMenu()"
          >
            Posts
          </a>
          <a
            routerLink="/about"
            routerLinkActive="text-blue-600"
            class="block text-responsive-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            (click)="closeMobileMenu()"
          >
            Sobre
          </a>
        </nav>
        }
      </div>
    </header>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly blogTitle = signal('CodeFlow Angular');
  protected readonly mobileMenuOpen = signal(false);

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((current) => !current);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
