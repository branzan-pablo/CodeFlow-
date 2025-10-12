import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Bem-vindo ao {{ blogTitle() }}
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Um blog moderno sobre desenvolvimento, tecnologia e inovação. Criado
          com Angular 20, SSR e as mais recentes tecnologias web.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/posts"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Ver Posts
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
              ></path>
            </svg>
          </a>
          <a
            href="/about"
            class="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Sobre o Blog
          </a>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Últimos Posts</h2>
          <p class="text-gray-600">Confira os artigos mais recentes</p>
        </div>

        <!-- Grid de posts em destaque -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (post of featuredPosts(); track post.id) {
          <article
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div
              class="h-48 bg-gradient-to-br from-blue-100 to-purple-100"
            ></div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                {{ post.title }}
              </h3>
              <p class="text-gray-600 mb-4 line-clamp-3">{{ post.excerpt }}</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">{{ post.date }}</span>
                <a
                  [href]="'/posts/' + post.slug"
                  class="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                >
                  Ler mais
                </a>
              </div>
            </div>
          </article>
          } @empty {
          <div class="col-span-full text-center py-12">
            <p class="text-gray-500">Nenhum post encontrado.</p>
          </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly blogTitle = signal('Meu Blog');

  protected readonly featuredPosts = signal([
    {
      id: 1,
      title: 'Começando com Angular 20',
      excerpt:
        'Descubra as novidades do Angular 20 e como aproveitar ao máximo os novos recursos como signals e zoneless change detection.',
      date: '12 de Outubro, 2025',
      slug: 'comecando-com-angular-20',
    },
    {
      id: 2,
      title: 'SSR com Angular Universal',
      excerpt:
        'Aprenda a implementar Server-Side Rendering para melhorar a performance e SEO do seu aplicativo Angular.',
      date: '10 de Outubro, 2025',
      slug: 'ssr-com-angular-universal',
    },
    {
      id: 3,
      title: 'Tailwind CSS v4: O que há de novo',
      excerpt:
        'Explore as novidades do Tailwind CSS v4 e como usar a nova sintaxe @use para importações.',
      date: '8 de Outubro, 2025',
      slug: 'tailwind-css-v4-novidades',
    },
  ]);
}
