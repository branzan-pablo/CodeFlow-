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
          Compartilhando conhecimento prático sobre Angular e desenvolvimento
          front-end moderno.
        </p>
      </div>

      <!-- Main Content -->
      <div class="prose prose-lg max-w-none">
        <div class="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Sobre este projeto
          </h2>

          <p class="text-gray-600 mb-6 leading-relaxed">
            O <strong>CodeFlow Angular</strong> é um blog moderno desenvolvido com as mais 
            recentes tecnologias web, demonstrando as melhores práticas de desenvolvimento 
            frontend. Construído com <strong>Angular 20</strong> e <strong>Tailwind CSS v4</strong>, 
            o projeto implementa arquitetura avançada com SSR, otimizações de performance e 
            funcionalidades completas de um sistema de blog profissional.
          </p>

          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            🎯 Stack Tecnológico
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-2xl">⚡</span>
                <h4 class="font-semibold text-gray-900">Core Framework</h4>
              </div>
              <ul class="text-gray-600 space-y-2 text-sm">
                <li>• <strong>Angular 20</strong> com Zoneless Change Detection</li>
                <li>• <strong>TypeScript 5.8+</strong> para type safety</li>
                <li>• <strong>Signals</strong> para gerenciamento de estado reativo</li>
                <li>• <strong>Standalone Components</strong> (sem NgModules)</li>
              </ul>
            </div>

            <div class="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-2xl">🎨</span>
                <h4 class="font-semibold text-gray-900">Styling & UI</h4>
              </div>
              <ul class="text-gray-600 space-y-2 text-sm">
                <li>• <strong>Tailwind CSS v4</strong> com nova sintaxe @use</li>
                <li>• Design System responsivo e acessível</li>
                <li>• Typography plugin para conteúdo markdown</li>
                <li>• Animações e transições performáticas</li>
              </ul>
            </div>

            <div class="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-2xl">🚀</span>
                <h4 class="font-semibold text-gray-900">Performance & SEO</h4>
              </div>
              <ul class="text-gray-600 space-y-2 text-sm">
                <li>• <strong>Server-Side Rendering (SSR)</strong> com Express.js</li>
                <li>• <strong>Prerendering</strong> de rotas estáticas</li>
                <li>• <strong>HTTP Transfer Cache</strong> para evitar duplicação</li>
                <li>• Meta tags dinâmicas e Structured Data (JSON-LD)</li>
              </ul>
            </div>

            <div class="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-2xl">📝</span>
                <h4 class="font-semibold text-gray-900">Content Management</h4>
              </div>
              <ul class="text-gray-600 space-y-2 text-sm">
                <li>• <strong>Markdown</strong> com syntax highlighting (Prism.js)</li>
                <li>• Editor WYSIWYG com preview em tempo real</li>
                <li>• Sistema de categorias e tags</li>
                <li>• Upload e gerenciamento de imagens</li>
              </ul>
            </div>
          </div>

          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            🏗️ Arquitetura do Projeto
          </h3>

          <div class="bg-gray-50 rounded-lg p-6 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-gray-900 mb-3">📁 Estrutura de Pastas</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• <code class="text-xs bg-gray-200 px-1 rounded">components/</code> - Componentes reutilizáveis</li>
                  <li>• <code class="text-xs bg-gray-200 px-1 rounded">pages/</code> - Páginas do aplicativo</li>
                  <li>• <code class="text-xs bg-gray-200 px-1 rounded">services/</code> - Serviços especializados</li>
                  <li>• <code class="text-xs bg-gray-200 px-1 rounded">models/</code> - Interfaces TypeScript</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-3">🔧 Serviços Principais</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• <strong>PostService</strong> - Gerenciamento de artigos</li>
                  <li>• <strong>SeoService</strong> - Meta tags e Open Graph</li>
                  <li>• <strong>MarkdownService</strong> - Parse e highlight</li>
                  <li>• <strong>NewsletterService</strong> - EmailJS integration</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            ✨ Features Implementadas
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="flex items-start gap-3">
              <span class="text-green-600 font-bold text-lg">✓</span>
              <div>
                <strong class="text-gray-900">Sistema de Posts Completo</strong>
                <p class="text-sm text-gray-600">Listagem, detalhes, filtros por categoria e busca</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-green-600 font-bold text-lg">✓</span>
              <div>
                <strong class="text-gray-900">Editor Markdown Avançado</strong>
                <p class="text-sm text-gray-600">Toolbar, preview, syntax highlighting e upload de imagens</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-green-600 font-bold text-lg">✓</span>
              <div>
                <strong class="text-gray-900">SEO Otimizado</strong>
                <p class="text-sm text-gray-600">Meta tags, Open Graph, Twitter Cards e Structured Data</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-green-600 font-bold text-lg">✓</span>
              <div>
                <strong class="text-gray-900">Newsletter Integration</strong>
                <p class="text-sm text-gray-600">EmailJS para gerenciamento de inscrições</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-green-600 font-bold text-lg">✓</span>
              <div>
                <strong class="text-gray-900">SSR & Hydration</strong>
                <p class="text-sm text-gray-600">Rendering híbrido com prerendering e SSR dinâmico</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-green-600 font-bold text-lg">✓</span>
              <div>
                <strong class="text-gray-900">Design Responsivo</strong>
                <p class="text-sm text-gray-600">Mobile-first, acessível e com menu adaptativo</p>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
            <h4 class="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              Destaques Técnicos
            </h4>
            <ul class="text-blue-900 space-y-2 text-sm">
              <li>🎯 <strong>Zoneless Change Detection</strong> - Performance superior sem Zone.js</li>
              <li>🔄 <strong>HTTP Transfer Cache</strong> - Elimina requisições duplicadas durante hydration</li>
              <li>📊 <strong>Structured Data (JSON-LD)</strong> - Rich snippets para mecanismos de busca</li>
              <li>⚡ <strong>Event Replay</strong> - Captura interações antes do JavaScript carregar</li>
              <li>🎨 <strong>Tailwind v4</strong> - Sistema de design moderno com @use syntax</li>
              <li>🧪 <strong>Type-Safe</strong> - TypeScript strict mode com interfaces completas</li>
            </ul>
          </div>
        </div>

        <!-- Author Section -->
        <div
          class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
        >
          <!-- Header com gradiente -->
          <div
            class="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 h-32"
          ></div>

          <div class="px-8 pb-8">
            <!-- Avatar e Info Principal -->
            <div
              class="flex flex-col md:flex-row md:items-start gap-6 -mt-16 relative"
            >
              <!-- Avatar -->
              <div class="flex-shrink-0">
                <div
                  class="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl ring-4 ring-white"
                >
                  {{ authorInitials() }}
                </div>
              </div>

              <!-- Info e Badges -->
              <div class="flex-1 md:mt-16">
                <div
                  class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
                >
                  <div>
                    <h3 class="text-3xl font-bold text-gray-900 mb-2">
                      Pablo Ferreira
                    </h3>
                    <p class="text-lg text-blue-600 font-semibold mb-3">
                      Desenvolvedor Front-End Sênior | Angular Expert
                    </p>
                    <div class="flex flex-wrap gap-2">
                      <span
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        <svg
                          class="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                        9+ anos de experiência
                      </span>
                      <span
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        <svg
                          class="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        12 anos em tecnologia
                      </span>
                    </div>
                  </div>

                  <!-- Social Links -->
                  <div class="flex gap-3">
                    <a
                      href="https://github.com/PabloFBDev"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="p-3 rounded-lg bg-gray-100 hover:bg-gray-900 text-gray-700 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                      title="GitHub"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com/in/pabloferreirab"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="p-3 rounded-lg bg-gray-100 hover:bg-blue-600 text-gray-700 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                      title="LinkedIn"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                        />
                      </svg>
                    </a>
                    <a
                      href="mailto:pablo_ferreira14@hotmail.com"
                      class="p-3 rounded-lg bg-gray-100 hover:bg-red-600 text-gray-700 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                      title="Email"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                <!-- Bio -->
                <div class="space-y-4 text-gray-600 leading-relaxed mb-6">
                  <p class="text-base">
                    Desenvolvedor Front-End Sênior com
                    <strong class="text-gray-900"
                      >+9 anos de experiência</strong
                    >
                    em desenvolvimento de interfaces modernas, performáticas e
                    escaláveis, atuo de ponta a ponta no ciclo de vida de
                    produtos digitais corporativos.
                  </p>
                  <p class="text-base">
                    Ao longo de
                    <strong class="text-gray-900"
                      >12 anos de trajetória em tecnologia</strong
                    >, me especializei em
                    <strong class="text-gray-900">Angular</strong> e construí
                    soluções robustas, reutilizáveis e alinhadas às melhores
                    práticas de mercado. Apaixonado por projetos criativos e
                    desafiadores que exigem soluções inovadoras.
                  </p>
                </div>
              </div>
            </div>

            <!-- Especialidades Grid -->
            <div class="mt-8">
              <h4
                class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"
              >
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                Especialidades Técnicas
              </h4>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Frameworks & Bibliotecas -->
                <div
                  class="bg-white rounded-lg p-5 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group"
                >
                  <div class="flex items-start gap-3 mb-3">
                    <div
                      class="p-2.5 bg-blue-100 rounded-lg group-hover:bg-blue-600 transition-colors duration-300"
                    >
                      <svg
                        class="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </div>
                    <h5 class="font-bold text-gray-900 text-base leading-tight">
                      Frameworks &<br />Bibliotecas
                    </h5>
                  </div>
                  <p class="text-sm text-gray-600 leading-relaxed">
                    Angular 2+
                    <span class="text-blue-600 font-semibold"
                      >(expert / domínio avançado)</span
                    >, React, Vue.js, Nuxt 3
                  </p>
                </div>

                <!-- Linguagens & Styling -->
                <div
                  class="bg-white rounded-lg p-5 border-2 border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 group"
                >
                  <div class="flex items-start gap-3 mb-3">
                    <div
                      class="p-2.5 bg-purple-100 rounded-lg group-hover:bg-purple-600 transition-colors duration-300"
                    >
                      <svg
                        class="w-5 h-5 text-purple-600 group-hover:text-white transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        />
                      </svg>
                    </div>
                    <h5 class="font-bold text-gray-900 text-base leading-tight">
                      Linguagens &<br />Styling
                    </h5>
                  </div>
                  <p class="text-sm text-gray-600 leading-relaxed">
                    TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
                  </p>
                </div>

                <!-- Arquitetura -->
                <div
                  class="bg-white rounded-lg p-5 border-2 border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 group"
                >
                  <div class="flex items-start gap-3 mb-3">
                    <div
                      class="p-2.5 bg-indigo-100 rounded-lg group-hover:bg-indigo-600 transition-colors duration-300"
                    >
                      <svg
                        class="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <h5 class="font-bold text-gray-900 text-base leading-tight">
                      Arquitetura
                    </h5>
                  </div>
                  <p class="text-sm text-gray-600 leading-relaxed">
                    Microfrontends, Monorepo com Nx, Design System (Storybook)
                  </p>
                </div>

                <!-- Integrações -->
                <div
                  class="bg-white rounded-lg p-5 border-2 border-gray-200 hover:border-teal-400 hover:shadow-lg transition-all duration-300 group"
                >
                  <div class="flex items-start gap-3 mb-3">
                    <div
                      class="p-2.5 bg-teal-100 rounded-lg group-hover:bg-teal-600 transition-colors duration-300"
                    >
                      <svg
                        class="w-5 h-5 text-teal-600 group-hover:text-white transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h5 class="font-bold text-gray-900 text-base leading-tight">
                      Integrações
                    </h5>
                  </div>
                  <p class="text-sm text-gray-600 leading-relaxed">
                    REST APIs, GraphQL
                  </p>
                </div>

                <!-- Qualidade & Testes -->
                <div
                  class="bg-white rounded-lg p-5 border-2 border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 group"
                >
                  <div class="flex items-start gap-3 mb-3">
                    <div
                      class="p-2.5 bg-green-100 rounded-lg group-hover:bg-green-600 transition-colors duration-300"
                    >
                      <svg
                        class="w-5 h-5 text-green-600 group-hover:text-white transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h5 class="font-bold text-gray-900 text-base leading-tight">
                      Qualidade &<br />Testes
                    </h5>
                  </div>
                  <p class="text-sm text-gray-600 leading-relaxed">
                    Jest, Jasmine, TDD
                  </p>
                </div>

                <!-- Observabilidade & Análise -->
                <div
                  class="bg-white rounded-lg p-5 border-2 border-gray-200 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group"
                >
                  <div class="flex items-start gap-3 mb-3">
                    <div
                      class="p-2.5 bg-amber-100 rounded-lg group-hover:bg-amber-600 transition-colors duration-300"
                    >
                      <svg
                        class="w-5 h-5 text-amber-600 group-hover:text-white transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h5 class="font-bold text-gray-900 text-base leading-tight">
                      Observabilidade &<br />Análise
                    </h5>
                  </div>
                  <p class="text-sm text-gray-600 leading-relaxed">
                    Datadog, SonarQube
                  </p>
                </div>

                <!-- Cloud & DevOps -->
                <div
                  class="bg-white rounded-lg p-5 border-2 border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300 group"
                >
                  <div class="flex items-start gap-3 mb-3">
                    <div
                      class="p-2.5 bg-orange-100 rounded-lg group-hover:bg-orange-600 transition-colors duration-300"
                    >
                      <svg
                        class="w-5 h-5 text-orange-600 group-hover:text-white transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                        />
                      </svg>
                    </div>
                    <h5 class="font-bold text-gray-900 text-base leading-tight">
                      Cloud &<br />DevOps
                    </h5>
                  </div>
                  <p class="text-sm text-gray-600 leading-relaxed">
                    Azure, AWS, CI/CD, Git, Azure DevOps, GitHub Actions
                  </p>
                </div>

                <!-- Boas Práticas & Arquitetura -->
                <div
                  class="bg-white rounded-lg p-5 border-2 border-gray-200 hover:border-rose-400 hover:shadow-lg transition-all duration-300 group"
                >
                  <div class="flex items-start gap-3 mb-3">
                    <div
                      class="p-2.5 bg-rose-100 rounded-lg group-hover:bg-rose-600 transition-colors duration-300"
                    >
                      <svg
                        class="w-5 h-5 text-rose-600 group-hover:text-white transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h5 class="font-bold text-gray-900 text-base leading-tight">
                      Boas Práticas &<br />Arquitetura
                    </h5>
                  </div>
                  <p class="text-sm text-gray-600 leading-relaxed">
                    SOLID, Clean Code, Design Patterns (Factory, Singleton,
                    Observer, Facade)
                  </p>
                </div>

                <!-- Metodologias Ágeis -->
                <div
                  class="bg-white rounded-lg p-5 border-2 border-gray-200 hover:border-cyan-400 hover:shadow-lg transition-all duration-300 group"
                >
                  <div class="flex items-start gap-3 mb-3">
                    <div
                      class="p-2.5 bg-cyan-100 rounded-lg group-hover:bg-cyan-600 transition-colors duration-300"
                    >
                      <svg
                        class="w-5 h-5 text-cyan-600 group-hover:text-white transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h5 class="font-bold text-gray-900 text-base leading-tight">
                      Metodologias<br />Ágeis
                    </h5>
                  </div>
                  <p class="text-sm text-gray-600 leading-relaxed">
                    Scrum, Kanban
                  </p>
                </div>
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
