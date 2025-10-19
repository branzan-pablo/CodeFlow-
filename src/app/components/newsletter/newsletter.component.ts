import { Component, signal, inject, input, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'app-newsletter',
  imports: [FormsModule, CommonModule],
  template: `
    <div [class]="getContainerClasses()">
      <!-- Header -->
      <div [class]="getHeaderClasses()">
        <h2 [class]="getTitleClasses()">
          {{
            variant() === 'full'
              ? 'Assine nossa Newsletter'
              : 'Gostou do conteúdo?'
          }}
        </h2>
        <p [class]="getDescriptionClasses()">
          {{
            variant() === 'full'
              ? 'Receba artigos exclusivos, dicas práticas e as últimas tendências do Angular diretamente no seu e-mail.'
              : 'Receba artigos exclusivos e dicas práticas sobre Angular diretamente no seu e-mail!'
          }}
        </p>
      </div>

      <!-- Newsletter Form -->
      <div [class]="getFormWrapperClasses()">
        <form
          (ngSubmit)="onSubmit()"
          #newsletterForm="ngForm"
          class="space-y-4"
        >
          <!-- Email Input with Button -->
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
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
              <input
                type="email"
                id="email-newsletter"
                name="email"
                [(ngModel)]="email"
                #emailInput="ngModel"
                required
                email
                placeholder="seu@email.com"
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
              <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
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
              } @else {
              <span class="hidden sm:inline">Inscrever-se</span>
              <span class="sm:hidden">Inscrever</span>
              <svg
                class="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              }
            </button>
          </div>

          <!-- Error Messages -->
          @if (emailInput.invalid && (emailInput.dirty || emailInput.touched)) {
          <div
            class="flex items-center text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3"
          >
            <svg
              class="w-4 h-4 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            @if (emailInput.errors?.['required']) {
            <span>E-mail é obrigatório</span>
            } @else if (emailInput.errors?.['email']) {
            <span>Por favor, insira um e-mail válido</span>
            }
          </div>
          }

          <!-- Success/Error Messages -->
          @if (submitMessage()) {
          <div [class]="getMessageClasses()">
            <div class="flex items-start">
              @if (isSuccess()) {
              <svg
                class="w-5 h-5 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              } @else {
              <svg
                class="w-5 h-5 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
              }
              <span>{{ submitMessage() }}</span>
            </div>
          </div>
          }

          <!-- Privacy Notice -->
          <div class="flex items-start space-x-3 text-sm text-gray-600">
            <input
              type="checkbox"
              id="consent-newsletter"
              name="consent"
              [(ngModel)]="consent"
              required
              class="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
            />
            <label
              for="consent-newsletter"
              class="cursor-pointer leading-relaxed"
              >Eu autorizo o CodeFlow Angular a processar meu endereço de e-mail
              para fins de envio da newsletter.
              <a
                href="/privacy"
                class="text-blue-600 hover:text-blue-700 underline font-medium transition-colors"
              >
                Política de Privacidade
              </a>
            </label>
          </div>
        </form>

        <!-- Benefits -->
        @if (variant() === 'full') {
        <div class="mt-8 flex justify-center gap-8 text-sm text-gray-600">
          <div class="flex items-center">
            <div
              class="w-5 h-5 mr-2 bg-green-100 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-3 h-3 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span class="font-medium">Conteúdo exclusivo</span>
          </div>
          <div class="flex items-center">
            <div
              class="w-5 h-5 mr-2 bg-blue-100 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-3 h-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span class="font-medium">Sem spam</span>
          </div>
          <div class="flex items-center">
            <div
              class="w-5 h-5 mr-2 bg-purple-100 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-3 h-3 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span class="font-medium">Toda semana</span>
          </div>
        </div>
        }
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

  // ViewChild para acessar o formulário
  @ViewChild('newsletterForm') newsletterForm?: NgForm;

  // Inputs
  source = input<string>('homepage');
  variant = input<'full' | 'compact'>('full');

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
        // Resetar os valores dos signals
        this.email.set('');
        this.consent.set(false);

        // Resetar o estado de validação do formulário
        setTimeout(() => {
          if (this.newsletterForm) {
            this.newsletterForm.resetForm();
          }
        }, 0);
      }
    } catch (error) {
      console.error('Erro ao inscrever:', error);
      this.submitMessage.set('❌ Erro inesperado. Tente novamente.');
      this.isSuccess.set(false);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  getContainerClasses(): string {
    if (this.variant() === 'full') {
      return 'container-article text-center py-16';
    }
    return 'container-narrow py-8 bg-white border-2 border-gray-200 rounded-2xl shadow-sm';
  }

  getHeaderClasses(): string {
    if (this.variant() === 'full') {
      return 'mb-8 space-y-3';
    }
    return 'mb-6 space-y-2 text-center';
  }

  getTitleClasses(): string {
    if (this.variant() === 'full') {
      return 'text-3xl sm:text-4xl font-bold text-gray-900 leading-tight';
    }
    return 'text-2xl sm:text-3xl font-bold text-gray-900 leading-tight';
  }

  getDescriptionClasses(): string {
    if (this.variant() === 'full') {
      return 'text-lg text-gray-600 max-w-2xl mx-auto';
    }
    return 'text-base text-gray-600';
  }

  getFormWrapperClasses(): string {
    if (this.variant() === 'full') {
      return 'container-narrow space-y-6';
    }
    return 'space-y-6';
  }

  // Style classes - variant-independent (same styling for all variants)
  getInputClasses(input: any): string {
    const baseClasses =
      'newsletter-input w-full pl-12 pr-4 py-3.5 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-base';

    if (input.invalid && (input.dirty || input.touched)) {
      return `${baseClasses} border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50`;
    }

    return `${baseClasses} border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-white focus:bg-white`;
  }

  getButtonClasses(): string {
    const baseClasses =
      'newsletter-button sm:w-auto w-full flex items-center justify-center px-8 py-3.5 border-2 border-transparent text-base font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap';

    return `${baseClasses} text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:from-blue-800 active:to-purple-800 shadow-md hover:shadow-lg`;
  }

  getMessageClasses(): string {
    const baseClasses = 'p-4 rounded-xl text-sm font-medium border-2';

    if (this.isSuccess()) {
      return `${baseClasses} bg-green-50 text-green-800 border-green-200`;
    } else {
      return `${baseClasses} bg-red-50 text-red-800 border-red-200`;
    }
  }
}
