import { Component, signal, inject, OnInit } from '@angular/core';
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
  imports: [NewsletterComponent, PostGridComponent],
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
        </div>
      </div>
    </section>

    <!-- Posts em Destaque -->
    <app-post-grid
      [posts]="postService.featuredPosts()"
      title="Últimos Posts"
      subtitle="Confira os artigos mais recentes"
    />

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
}
