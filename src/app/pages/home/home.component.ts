import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { SeoService } from '../../services/seo.service';
import {
  StructuredDataService,
  generateBlogStructuredData,
} from '../../services/structured-data.service';
import { NewsletterComponent } from '../../components/newsletter/newsletter.component';
import { PostGridComponent } from '../../components/post-grid/post-grid.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NewsletterComponent, PostGridComponent],
  template: `
    <section
      class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-10 sm:py-12 lg:py-16"
    >
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <!-- Animated Blobs - Hidden on mobile for performance -->
      <div
        class="hidden md:block absolute top-0 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full animate-blob"
        aria-hidden="true"
      ></div>
      <div
        class="hidden md:block absolute top-0 right-1/4 w-96 h-96 bg-purple-400/30 rounded-full animate-blob animation-delay-2000"
        aria-hidden="true"
      ></div>
      <div
        class="hidden md:block absolute bottom-0 left-1/3 w-96 h-96 bg-pink-400/30 rounded-full animate-blob animation-delay-4000"
        aria-hidden="true"
      ></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div class="text-center">
          <h1
            class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight animate-fade-in-up"
          >
            Aprenda Angular
            <span
              class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200"
            >
              com Tutoriais Práticos
            </span>
          </h1>

          <p
            class="text-base sm:text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200"
          >
            Explore dicas de performance, arquitetura moderna, melhores práticas
            e fique por dentro das últimas novidades do ecossistema Angular.
          </p>

          <div
            class="flex flex-col sm:flex-row gap-3 justify-center items-center animate-fade-in-up animation-delay-400"
          >
            <a
              routerLink="/posts"
              class="group inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl text-blue-600 bg-white hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Explorar Artigos
              <svg
                class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              routerLink="/sobre"
              class="inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              Sobre o Blog
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Posts Grid -->
    <app-post-grid
      [posts]="latestPosts()"
      title="Últimos Artigos"
      subtitle="Confira os posts mais recentes e fique por dentro das novidades"
    />

    <!-- Newsletter CTA -->
    <app-newsletter [source]="'homepage'" />
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly postService = inject(PostService);
  private readonly seoService = inject(SeoService);
  private readonly structuredDataService = inject(StructuredDataService);

  // Últimos 6 posts
  protected readonly latestPosts = computed(() => {
    return this.postService.allPosts().slice(0, 6);
  });

  ngOnInit(): void {
    this.setupSeoData();
  }

  private setupSeoData(): void {
    const baseUrl = 'https://your-domain.com'; // Configure com seu domínio

    // Configurar SEO para homepage
    this.seoService.setSeoData({
      title: '',
      description:
        'Este é o espaço perfeito para quem quer aprender Angular de forma prática, descobrir dicas e melhores práticas, explorar técnicas avançadas e ficar sempre por dentro das novidades e tendências do mundo front-end.',
      keywords: [
        'Angular',
        'TypeScript',
        'Desenvolvimento Web',
        'JavaScript',
        'Blog',
        'Tecnologia',
      ],
      url: baseUrl,
      type: 'website',
    });

    // Adicionar dados estruturados do blog
    const blogStructuredData = generateBlogStructuredData(
      'CodeFlow Angular',
      'Este é o espaço perfeito para quem quer aprender Angular de forma prática, descobrir dicas e melhores práticas, explorar técnicas avançadas e ficar sempre por dentro das novidades e tendências do mundo front-end.',
      baseUrl
    );

    this.structuredDataService.addStructuredData(blogStructuredData, 'blog');
  }
}
