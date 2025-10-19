import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'app-post-grid',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      @if (title() || subtitle()) {
      <div class="text-center mb-10 sm:mb-14">
        @if (title()) {
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3"
        >
          {{ title() }}
        </h2>
        } @if (subtitle()) {
        <p class="text-lg sm:text-xl text-gray-600">{{ subtitle() }}</p>
        }
      </div>
      }

      <!-- Grid de posts em destaque -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        @for (post of posts(); track post.id) {
        <article
          [routerLink]="['/posts', post.slug]"
          class="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-blue-500 cursor-pointer"
        >
          <!-- Image Placeholder com Gradient -->
          <div
            class="relative h-48 sm:h-56 bg-gradient-to-br overflow-hidden"
            [class]="getGradientClass(post.category.slug)"
          >
            <!-- Category Badge -->
            <div class="absolute top-4 left-4">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm"
                [style.backgroundColor]="post.category.color + '99'"
              >
                {{ post.category.name }}
              </span>
            </div>

            <!-- Decorative Pattern -->
            <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Title -->
            <h3
              class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 decoration-2 decoration-transparent group-hover:decoration-blue-600 transition-colors h-14"
            >
              {{ post.title }}
            </h3>

            <!-- Excerpt -->
            <p
              class="text-gray-600 mb-4 line-clamp-3 leading-relaxed h-[4.5rem]"
            >
              {{ post.excerpt }}
            </p>

            <!-- Meta Information -->
            <div
              class="flex items-center space-x-4 pt-4 border-t border-gray-100 text-sm text-gray-500"
            >
              <!-- Date -->
              <span class="flex items-center">
                <svg
                  class="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                {{ formatDate(post.publishedAt) }}
              </span>

              <!-- Read Time -->
              <span class="flex items-center">
                <svg
                  class="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                {{ post.readTime }} min
              </span>
            </div>
          </div>
        </article>
        } @empty {
        <div class="col-span-full text-center py-12 sm:py-16">
          <svg
            class="w-16 h-16 mx-auto text-gray-300 mb-4"
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
          <p class="text-lg text-gray-500">{{ emptyMessage() }}</p>
        </div>
        }
      </div>
    </div>
  `,
  styles: `
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .bg-grid-pattern {
      background-image:
        linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
      background-size: 20px 20px;
    }
  `,
})
export class PostGridComponent {
  // Inputs
  posts = input.required<Post[]>();
  title = input<string>('Últimos Posts');
  subtitle = input<string>('Confira os artigos mais recentes');
  emptyMessage = input<string>('Nenhum post encontrado.');

  protected formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  protected getGradientClass(categorySlug: string): string {
    const gradients: Record<string, string> = {
      angular: 'from-red-400 via-pink-500 to-red-600',
      typescript: 'from-blue-400 via-blue-500 to-blue-600',
      'web-development': 'from-cyan-400 via-teal-500 to-cyan-600',
      devops: 'from-orange-400 via-amber-500 to-orange-600',
    };
    return (
      gradients[categorySlug] || 'from-purple-400 via-indigo-500 to-purple-600'
    );
  }
}
