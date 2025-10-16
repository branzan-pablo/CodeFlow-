import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'app-post-grid',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="py-12 sm:py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8 sm:mb-12">
          <h2 class="text-responsive-3xl font-bold text-gray-900 mb-2">
            {{ title() }}
          </h2>
          <p class="text-responsive-base text-gray-600">{{ subtitle() }}</p>
        </div>

        <!-- Grid de posts em destaque -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          @for (post of posts(); track post.id) {
          <article
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div
              class="h-40 sm:h-48 bg-gradient-to-br from-blue-100 to-purple-100"
            ></div>
            <div class="p-4 sm:p-6">
              <h3 class="text-responsive-lg font-semibold text-gray-900 mb-2">
                {{ post.title }}
              </h3>
              <p
                class="text-responsive-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3"
              >
                {{ post.excerpt }}
              </p>
              <div class="flex items-center justify-between">
                <span class="text-xs sm:text-sm text-gray-500">{{
                  formatDate(post.publishedAt)
                }}</span>
                <a
                  [routerLink]="['/posts', post.slug]"
                  class="text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm transition-colors"
                >
                  Ler mais
                </a>
              </div>
            </div>
          </article>
          } @empty {
          <div class="col-span-full text-center py-8 sm:py-12">
            <p class="text-responsive-sm text-gray-500">{{ emptyMessage() }}</p>
          </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
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
      month: 'long',
      year: 'numeric',
    });
  }
}
