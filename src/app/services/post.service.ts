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
      bio: 'Desenvolvedor Front-End Sênior apaixonado por tecnologia e inovação.',
      avatar: '/images/avatar.svg',
      socialLinks: {
        github: 'https://github.com/PabloFerreiraB',
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
      {
        id: 7,
        title: 'RxJS Avançado: Dominando Operadores Complexos',
        slug: 'rxjs-avancado-operadores',
        excerpt:
          'Aprenda a usar operadores RxJS avançados como switchMap, mergeMap, concatMap e exhaustMap. Entenda quando e como aplicar cada um para criar aplicações reativas eficientes.',
        content: `# RxJS Avançado: Dominando Operadores Complexos

RxJS é uma biblioteca poderosa para programação reativa. Neste guia, vamos explorar operadores avançados que todo desenvolvedor Angular deve dominar.

## Operadores de Transformação

### switchMap vs mergeMap vs concatMap

\`\`\`typescript
// switchMap - cancela requisições anteriores
searchInput$.pipe(
  debounceTime(300),
  switchMap(term => this.api.search(term))
).subscribe(results => console.log(results));

// mergeMap - executa em paralelo
ids$.pipe(
  mergeMap(id => this.api.getDetails(id))
).subscribe(details => console.log(details));

// concatMap - executa em sequência
operations$.pipe(
  concatMap(op => this.processOperation(op))
).subscribe(result => console.log(result));
\`\`\`

## Error Handling

Use catchError e retry para lidar com erros:

\`\`\`typescript
this.http.get(url).pipe(
  retry(3),
  catchError(error => {
    console.error('Error:', error);
    return of(null);
  })
).subscribe();
\`\`\`

## Conclusão

Dominar RxJS é essencial para criar aplicações Angular profissionais.`,
        author,
        publishedAt: '2025-10-02T09:20:00Z',
        tags: ['RxJS', 'Angular', 'Reactive Programming', 'TypeScript'],
        category: categories[0],
        readTime: 12,
        featured: true,
        metaDescription:
          'Guia avançado de operadores RxJS com exemplos práticos em Angular.',
      },
      {
        id: 8,
        title: 'Testing em Angular: Jest vs Karma',
        slug: 'testing-angular-jest-karma',
        excerpt:
          'Compare Jest e Karma para testes em Angular. Descubra as vantagens de cada ferramenta, como configurar e migrar seus testes para obter melhor performance.',
        content: `# Testing em Angular: Jest vs Karma

Escolher a ferramenta de testes certa pode impactar significativamente a produtividade da equipe. Vamos comparar Jest e Karma.

## Jest - Vantagens

- ⚡ Execução paralela e mais rápida
- 📸 Snapshot testing integrado
- 🔍 Melhor experiência de debugging
- 🎯 Zero configuração

\`\`\`typescript
describe('MeuComponent', () => {
  it('should create', () => {
    const component = new MeuComponent();
    expect(component).toBeTruthy();
  });
  
  it('should render title', () => {
    const fixture = TestBed.createComponent(MeuComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1')?.textContent)
      .toContain('Welcome');
  });
});
\`\`\`

## Migrando de Karma para Jest

1. Instale as dependências
2. Configure jest.config.js
3. Atualize os scripts do package.json
4. Remova arquivos do Karma

## Conclusão

Jest oferece melhor DX e performance para projetos Angular modernos.`,
        author,
        publishedAt: '2025-10-01T14:30:00Z',
        tags: ['Testing', 'Jest', 'Karma', 'Angular', 'TDD'],
        category: categories[0],
        readTime: 8,
        featured: false,
        metaDescription:
          'Comparação completa entre Jest e Karma para testes em Angular.',
      },
      {
        id: 9,
        title: 'State Management: NgRx vs Signals',
        slug: 'state-management-ngrx-signals',
        excerpt:
          'Análise comparativa entre NgRx e Angular Signals para gerenciamento de estado. Entenda quando usar cada abordagem e como migrar de NgRx para signals.',
        content: `# State Management: NgRx vs Signals

O Angular Signals trouxe uma alternativa nativa ao NgRx. Vamos comparar as duas abordagens.

## NgRx - Store Tradicional

\`\`\`typescript
// State
export interface AppState {
  counter: number;
}

// Actions
export const increment = createAction('[Counter] Increment');

// Reducer
export const counterReducer = createReducer(
  initialState,
  on(increment, state => ({ ...state, counter: state.counter + 1 }))
);

// Component
this.store.dispatch(increment());
this.count$ = this.store.select(state => state.counter);
\`\`\`

## Angular Signals - Abordagem Moderna

\`\`\`typescript
// Service
@Injectable({ providedIn: 'root' })
export class CounterService {
  private count = signal(0);
  readonly counter = this.count.asReadonly();
  
  increment() {
    this.count.update(n => n + 1);
  }
}

// Component
constructor(private counterService: CounterService) {}
count = this.counterService.counter;
\`\`\`

## Quando usar cada um?

- **NgRx**: Apps grandes, time grande, histórico de ações
- **Signals**: Apps pequenos/médios, simplicidade, performance

## Conclusão

Signals são o futuro do state management em Angular!`,
        author,
        publishedAt: '2025-09-30T10:15:00Z',
        tags: ['State Management', 'NgRx', 'Signals', 'Angular'],
        category: categories[0],
        readTime: 11,
        featured: true,
        metaDescription:
          'Comparação entre NgRx e Angular Signals para gerenciamento de estado.',
      },
      {
        id: 10,
        title: 'TypeScript 5.5: Novidades e Recursos',
        slug: 'typescript-5-5-novidades',
        excerpt:
          'Explore as novidades do TypeScript 5.5: inferência de tipos melhorada, decorators estáveis, performance otimizada e novos utilitários de tipos.',
        content: `# TypeScript 5.5: Novidades e Recursos

O TypeScript 5.5 traz melhorias significativas. Vamos explorar as principais novidades.

## Inferência de Tipos Melhorada

\`\`\`typescript
// Antes: precisava especificar o tipo
const result: { name: string; age: number } = processUser(data);

// Agora: inferência automática mais inteligente
const result = processUser(data); // tipo inferido corretamente
\`\`\`

## Decorators Estáveis

\`\`\`typescript
function log(target: any, propertyKey: string) {
  console.log(\`Método \${propertyKey} foi chamado\`);
}

class UserService {
  @log
  getUser(id: number) {
    return this.http.get(\`/users/\${id}\`);
  }
}
\`\`\`

## Novos Utilitários de Tipos

\`\`\`typescript
// Awaited - extrai tipo de Promise
type Result = Awaited<Promise<string>>; // string

// Partial Deep
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
\`\`\`

## Performance

- Compilação 20% mais rápida
- Menor uso de memória
- Melhor suporte a monorepos

## Conclusão

TypeScript 5.5 é uma atualização essencial para desenvolvedores modernos.`,
        author,
        publishedAt: '2025-09-28T16:00:00Z',
        tags: ['TypeScript', 'JavaScript', 'Programming', 'Web Development'],
        category: categories[1],
        readTime: 9,
        featured: false,
        metaDescription: 'Descubra as novidades e recursos do TypeScript 5.5.',
      },
      {
        id: 11,
        title: 'Micro Frontends com Angular',
        slug: 'micro-frontends-angular',
        excerpt:
          'Aprenda a implementar arquitetura de micro frontends em Angular usando Module Federation. Divida sua aplicação em partes independentes e escaláveis.',
        content: `# Micro Frontends com Angular

Micro frontends permitem escalar aplicações grandes dividindo-as em partes menores e independentes.

## Module Federation

\`\`\`javascript
// webpack.config.js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './Component': './src/app/my-component/my-component.module.ts'
      },
      shared: ['@angular/core', '@angular/common']
    })
  ]
};
\`\`\`

## Arquitetura Shell + Remote

\`\`\`typescript
// Shell App - carrega remotes
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => 
      loadRemoteModule('dashboard', './Module')
  }
];
\`\`\`

## Vantagens

- 🚀 Deploy independente
- 👥 Times autônomos
- 🔄 Atualizações isoladas
- 📦 Reuso de código

## Desafios

- Complexidade de setup
- Comunicação entre apps
- Versionamento de dependências
- Performance inicial

## Conclusão

Micro frontends são ideais para aplicações enterprise de grande escala.`,
        author,
        publishedAt: '2025-09-25T11:30:00Z',
        tags: [
          'Micro Frontends',
          'Angular',
          'Architecture',
          'Module Federation',
        ],
        category: categories[2],
        readTime: 14,
        featured: true,
        metaDescription:
          'Guia completo de implementação de micro frontends em Angular.',
      },
      {
        id: 12,
        title: 'CI/CD para Angular com GitHub Actions',
        slug: 'cicd-angular-github-actions',
        excerpt:
          'Configure pipelines de CI/CD completos para projetos Angular usando GitHub Actions. Automação de testes, build, deploy e análise de qualidade.',
        content: `# CI/CD para Angular com GitHub Actions

Automatize todo o ciclo de desenvolvimento do seu projeto Angular com GitHub Actions.

## Workflow Básico

\`\`\`yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --watch=false --browsers=ChromeHeadless
      
      - name: Build
        run: npm run build --prod
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
\`\`\`

## Testes e Qualidade

\`\`\`yaml
- name: Run linter
  run: npm run lint

- name: Check code coverage
  run: npm run test:coverage

- name: SonarQube Scan
  uses: sonarsource/sonarqube-scan-action@master
\`\`\`

## Cache e Performance

Use cache para acelerar builds:

\`\`\`yaml
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
\`\`\`

## Conclusão

GitHub Actions oferece CI/CD poderoso e gratuito para projetos open source.`,
        author,
        publishedAt: '2025-09-22T13:45:00Z',
        tags: ['CI/CD', 'GitHub Actions', 'DevOps', 'Angular', 'Automation'],
        category: categories[3],
        readTime: 10,
        featured: false,
        metaDescription:
          'Configure pipelines CI/CD completos para Angular com GitHub Actions.',
      },
      {
        id: 13,
        title: 'Web Performance: Core Web Vitals',
        slug: 'web-performance-core-web-vitals',
        excerpt:
          'Otimize seus Core Web Vitals (LCP, FID, CLS) em aplicações Angular. Técnicas práticas para melhorar performance e SEO do seu site.',
        content: `# Web Performance: Core Web Vitals

Core Web Vitals são métricas essenciais para SEO e UX. Vamos otimizá-las em Angular.

## LCP - Largest Contentful Paint

Melhore o tempo de carregamento do maior elemento:

\`\`\`typescript
// Preload imagens críticas
<link rel="preload" as="image" href="hero.jpg">

// Use NgOptimizedImage
<img ngSrc="hero.jpg" 
     width="1200" 
     height="600" 
     priority>
\`\`\`

## FID - First Input Delay

Reduza o bloqueio da thread principal:

\`\`\`typescript
// Lazy loading de componentes
const routes: Routes = [
  {
    path: 'heavy',
    loadComponent: () => import('./heavy/heavy.component')
  }
];

// Use defer para carregar sob demanda
@defer (on viewport) {
  <app-heavy-component />
} @placeholder {
  <app-skeleton />
}
\`\`\`

## CLS - Cumulative Layout Shift

Evite mudanças inesperadas no layout:

\`\`\`css
/* Reserve espaço para imagens */
img {
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
}

/* Evite carregamento de fonts que causam shift */
@font-face {
  font-family: 'MyFont';
  font-display: swap;
}
\`\`\`

## Ferramentas de Análise

- Lighthouse
- PageSpeed Insights
- Web Vitals Extension
- Chrome DevTools

## Conclusão

Otimizar Core Web Vitals melhora SEO, conversões e experiência do usuário.`,
        author,
        publishedAt: '2025-09-20T08:00:00Z',
        tags: ['Performance', 'Web Vitals', 'SEO', 'Angular', 'Optimization'],
        category: categories[2],
        readTime: 13,
        featured: true,
        metaDescription:
          'Guia completo para otimizar Core Web Vitals em aplicações Angular.',
      },
    ];
  }
}
