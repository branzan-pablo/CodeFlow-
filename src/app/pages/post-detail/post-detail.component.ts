import {
  Component,
  signal,
  computed,
  inject,
  OnInit,
  AfterViewChecked,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { MarkdownService } from '../../services/markdown.service';
import { Post } from '../../models/post.interface';
import { Title, Meta } from '@angular/platform-browser';
import { NewsletterCompactComponent } from '../../components/newsletter/newsletter-compact.component';

@Component({
  selector: 'app-post-detail',
  imports: [RouterLink, NewsletterCompactComponent],
  template: `
    @if (post(); as currentPost) {
    <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm text-gray-500">
          <li><a routerLink="/" class="hover:text-gray-700">Home</a></li>
          <li>/</li>
          <li><a routerLink="/posts" class="hover:text-gray-700">Posts</a></li>
          <li>/</li>
          <li class="text-gray-900">{{ currentPost.title }}</li>
        </ol>
      </nav>

      <!-- Header -->
      <header class="mb-8">
        <!-- Category Badge -->
        <div class="mb-4">
          <span
            class="inline-block px-3 py-1 text-sm font-medium rounded-full"
            [style.background-color]="currentPost.category.color + '20'"
            [style.color]="currentPost.category.color"
          >
            {{ currentPost.category.name }}
          </span>
          @if (currentPost.featured) {
          <span
            class="ml-2 inline-block px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800"
          >
            ✨ Post em Destaque
          </span>
          }
        </div>

        <!-- Title -->
        <h1
          class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
        >
          {{ currentPost.title }}
        </h1>

        <!-- Meta Information -->
        <div class="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
          <div class="flex items-center space-x-2">
            <div
              class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold"
            >
              {{ getAuthorInitials(currentPost.author.name) }}
            </div>
            <div>
              <div class="font-medium text-gray-900">
                {{ currentPost.author.name }}
              </div>
              @if (currentPost.author.bio) {
              <div class="text-sm text-gray-500">
                {{ currentPost.author.bio }}
              </div>
              }
            </div>
          </div>
          <div class="text-sm">
            <time [dateTime]="currentPost.publishedAt">
              {{ formatDate(currentPost.publishedAt) }}
            </time>
          </div>
          <div class="text-sm">{{ currentPost.readTime }} min de leitura</div>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-8">
          @for (tag of currentPost.tags; track tag) {
          <span
            class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
          >
            #{{ tag }}
          </span>
          }
        </div>

        <!-- Cover Image Placeholder -->
        <div
          class="h-64 md:h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-8"
        ></div>
      </header>

      <!-- Content -->
      <div class="prose prose-lg max-w-none">
        <div [innerHTML]="getFormattedContent(currentPost.content)"></div>
      </div>

      <!-- Author Info -->
      <div class="mt-12 p-6 bg-gray-50 rounded-lg">
        <div class="flex items-start space-x-4">
          <div
            class="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-semibold"
          >
            {{ getAuthorInitials(currentPost.author.name) }}
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Sobre {{ currentPost.author.name }}
            </h3>
            @if (currentPost.author.bio) {
            <p class="text-gray-600 mb-4">{{ currentPost.author.bio }}</p>
            } @if (currentPost.author.socialLinks) {
            <div class="flex space-x-4">
              @if (currentPost.author.socialLinks.github) {
              <a
                [href]="currentPost.author.socialLinks.github"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="GitHub"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
              } @if (currentPost.author.socialLinks.linkedin) {
              <a
                [href]="currentPost.author.socialLinks.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="LinkedIn"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>
              }
            </div>
            }
          </div>
        </div>
      </div>

      <!-- Related Posts -->
      @if (relatedPosts().length > 0) {
      <section class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">
          Posts Relacionados
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (relatedPost of relatedPosts(); track relatedPost.id) {
          <article
            class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div
              class="h-32 bg-gradient-to-br from-blue-100 to-purple-100"
            ></div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                <a
                  [routerLink]="['/posts', relatedPost.slug]"
                  class="hover:text-blue-600 transition-colors"
                >
                  {{ relatedPost.title }}
                </a>
              </h3>
              <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                {{ relatedPost.excerpt }}
              </p>
              <div
                class="flex items-center justify-between text-xs text-gray-500"
              >
                <span>{{ formatDate(relatedPost.publishedAt) }}</span>
                <span>{{ relatedPost.readTime }} min</span>
              </div>
            </div>
          </article>
          }
        </div>
      </section>
      }

      <!-- Navigation -->
      <nav class="mt-12 pt-8 border-t border-gray-200">
        <a
          routerLink="/posts"
          class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Voltar para Posts
        </a>
      </nav>
    </article>

    <!-- Newsletter Section -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <app-newsletter-compact [source]="'post-detail'" />
    </div>
    } @else {
    <!-- Post not found -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <svg
        class="mx-auto h-16 w-16 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        ></path>
      </svg>
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Post não encontrado</h1>
      <p class="text-gray-600 mb-6">
        O post que você está procurando não existe ou foi removido.
      </p>
      <a
        routerLink="/posts"
        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        Ver Todos os Posts
      </a>
    </div>
    }
  `,
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit, AfterViewChecked {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly postService = inject(PostService);
  private readonly markdownService = inject(MarkdownService);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  private highlightApplied = false;

  protected readonly post = signal<Post | null>(null);

  protected readonly relatedPosts = computed(() => {
    const currentPost = this.post();
    if (!currentPost) return [];

    // Buscar posts da mesma categoria, excluindo o post atual
    return this.postService
      .getPostsByCategory(currentPost.category.slug)
      .filter((p) => p.id !== currentPost.id)
      .slice(0, 2);
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      const foundPost = this.postService.getPostBySlug(slug);

      if (foundPost) {
        this.post.set(foundPost);
        this.updateMetaTags(foundPost);
        this.highlightApplied = false; // Reset flag for new post
      } else {
        this.post.set(null);
        this.router.navigate(['/posts']);
      }
    });
  }

  ngAfterViewChecked(): void {
    // Aplica syntax highlighting após a view ser atualizada
    if (this.post() && !this.highlightApplied) {
      setTimeout(() => {
        this.markdownService.highlightAllCode();
        this.highlightApplied = true;
      }, 100);
    }
  }

  private updateMetaTags(post: Post): void {
    this.titleService.setTitle(`${post.title} | Meu Blog`);

    this.metaService.updateTag({
      name: 'description',
      content: post.metaDescription || post.excerpt,
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: post.title,
    });

    this.metaService.updateTag({
      property: 'og:description',
      content: post.metaDescription || post.excerpt,
    });

    this.metaService.updateTag({
      property: 'og:type',
      content: 'article',
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: post.tags.join(', '),
    });
  }

  protected formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  protected getAuthorInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  protected getFormattedContent(content: string): string {
    return this.markdownService.parse(content);
  }
}
