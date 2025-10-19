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
      <div
        class="absolute inset-0 bg-grid-pattern opacity-10"
        aria-hidden="true"
      ></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Aprenda Angular
            <span
              class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200"
            >
              com Tutoriais Práticos
            </span>
          </h1>

          <p
            class="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed"
          >
            Explore dicas de performance, arquitetura moderna, melhores práticas
            e fique por dentro das últimas novidades do ecossistema Angular.
          </p>
        </div>
      </div>
    </section>

    <!-- Latest Posts Grid -->
    <section class="py-12 sm:py-16 bg-white">
      <app-post-grid
        [posts]="latestPosts()"
        title="Últimos Artigos"
        subtitle="Confira os posts mais recentes e fique por dentro das novidades"
      />
    </section>

    <!-- Explore More Button -->
    <section class="pt-2 pb-8 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <a
          routerLink="/posts"
          class="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Mostrar Todos os Artigos
          <svg
            class="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform"
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
    </section>

    <!-- Newsletter Section -->
    <section
      class="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 sm:py-16"
    >
      <app-newsletter [source]="'homepage'" [variant]="'full'" />
    </section>
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
