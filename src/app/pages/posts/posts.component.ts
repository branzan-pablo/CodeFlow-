import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { PostFilters, Post } from '../../models/post.interface';
import { SeoService } from '../../services/seo.service';
import { PostGridComponent } from '../../components/post-grid/post-grid.component';

@Component({
  selector: 'app-posts',
  imports: [FormsModule, PostGridComponent],
  template: `
    <div class="bg-gray-50">
      <!-- Header with Filters -->
      <div class="bg-white border-b border-gray-200">
        <div class="container-wide py-6 sm:py-8">
          <!-- Header -->
          <div class="text-center mb-8">
            <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
              Todos os Posts
            </h1>
            <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Explore todos os artigos sobre desenvolvimento, tecnologia e
              inovação.
            </p>
          </div>

          <!-- Filters and Search -->
          <div class="space-y-4">
            <!-- Search -->
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <label for="search" class="sr-only">Buscar posts</label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    id="search"
                    type="text"
                    [(ngModel)]="searchTerm"
                    placeholder="Buscar posts..."
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <!-- Clear filters button -->
              @if (hasActiveFilters()) {
              <button
                (click)="clearAllFilters()"
                class="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Limpar Filtros
              </button>
              }
            </div>

            <!-- Category and Tag Filters -->
            <div class="flex flex-wrap gap-4">
              <!-- Categories -->
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-sm font-semibold text-gray-700 mr-2"
                  >Categorias:</span
                >
                @for (category of postService.categories(); track category.id) {
                <button
                  (click)="toggleCategoryFilter(category.slug)"
                  [class]="getCategoryButtonClass(category.slug)"
                  class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border"
                >
                  {{ category.name }}
                </button>
                }
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-sm font-semibold text-gray-700 mr-2"
                  >Tags:</span
                >
                @for (tag of popularTags(); track tag) {
                <button
                  (click)="toggleTagFilter(tag)"
                  [class]="getTagButtonClass(tag)"
                  class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border"
                >
                  {{ tag }}
                </button>
                }
              </div>
            </div>

            <!-- Results Count -->
            <div class="pt-2">
              <p class="text-sm text-gray-600">
                <span class="font-semibold text-gray-900">{{
                  filteredPosts().length
                }}</span>
                {{
                  filteredPosts().length === 1
                    ? 'post encontrado'
                    : 'posts encontrados'
                }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Posts Grid usando PostGridComponent -->
      <section class="py-12 sm:py-16 bg-gray-50">
        <app-post-grid
          [posts]="filteredPosts()"
          [title]="''"
          [subtitle]="''"
          [emptyMessage]="
            'Nenhum post encontrado. Tente ajustar os filtros ou a busca.'
          "
        />
      </section>
    </div>
  `,
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  protected readonly postService = inject(PostService);
  private readonly seoService = inject(SeoService);

  protected readonly searchTerm = signal('');
  protected readonly selectedCategory = signal<string | null>(null);
  protected readonly selectedTag = signal<string | null>(null);

  // Computed signals
  protected readonly filteredPosts = computed(() => {
    const filters: PostFilters = {
      search: this.searchTerm() || undefined,
      category: this.selectedCategory() || undefined,
      tag: this.selectedTag() || undefined,
    };

    // Aplicar filtros localmente sem usar setFilters no computed
    return this.filterPostsLocally(filters);
  });

  protected readonly popularTags = computed(() => {
    // Retorna as tags mais populares (primeiras 8)
    return this.postService.tags().slice(0, 8);
  });

  protected readonly hasActiveFilters = computed(() => {
    return !!(
      this.searchTerm() ||
      this.selectedCategory() ||
      this.selectedTag()
    );
  });

  ngOnInit(): void {
    // Limpar filtros ao inicializar
    this.postService.clearFilters();

    // Configurar SEO
    this.seoService.setSeoData({
      title: 'Todos os Posts',
      description:
        'Explore todos os artigos sobre Angular, TypeScript, desenvolvimento web, SSR, performance e boas práticas. Filtre por categoria ou tag para encontrar o conteúdo ideal.',
      keywords: [
        'posts',
        'artigos',
        'Angular',
        'TypeScript',
        'desenvolvimento web',
        'tutoriais',
        'blog',
        'programação',
      ],
      type: 'website',
      url: 'https://your-domain.com/posts',
    });
  }

  protected toggleCategoryFilter(categorySlug: string): void {
    const current = this.selectedCategory();
    this.selectedCategory.set(current === categorySlug ? null : categorySlug);
  }

  protected toggleTagFilter(tag: string): void {
    const current = this.selectedTag();
    this.selectedTag.set(current === tag ? null : tag);
  }

  protected clearAllFilters(): void {
    this.searchTerm.set('');
    this.selectedCategory.set(null);
    this.selectedTag.set(null);
    this.postService.clearFilters();
  }

  protected getCategoryButtonClass(categorySlug: string): string {
    const isSelected = this.selectedCategory() === categorySlug;
    return isSelected
      ? 'bg-blue-600 text-white border-blue-600'
      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';
  }

  protected getTagButtonClass(tag: string): string {
    const isSelected = this.selectedTag() === tag;
    return isSelected
      ? 'bg-green-600 text-white border-green-600'
      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';
  }

  private filterPostsLocally(filters: PostFilters): Post[] {
    let filteredPosts = this.postService.allPosts();

    if (filters.category) {
      filteredPosts = filteredPosts.filter(
        (post) => post.category.slug === filters.category
      );
    }

    if (filters.tag) {
      filteredPosts = filteredPosts.filter((post) =>
        post.tags.includes(filters.tag!)
      );
    }

    if (filters.author) {
      filteredPosts = filteredPosts.filter((post) =>
        post.author.name.toLowerCase().includes(filters.author!.toLowerCase())
      );
    }

    if (filters.featured !== undefined) {
      filteredPosts = filteredPosts.filter(
        (post) => post.featured === filters.featured
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    return filteredPosts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }
}
