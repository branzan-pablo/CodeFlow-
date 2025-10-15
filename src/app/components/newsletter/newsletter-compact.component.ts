import { Component, signal, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'app-newsletter-compact',
  imports: [FormsModule, CommonModule],
  template: `
    <div
      class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white"
    >
      <div class="max-w-2xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-6">
          <h3 class="text-xl font-bold mb-2">Gostou do artigo?</h3>
          <p class="text-blue-100">
            Assine nossa newsletter e receba mais conteúdo como este toda
            semana!
          </p>
        </div>

        <!-- Form -->
        <form
          (ngSubmit)="onSubmit()"
          #newsletterForm="ngForm"
          class="space-y-4"
        >
          <div class="flex flex-col sm:flex-row gap-3">
            <!-- Email Input -->
            <div class="flex-1">
              <input
                type="email"
                name="email"
                [(ngModel)]="email"
                #emailInput="ngModel"
                required
                email
                placeholder="Digite seu e-mail"
                [class]="getInputClasses(emailInput)"
                [disabled]="isSubmitting()"
              />
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="newsletterForm.invalid || isSubmitting()"
              [class]="getButtonClasses()"
            >
              @if (isSubmitting()) {
              <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
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
              } @else { Inscrever }
            </button>
          </div>

          <!-- Error Messages -->
          @if (emailInput.invalid && (emailInput.dirty || emailInput.touched)) {
          <div class="text-red-200 text-sm">
            @if (emailInput.errors?.['required']) {
            <p>E-mail é obrigatório</p>
            } @if (emailInput.errors?.['email']) {
            <p>Por favor, insira um e-mail válido</p>
            }
          </div>
          }

          <!-- Success/Error Messages -->
          @if (submitMessage()) {
          <div [class]="getMessageClasses()">
            {{ submitMessage() }}
          </div>
          }

          <!-- Privacy Notice -->
          <div class="flex items-start space-x-2 text-xs text-blue-100">
            <input
              type="checkbox"
              id="compact-consent"
              name="consent"
              [(ngModel)]="consent"
              required
              class="mt-0.5 h-3 w-3 text-white border-blue-300 rounded focus:ring-white focus:ring-1"
            />
            <label for="compact-consent">
              Eu autorizo o CodeFlow Angular a processar meu endereço de e-mail
              para fins de envio da newsletter.
              <span class="underline cursor-pointer"
                >Política de Privacidade</span
              >
            </label>
          </div>
        </form>

        <!-- Benefits -->
        <div class="mt-4 text-center">
          <div
            class="flex justify-center items-center space-x-4 text-sm text-blue-100"
          >
            <span>📚 Conteúdo exclusivo</span>
            <span>•</span>
            <span>🚫 Sem spam</span>
            <span>•</span>
            <span>📬 Semanal</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .newsletter-input {
        transition: all 0.2s ease-in-out;
      }

      .newsletter-button {
        transition: all 0.2s ease-in-out;
      }

      .newsletter-button:hover:not(:disabled) {
        transform: translateY(-1px);
      }
    `,
  ],
})
export class NewsletterCompactComponent {
  private readonly newsletterService = inject(NewsletterService);

  // Input para identificar origem da inscrição
  source = input<string>('post-detail');

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

  getInputClasses(input: any): string {
    const baseClasses =
      'newsletter-input w-full px-4 py-2 bg-white text-gray-900 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-500';

    if (input.invalid && (input.dirty || input.touched)) {
      return `${baseClasses} ring-2 ring-red-300`;
    }

    return baseClasses;
  }

  getButtonClasses(): string {
    const baseClasses =
      'newsletter-button px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]';

    return baseClasses;
  }

  getMessageClasses(): string {
    const baseClasses = 'p-3 rounded-lg text-sm font-medium';

    if (this.isSuccess()) {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
  }
}
