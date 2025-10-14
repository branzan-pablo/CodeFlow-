import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'app-newsletter-page',
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6"
        >
          <svg
            class="w-8 h-8 text-blue-600"
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

        <h1 class="text-4xl font-bold text-gray-900 mb-4">Newsletter</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Mantenha-se atualizado com os melhores conteúdos sobre desenvolvimento
          web
        </p>
      </div>

      <!-- Action based on route -->
      @if (action() === 'unsubscribe') {
      <!-- Unsubscribe Section -->
      <div class="bg-yellow-50 rounded-lg p-8 mb-8">
        <h2 class="text-2xl font-semibold text-yellow-900 mb-4">
          Cancelar Inscrição
        </h2>
        <p class="text-yellow-800 mb-6">
          Sentimos muito que você queira cancelar sua inscrição. Confirme seu
          e-mail abaixo para proceder:
        </p>

        <form
          (ngSubmit)="handleUnsubscribe()"
          #unsubForm="ngForm"
          class="space-y-4"
        >
          <div>
            <input
              type="email"
              name="unsubEmail"
              [(ngModel)]="unsubscribeEmail"
              required
              email
              placeholder="Digite seu e-mail"
              class="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              [disabled]="unsubForm.invalid || isProcessing()"
              class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              @if (isProcessing()) { Processando... } @else { Cancelar Inscrição
              }
            </button>

            <a
              routerLink="/newsletter"
              class="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Voltar
            </a>
          </div>
        </form>
      </div>
      } @else if (action() === 'success') {
      <!-- Success Section -->
      <div class="bg-green-50 rounded-lg p-8 mb-8 text-center">
        <div
          class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-green-900 mb-4">
          🎉 Bem-vindo à nossa comunidade!
        </h2>
        <p class="text-green-800 mb-6">
          Sua inscrição foi confirmada com sucesso. Você receberá nossos
          melhores conteúdos toda semana.
        </p>
        <a
          routerLink="/posts"
          class="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Explorar Artigos
          <svg
            class="ml-2 w-5 h-5"
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
        </a>
      </div>
      } @else {
      <!-- Default Newsletter Info -->
      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <!-- About Newsletter -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">
            📧 Sobre a Newsletter
          </h2>
          <ul class="space-y-3 text-gray-600">
            <li class="flex items-start">
              <svg
                class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span
                ><strong>Conteúdo exclusivo</strong> - Artigos em primeira
                mão</span
              >
            </li>
            <li class="flex items-start">
              <svg
                class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span
                ><strong>Frequência semanal</strong> - Sem spam na sua
                caixa</span
              >
            </li>
            <li class="flex items-start">
              <svg
                class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span
                ><strong>Dicas exclusivas</strong> - Truques e melhores
                práticas</span
              >
            </li>
            <li class="flex items-start">
              <svg
                class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span
                ><strong>Cancelamento fácil</strong> - Saia quando quiser</span
              >
            </li>
          </ul>
        </div>

        <!-- Stats -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">
            📊 Nossa Comunidade
          </h2>
          <div class="space-y-4">
            <div
              class="flex items-center justify-between p-4 bg-blue-50 rounded-lg"
            >
              <div>
                <div class="text-2xl font-bold text-blue-600">
                  {{ subscriberCount() }}+
                </div>
                <div class="text-sm text-blue-800">
                  Desenvolvedores inscritos
                </div>
              </div>
              <svg
                class="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>

            <div
              class="flex items-center justify-between p-4 bg-green-50 rounded-lg"
            >
              <div>
                <div class="text-2xl font-bold text-green-600">25+</div>
                <div class="text-sm text-green-800">Artigos publicados</div>
              </div>
              <svg
                class="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <div
              class="flex items-center justify-between p-4 bg-purple-50 rounded-lg"
            >
              <div>
                <div class="text-2xl font-bold text-purple-600">4.9★</div>
                <div class="text-sm text-purple-800">Avaliação média</div>
              </div>
              <svg
                class="w-8 h-8 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      }

      <!-- Status Message -->
      @if (statusMessage()) {
      <div [class]="getStatusClasses()">
        {{ statusMessage() }}
      </div>
      }

      <!-- Recent Articles Teaser -->
      <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
        <h3 class="text-2xl font-semibold text-gray-900 mb-4 text-center">
          📚 Últimos Artigos
        </h3>
        <p class="text-gray-600 text-center mb-6">
          Veja o tipo de conteúdo que você receberá na sua newsletter
        </p>
        <div class="text-center">
          <a
            routerLink="/posts"
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver Todos os Posts
            <svg
              class="ml-2 w-5 h-5"
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
          </a>
        </div>
      </div>
    </div>
  `,
})
export class NewsletterPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly newsletterService = inject(NewsletterService);

  action = signal<string>('');
  unsubscribeEmail = signal('');
  isProcessing = signal(false);
  statusMessage = signal('');
  isSuccess = signal(false);

  subscriberCount = signal(this.newsletterService.getSubscriberCount() + 150);

  ngOnInit(): void {
    // Lê parâmetros da URL
    this.route.queryParams.subscribe((params) => {
      if (params['action'] === 'unsubscribe') {
        this.action.set('unsubscribe');
        if (params['email']) {
          this.unsubscribeEmail.set(decodeURIComponent(params['email']));
        }
      } else if (params['action'] === 'success') {
        this.action.set('success');
      } else {
        this.action.set('');
      }
    });
  }

  async handleUnsubscribe(): Promise<void> {
    this.isProcessing.set(true);
    this.statusMessage.set('');

    try {
      const result = await this.newsletterService.unsubscribe(
        this.unsubscribeEmail()
      );

      this.statusMessage.set(result.message);
      this.isSuccess.set(result.success);

      if (result.success) {
        this.unsubscribeEmail.set('');
        // Atualiza contador
        this.subscriberCount.set(
          this.newsletterService.getSubscriberCount() + 150
        );
      }
    } catch (error) {
      console.error('Erro ao cancelar inscrição:', error);
      this.statusMessage.set('❌ Erro inesperado. Tente novamente.');
      this.isSuccess.set(false);
    } finally {
      this.isProcessing.set(false);
    }
  }

  getStatusClasses(): string {
    const baseClasses = 'mb-6 p-4 rounded-lg text-center font-medium';

    if (this.isSuccess()) {
      return `${baseClasses} bg-green-50 text-green-800 border border-green-200`;
    } else {
      return `${baseClasses} bg-red-50 text-red-800 border border-red-200`;
    }
  }
}
