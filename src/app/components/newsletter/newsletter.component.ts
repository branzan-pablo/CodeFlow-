import { Component, signal, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'app-newsletter',
  imports: [FormsModule, CommonModule],
  template: `
    <div class="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <!-- Header -->
        <div class="mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Assine nossa Newsletter
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Mantenha-se atualizado com as tendências mais recentes e faça parte
            de uma comunidade próspera de desenvolvedores.
          </p>
        </div>

        <!-- Newsletter Image/Icon -->
        <div class="mb-8">
          <div
            class="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6"
          >
            <svg
              class="w-12 h-12 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <!-- Newsletter Form -->
        <div class="max-w-md mx-auto">
          <form
            (ngSubmit)="onSubmit()"
            #newsletterForm="ngForm"
            class="space-y-4"
          >
            <!-- Email Input -->
            <div class="relative">
              <input
                type="email"
                id="email"
                name="email"
                [(ngModel)]="email"
                #emailInput="ngModel"
                required
                email
                placeholder="Digite seu e-mail"
                [class]="getInputClasses(emailInput)"
                [disabled]="isSubmitting()"
              />
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>

            <!-- Error Messages -->
            @if (emailInput.invalid && (emailInput.dirty || emailInput.touched))
            {
            <div class="text-red-600 text-sm text-left">
              @if (emailInput.errors?.['required']) {
              <p>E-mail é obrigatório</p>
              } @if (emailInput.errors?.['email']) {
              <p>Por favor, insira um e-mail válido</p>
              }
            </div>
            }

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="newsletterForm.invalid || isSubmitting()"
              [class]="getButtonClasses()"
            >
              @if (isSubmitting()) {
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Inscrevendo... } @else { Inscrever-se }
            </button>

            <!-- Success/Error Messages -->
            @if (submitMessage()) {
            <div [class]="getMessageClasses()">
              {{ submitMessage() }}
            </div>
            }

            <!-- Privacy Notice -->
            <div class="flex items-start space-x-3 text-left">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                [(ngModel)]="consent"
                required
                class="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label for="consent" class="text-sm text-gray-600">
                Eu autorizo o CodeFlow Angular a processar meu endereço de
                e-mail para fins de envio da newsletter.
                <a
                  href="/privacy"
                  class="text-blue-600 hover:text-blue-800 underline"
                >
                  Política de Privacidade
                </a>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .newsletter-input {
        transition: all 0.2s ease-in-out;
      }

      .newsletter-input:focus {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
      }

      .newsletter-button {
        transition: all 0.2s ease-in-out;
      }

      .newsletter-button:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }

      .newsletter-button:active {
        transform: translateY(0);
      }
    `,
  ],
})
export class NewsletterComponent {
  private readonly newsletterService = inject(NewsletterService);

  // Input para identificar origem da inscrição
  source = input<string>('homepage');

  email = signal('');
  consent = signal(false);
  isSubmitting = signal(false);
  submitMessage = signal('');
  isSuccess = signal(false);

  async onSubmit(): Promise<void> {
    if (!this.consent()) {
      this.submitMessage.set('Por favor, aceite os termos de privacidade');
      this.isSuccess.set(false);
      return;
    }

    this.isSubmitting.set(true);
    this.submitMessage.set('');

    try {
      const result = await this.newsletterService.subscribe(
        this.email(),
        this.source()
      );

      this.submitMessage.set(result.message);
      this.isSuccess.set(result.success);

      if (result.success) {
        this.email.set('');
        this.consent.set(false);
      }
    } catch (error) {
      console.error('Erro ao inscrever:', error);
      this.submitMessage.set('❌ Erro inesperado. Tente novamente.');
      this.isSuccess.set(false);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private async simulateSubscription(): Promise<void> {
    // Método removido - agora usa o serviço real
  }

  getInputClasses(input: any): string {
    const baseClasses =
      'newsletter-input w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed';

    if (input.invalid && (input.dirty || input.touched)) {
      return `${baseClasses} border-red-300 text-red-900 placeholder-red-300`;
    }

    return `${baseClasses} border-gray-300 placeholder-gray-500`;
  }

  getButtonClasses(): string {
    const baseClasses =
      'newsletter-button w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';

    return `${baseClasses} text-white bg-blue-600 hover:bg-blue-700`;
  }

  getMessageClasses(): string {
    const baseClasses = 'mt-4 p-3 rounded-lg text-sm font-medium';

    if (this.isSuccess()) {
      return `${baseClasses} bg-green-50 text-green-800 border border-green-200`;
    } else {
      return `${baseClasses} bg-red-50 text-red-800 border border-red-200`;
    }
  }
}
