import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { SeoService } from '../../services/seo.service';
import {
  StructuredDataService,
  generateBlogStructuredData,
} from '../../services/structured-data.service';
import { NewsletterComponent } from '../../components/newsletter/newsletter.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NewsletterComponent],
  template: `
    <section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Bem-vindo ao {{ blogTitle() }}
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Este é o espaço perfeito para quem quer aprender Angular de forma
          prática, descobrir dicas e melhores práticas, explorar técnicas
          avançadas e ficar sempre por dentro das novidades e tendências do
          mundo front-end.
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
          @for (post of postService.featuredPosts(); track post.id) {
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
                <span class="text-sm text-gray-500">{{
                  formatDate(post.publishedAt)
                }}</span>
                <a
                  [routerLink]="['/posts', post.slug]"
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

    <!-- Newsletter Section -->
    <app-newsletter [source]="'homepage'" />
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  protected readonly blogTitle = signal('CodeFlow Angular');
  protected readonly postService = inject(PostService);
  private readonly seoService = inject(SeoService);
  private readonly structuredDataService = inject(StructuredDataService);

  ngOnInit(): void {
    this.setupSeoData();
  }

  private setupSeoData(): void {
    const baseUrl = 'https://your-domain.com'; // Configure com seu domínio

    // Configurar SEO para homepage
    this.seoService.setSeoData({
      title: 'CodeFlow Angular',
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

  protected formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
