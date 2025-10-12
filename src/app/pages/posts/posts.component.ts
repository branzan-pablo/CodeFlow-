import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { PostFilters, Post } from '../../models/post.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts',
  imports: [RouterLink, FormsModule],
  template: `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Todos os Posts</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore todos os artigos sobre desenvolvimento, tecnologia e inovação.
        </p>
      </div>

      <!-- Filters and Search -->
      <div class="mb-8 space-y-4">
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
                (input)="onSearchChange()"
                placeholder="Buscar posts..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Clear filters button -->
          @if (hasActiveFilters()) {
          <button
            (click)="clearAllFilters()"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Limpar Filtros
          </button>
          }
        </div>

        <!-- Category and Tag Filters -->
        <div class="flex flex-wrap gap-4">
          <!-- Categories -->
          <div class="flex flex-wrap gap-2">
            <span class="text-sm font-medium text-gray-700 px-2 py-1"
              >Categorias:</span
            >
            @for (category of postService.categories(); track category.id) {
            <button
              (click)="toggleCategoryFilter(category.slug)"
              [class]="getCategoryButtonClass(category.slug)"
              class="px-3 py-1 text-xs font-medium rounded-full transition-colors"
            >
              {{ category.name }}
            </button>
            }
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            <span class="text-sm font-medium text-gray-700 px-2 py-1"
              >Tags:</span
            >
            @for (tag of popularTags(); track tag) {
            <button
              (click)="toggleTagFilter(tag)"
              [class]="getTagButtonClass(tag)"
              class="px-3 py-1 text-xs font-medium rounded-full transition-colors"
            >
              {{ tag }}
            </button>
            }
          </div>
        </div>
      </div>

      <!-- Results Count -->
      <div class="mb-6">
        <p class="text-gray-600">
          {{ filteredPosts().length }}
          {{
            filteredPosts().length === 1
              ? 'post encontrado'
              : 'posts encontrados'
          }}
        </p>
      </div>

      <!-- Posts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (post of filteredPosts(); track post.id) {
        <article
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
        >
          <!-- Cover Image Placeholder -->
          <div
            class="h-48 bg-gradient-to-br from-blue-100 to-purple-100 relative"
          >
            @if (post.featured) {
            <div
              class="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium"
            >
              Destaque
            </div>
            }
          </div>

          <div class="p-6">
            <!-- Category -->
            <div class="mb-3">
              <span
                class="inline-block px-3 py-1 text-xs font-medium rounded-full"
                [style.background-color]="post.category.color + '20'"
                [style.color]="post.category.color"
              >
                {{ post.category.name }}
              </span>
            </div>

            <!-- Title -->
            <h2 class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
              <a
                [routerLink]="['/posts', post.slug]"
                class="hover:text-blue-600 transition-colors"
              >
                {{ post.title }}
              </a>
            </h2>

            <!-- Excerpt -->
            <p class="text-gray-600 mb-4 line-clamp-3">{{ post.excerpt }}</p>

            <!-- Meta information -->
            <div
              class="flex items-center justify-between text-sm text-gray-500"
            >
              <div class="flex items-center space-x-4">
                <span>{{ formatDate(post.publishedAt) }}</span>
                <span>{{ post.readTime }} min</span>
              </div>
              <a
                [routerLink]="['/posts', post.slug]"
                class="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Ler mais
              </a>
            </div>

            <!-- Tags -->
            <div class="mt-4 flex flex-wrap gap-1">
              @for (tag of post.tags.slice(0, 3); track tag) {
              <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                {{ tag }}
              </span>
              } @if (post.tags.length > 3) {
              <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{{ post.tags.length - 3 }}
              </span>
              }
            </div>
          </div>
        </article>
        } @empty {
        <div class="col-span-full text-center py-12">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
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
          <h3 class="mt-2 text-sm font-medium text-gray-900">
            Nenhum post encontrado
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Tente ajustar os filtros ou a busca.
          </p>
        </div>
        }
      </div>
    </div>
  `,
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  protected readonly postService = inject(PostService);

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
  }

  protected onSearchChange(): void {
    // O signal já reagirá automaticamente à mudança
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

  protected formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
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
