import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  template: `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Sobre o Blog</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Um espaço dedicado ao desenvolvimento, tecnologia e inovação.
        </p>
      </div>

      <!-- Main Content -->
      <div class="prose prose-lg max-w-none">
        <div class="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Sobre este projeto
          </h2>

          <p class="text-gray-600 mb-6">
            Este blog foi criado utilizando as mais recentes tecnologias web,
            incluindo
            <strong>Angular 20</strong> com zoneless change detection,
            <strong>Server-Side Rendering (SSR)</strong>, e
            <strong>Tailwind CSS v4</strong>. O projeto serve como demonstração
            das melhores práticas de desenvolvimento frontend moderno.
          </p>

          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Tecnologias utilizadas
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="border border-gray-200 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 mb-2">Frontend</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• Angular 20 (Zoneless)</li>
                <li>• TypeScript 5.5+</li>
                <li>• Signals para gerenciamento de estado</li>
                <li>• Standalone Components</li>
              </ul>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 mb-2">Styling & UX</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• Tailwind CSS v4</li>
                <li>• Design responsivo</li>
                <li>• Acessibilidade (WCAG)</li>
                <li>• Animações performáticas</li>
              </ul>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 mb-2">Performance</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• Server-Side Rendering</li>
                <li>• Prerendering estático</li>
                <li>• Lazy loading de componentes</li>
                <li>• Otimizações de bundle</li>
              </ul>
            </div>

            <div class="border border-gray-200 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 mb-2">Desenvolvimento</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• Express.js para SSR</li>
                <li>• Angular CLI 20+</li>
                <li>• Karma + Jasmine para testes</li>
                <li>• Git para versionamento</li>
              </ul>
            </div>
          </div>

          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Arquitetura do projeto
          </h3>

          <p class="text-gray-600 mb-4">
            O blog segue uma arquitetura moderna baseada em:
          </p>

          <ul class="list-disc list-inside text-gray-600 space-y-2 mb-6">
            <li>
              <strong>Componentes standalone</strong> para melhor tree-shaking
            </li>
            <li>
              <strong>Signals</strong> para gerenciamento reativo de estado
            </li>
            <li>
              <strong>Lazy loading</strong> para otimização de performance
            </li>
            <li>
              <strong>SSR híbrido</strong> com prerendering para páginas
              estáticas
            </li>
            <li>
              <strong>Separation of concerns</strong> com serviços
              especializados
            </li>
          </ul>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h4 class="font-semibold text-blue-900 mb-2">
              🚀 Features implementadas
            </h4>
            <ul class="text-blue-800 space-y-1">
              <li>✅ Layout responsivo com header e footer</li>
              <li>✅ Sistema de posts com filtros e busca</li>
              <li>✅ Páginas de listagem e detalhes dos posts</li>
              <li>✅ SEO otimizado com meta tags dinâmicas</li>
              <li>✅ Navegação acessível e menu mobile</li>
              <li>✅ Carregamento lazy de componentes</li>
            </ul>
          </div>
        </div>

        <!-- Author Section -->
        <div class="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-8">
          <div class="flex items-start space-x-6">
            <div
              class="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold"
            >
              {{ authorInitials() }}
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">
                Sobre o autor
              </h3>
              <p class="text-gray-600 mb-4">
                Desenvolvedor Full-Stack apaixonado por tecnologia e inovação.
                Especialista em Angular, TypeScript e arquiteturas modernas de
                frontend. Sempre em busca das melhores práticas e novas
                tecnologias para criar experiências web excepcionais.
              </p>
              <div class="flex space-x-4">
                <a
                  href="https://github.com/PabloFBDev"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  <svg
                    class="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/pablo-ferreira-31a79524b"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  <svg
                    class="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="text-center mt-12">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">
            Explore o conteúdo
          </h3>
          <p class="text-gray-600 mb-6">
            Descubra artigos sobre as mais recentes tecnologias e tendências do
            desenvolvimento web.
          </p>
          <a
            routerLink="/posts"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Ver todos os posts
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
        </div>
      </div>
    </div>
  `,
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  protected readonly authorInitials = signal('PF');
}
