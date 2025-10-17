import { Injectable, signal, computed } from '@angular/core';
import { Post, PostFilters, Author, Category } from '../models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // Estado interno usando signals
  private readonly _allPosts = signal<Post[]>(this.getMockPosts());
  private readonly filters = signal<PostFilters>({});
  private readonly loading = signal(false);

  // Expor allPosts para acesso direto
  readonly allPosts = this._allPosts.asReadonly();

  // Computed signals para dados derivados
  readonly posts = computed(() => {
    const posts = this._allPosts();
    const currentFilters = this.filters();

    return this.filterPosts(posts, currentFilters);
  });

  readonly featuredPosts = computed(() =>
    this._allPosts()
      .filter((post) => post.featured)
      .slice(0, 6)
  );

  readonly recentPosts = computed(() =>
    this._allPosts()
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .slice(0, 5)
  );

  readonly categories = computed(() => {
    const categories = new Map<number, Category>();
    this._allPosts().forEach((post) => {
      categories.set(post.category.id, post.category);
    });
    return Array.from(categories.values());
  });

  readonly tags = computed(() => {
    const tagSet = new Set<string>();
    this._allPosts().forEach((post) => {
      post.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  });

  readonly isLoading = this.loading.asReadonly();

  // Métodos públicos
  getPostBySlug(slug: string): Post | undefined {
    return this._allPosts().find((post) => post.slug === slug);
  }

  getPostsByCategory(categorySlug: string): Post[] {
    return this._allPosts().filter(
      (post) => post.category.slug === categorySlug
    );
  }

  getPostsByTag(tag: string): Post[] {
    return this._allPosts().filter((post) => post.tags.includes(tag));
  }

  searchPosts(query: string): Post[] {
    const searchTerm = query.toLowerCase();
    return this._allPosts().filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  }

  setFilters(newFilters: PostFilters): void {
    this.filters.set(newFilters);
  }

  clearFilters(): void {
    this.filters.set({});
  }

  // Método privado para filtrar posts
  private filterPosts(posts: Post[], filters: PostFilters): Post[] {
    let filteredPosts = posts;

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

  // Mock data - em um projeto real, isso viria de uma API
  private getMockPosts(): Post[] {
    const author: Author = {
      id: 1,
      name: 'Pablo Ferreira',
      bio: 'Desenvolvedor Full-Stack apaixonado por tecnologia e inovação.',
      avatar: '/images/avatar.svg',
      socialLinks: {
        github: 'https://github.com/PabloFBDev',
        linkedin: 'https://linkedin.com/in/pablo-ferreira-31a79524b',
      },
    };

    const categories: Category[] = [
      {
        id: 1,
        name: 'Angular',
        slug: 'angular',
        description: 'Framework para aplicações web',
        color: '#DD0031',
      },
      {
        id: 2,
        name: 'TypeScript',
        slug: 'typescript',
        description: 'JavaScript tipado',
        color: '#3178C6',
      },
      {
        id: 3,
        name: 'Web Development',
        slug: 'web-development',
        description: 'Desenvolvimento web geral',
        color: '#61DAFB',
      },
      {
        id: 4,
        name: 'DevOps',
        slug: 'devops',
        description: 'Práticas de desenvolvimento e operações',
        color: '#FFA500',
      },
    ];

    return [
      {
        id: 1,
        title: 'Começando com Angular: Zoneless Change Detection',
        slug: 'comecando-com-angular-20',
        excerpt:
          'Descubra as novidades do Angular e como aproveitar ao máximo os novos recursos como signals e zoneless change detection para criar aplicações mais performáticas.',
        content: `# Começando com Angular: Zoneless Change Detection

O Angular trouxe uma das mudanças mais significativas da história do framework: a possibilidade de usar **zoneless change detection**. Esta nova abordagem promete melhorar drasticamente a performance das aplicações Angular.

## O que mudou?

Tradicionalmente, o Angular usava Zone.js para detectar mudanças automaticamente. Com o Angular, podemos usar signals para gerenciar o estado e disparar mudanças de forma mais eficiente.

### Principais vantagens:

- ⚡ **Performance aprimorada** - Menos overhead computacional
- 🐛 **Debugging simplificado** - Fluxo mais previsível  
- 📦 **Bundle menor** - Elimina dependência da Zone.js
- 🎯 **Controle granular** - Atualizações mais precisas

## Implementação Prática

Para habilitar zoneless change detection:

\`\`\`typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    // outros providers...
  ]
});
\`\`\`

## Trabalhando com Signals

Os signals se tornam fundamentais no novo modelo:

\`\`\`typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  template: \`
    <div class="counter-demo">
      <h2>Contador: {{ count() }}</h2>
      <p>Dobrado: {{ doubled() }}</p>
      <p>Status: {{ status() }}</p>
      
      <div class="actions">
        <button (click)="increment()">Incrementar</button>
        <button (click)="decrement()">Decrementar</button>
        <button (click)="reset()">Reset</button>
      </div>
    </div>
  \`
})
export class CounterComponent {
  // Signal básico
  count = signal(0);
  
  // Computed signals derivados
  doubled = computed(() => this.count() * 2);
  status = computed(() => {
    const value = this.count();
    if (value === 0) return 'Zero';
    if (value > 0) return 'Positivo';
    return 'Negativo';
  });
  
  increment() {
    this.count.update(value => value + 1);
  }
  
  decrement() {
    this.count.update(value => value - 1);
  }
  
  reset() {
    this.count.set(0);
  }
}
\`\`\`

## Performance Benchmarks

Nossos testes mostram melhorias impressionantes:

| Métrica | Zone.js | Zoneless | Melhoria |
|---------|---------|----------|----------|
| First Contentful Paint | 1.2s | 0.8s | **33%** |
| Bundle Size | 45KB | 32KB | **29%** |
| Memory Usage | 12MB | 8MB | **33%** |

## Migração Gradual

> **Dica**: A migração pode ser feita progressivamente, componente por componente.

### Exemplo de migração:

\`\`\`typescript
// Antes (com Zone.js)
export class PostComponent {
  posts: Post[] = [];
  loading = false;
  
  async loadPosts() {
    this.loading = true;
    this.posts = await this.api.getPosts();
    this.loading = false; // Zone.js detecta automaticamente
  }
}

// Depois (zoneless)
export class PostComponent {
  posts = signal<Post[]>([]);
  loading = signal(false);
  
  async loadPosts() {
    this.loading.set(true);
    const data = await this.api.getPosts();
    this.posts.set(data);
    this.loading.set(false); // Mudança explícita via signal
  }
}
\`\`\`

## Conclusão

O zoneless change detection representa o **futuro do Angular** - mais rápido, mais previsível e mais eficiente. É hora de abraçar esta revolução!

---

*Tem dúvidas sobre a migração? Compartilhe nos comentários!*`,
        author,
        publishedAt: '2025-10-12T10:00:00Z',
        tags: ['Angular', 'Performance', 'Signals', 'Zoneless'],
        category: categories[0],
        readTime: 8,
        featured: true,
        coverImage: '/images/angular-cover.svg',
        metaDescription:
          'Aprenda sobre zoneless change detection no Angular e como usar signals para melhorar a performance da sua aplicação.',
      },
      {
        id: 2,
        title: 'SSR com Angular Universal: Guia Completo',
        slug: 'ssr-com-angular-universal',
        excerpt:
          'Aprenda a implementar Server-Side Rendering para melhorar a performance e SEO do seu aplicativo Angular com este guia completo.',
        content: `# SSR com Angular Universal: Guia Completo

Server-Side Rendering (SSR) é uma técnica essencial para melhorar a performance e SEO de aplicações Angular. Neste artigo, vamos explorar como implementar SSR usando Angular Universal.

## Por que usar SSR?

- **SEO**: Melhor indexação pelos motores de busca
- **Performance**: Carregamento inicial mais rápido
- **UX**: Melhor experiência do usuário
- **Core Web Vitals**: Melhores métricas de performance

## Implementação

O Angular CLI facilita a configuração do SSR:

\`\`\`bash
ng add @angular/ssr
\`\`\`

## Configuração

Após instalar, você terá novos arquivos de configuração para o servidor e novas opções de build.

## Melhores Práticas

1. Use \`NgOptimizedImage\` para imagens
2. Implemente lazy loading
3. Configure corretamente os meta tags
4. Use prerendering quando possível

## Conclusão

SSR é fundamental para aplicações Angular modernas que precisam de boa performance e SEO.`,
        author,
        publishedAt: '2025-10-10T14:30:00Z',
        tags: ['Angular', 'SSR', 'Performance', 'SEO'],
        category: categories[0],
        readTime: 12,
        featured: true,
        coverImage: '/images/ssr-cover.svg',
        metaDescription:
          'Guia completo sobre Server-Side Rendering com Angular Universal para melhorar performance e SEO.',
      },
      {
        id: 3,
        title: 'Tailwind CSS v4: O que há de novo',
        slug: 'tailwind-css-v4-novidades',
        excerpt:
          'Explore as novidades do Tailwind CSS v4 e como usar a nova sintaxe @use para importações e as melhorias de performance.',
        content: `# Tailwind CSS v4: O que há de novo

O Tailwind CSS v4 trouxe mudanças significativas na arquitetura e sintaxe. Vamos explorar as principais novidades.

## Nova Sintaxe de Importação

A maior mudança é a nova sintaxe para importar o Tailwind:

\`\`\`scss
// Antes (v3)
@tailwind base;
@tailwind components;
@tailwind utilities;

// Agora (v4)
@use "tailwindcss";
\`\`\`

## Melhorias de Performance

- Engine reescrita em Rust
- Compilação mais rápida
- Menor uso de memória
- Better tree-shaking

## Novas Features

- Melhor suporte para CSS Grid
- Novas utilities para container queries
- Sistema de cores aprimorado
- Melhor integração com PostCSS

## Como Migrar

A migração é relativamente simples, mas requer atenção aos breaking changes.

## Conclusão

O Tailwind CSS v4 representa um grande salto em performance e desenvolver experience.`,
        author,
        publishedAt: '2025-10-08T09:15:00Z',
        tags: ['CSS', 'Tailwind', 'Performance', 'Web Development'],
        category: categories[2],
        readTime: 6,
        featured: true,
        coverImage: '/images/tailwind-v4-cover.svg',
        metaDescription:
          'Descubra as novidades do Tailwind CSS v4, incluindo nova sintaxe e melhorias de performance.',
      },
      {
        id: 4,
        title: 'TypeScript 5.5: Novas Features e Melhorias',
        slug: 'typescript-5-5-novas-features',
        excerpt:
          'Explore as novas features do TypeScript 5.5, incluindo melhorias no sistema de tipos e novas utilities para desenvolvimento mais eficiente.',
        content: `# TypeScript 5.5: Novas Features e Melhorias

O TypeScript 5.5 trouxe várias melhorias importantes para o ecossistema de desenvolvimento JavaScript/TypeScript.

## Principais Novidades

### Inferred Type Predicates
Uma das features mais esperadas finalmente chegou!

\`\`\`typescript
function isString(value: unknown) {
  return typeof value === "string";
}

// Agora o TypeScript infere automaticamente que é um type predicate
// Equivalente a: (value: unknown) => value is string
\`\`\`

### Control Flow Narrowing
Melhorias significativas no narrowing de tipos em estruturas condicionais.

### JSDoc @import
Nova sintaxe para importar tipos em comentários JSDoc.

## Performance
- Compilação mais rápida
- Menor uso de memória
- Melhor cache de tipos

## Conclusão
O TypeScript continua evoluindo e oferecendo melhor experiência de desenvolvimento.`,
        author,
        publishedAt: '2025-10-05T16:20:00Z',
        tags: ['TypeScript', 'JavaScript', 'Programming', 'Types'],
        category: categories[1],
        readTime: 7,
        featured: false,
        metaDescription:
          'Conheça as novas features do TypeScript 5.5 e como elas podem melhorar seu desenvolvimento.',
      },
      {
        id: 5,
        title: 'Docker para Desenvolvedores Frontend',
        slug: 'docker-para-frontend',
        excerpt:
          'Aprenda como usar Docker para containerizar aplicações frontend e criar ambientes de desenvolvimento consistentes e reproduzíveis.',
        content: `# Docker para Desenvolvedores Frontend

Docker não é apenas para backend! Vamos explorar como usar containers para desenvolvimento frontend.

## Por que Docker para Frontend?

- **Consistência**: Mesmo ambiente para toda a equipe
- **Isolamento**: Evita conflitos de dependências
- **Deployment**: Facilita o deploy
- **Reprodutibilidade**: Ambientes idênticos

## Dockerizando uma Aplicação Angular

\`\`\`dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
\`\`\`

## Docker Compose para Desenvolvimento

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "4200:4200"
    volumes:
      - .:/app
      - /app/node_modules
\`\`\`

## Melhores Práticas

1. Use multi-stage builds
2. Otimize as layers
3. Use .dockerignore
4. Configure health checks

## Conclusão

Docker pode revolucionar seu workflow de desenvolvimento frontend.`,
        author,
        publishedAt: '2025-10-03T11:45:00Z',
        tags: ['Docker', 'DevOps', 'Frontend', 'Development'],
        category: categories[3],
        readTime: 10,
        featured: false,
        metaDescription:
          'Guia completo sobre como usar Docker para desenvolvimento de aplicações frontend.',
      },
    ];
  }
}
