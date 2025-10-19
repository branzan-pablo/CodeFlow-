import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownEditorComponent } from '../../components/markdown-editor/markdown-editor.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-editor-demo',
  imports: [CommonModule, MarkdownEditorComponent],
  template: `
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="container-header">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Editor de Markdown
          </h1>
          <p class="text-gray-600">
            Editor completo com syntax highlighting, upload de imagens e
            otimização automática.
          </p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="bg-white rounded-lg p-6 shadow">
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-2xl font-semibold text-gray-900">
                  {{ imageCount() }}
                </p>
                <p class="text-gray-600">Imagens</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow">
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <svg
                  class="w-6 h-6"
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
              </div>
              <div>
                <p class="text-2xl font-semibold text-gray-900">
                  {{ wordCount() }}
                </p>
                <p class="text-gray-600">Palavras</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow">
            <div class="flex items-center">
              <div class="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <p class="text-2xl font-semibold text-gray-900">
                  {{ charCount() }}
                </p>
                <p class="text-gray-600">Caracteres</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-lg p-6 shadow">
            <div class="text-blue-600 mb-4">
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Syntax Highlighting
            </h3>
            <p class="text-gray-600">
              Destaque de sintaxe automático para mais de 200 linguagens com
              Prism.js.
            </p>
          </div>

          <div class="bg-white rounded-lg p-6 shadow">
            <div class="text-green-600 mb-4">
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              NgOptimizedImage
            </h3>
            <p class="text-gray-600">
              Otimização automática de imagens com lazy loading e WebP.
            </p>
          </div>

          <div class="bg-white rounded-lg p-6 shadow">
            <div class="text-purple-600 mb-4">
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              Upload Inteligente
            </h3>
            <p class="text-gray-600">
              Sistema completo de upload com validação, metadata e galeria.
            </p>
          </div>
        </div>

        <!-- Editor -->
        <div class="bg-white rounded-lg shadow-lg">
          <app-markdown-editor
            [initialContent]="initialContent"
            [fullHeight]="600"
            (contentChange)="onContentChange($event)"
          />
        </div>

        <!-- Example content -->
        <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-blue-900 mb-3">
            💡 Dicas de Uso
          </h3>
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800"
          >
            <div>
              <h4 class="font-medium mb-2">Formatação:</h4>
              <ul class="space-y-1">
                <li><code>**negrito**</code> para <strong>negrito</strong></li>
                <li><code>*itálico*</code> para <em>itálico</em></li>
                <li><code># Cabeçalho</code> para títulos</li>
                <li><code>- Lista</code> para listas</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium mb-2">Funcionalidades:</h4>
              <ul class="space-y-1">
                <li>🖼️ Upload com drag & drop</li>
                <li>🎨 Preview em tempo real</li>
                <li>💾 Auto-salvamento local</li>
                <li>📱 Interface responsiva</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* Animações suaves */
      .grid > div {
        transition: transform 0.2s ease-in-out;
      }

      .grid > div:hover {
        transform: translateY(-2px);
      }

      /* Códigos inline */
      code {
        background-color: #f1f5f9;
        padding: 0.125rem 0.25rem;
        border-radius: 0.25rem;
        font-family: 'JetBrains Mono', 'Consolas', monospace;
        font-size: 0.875em;
      }
    `,
  ],
})
export class EditorDemoComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  protected readonly content = signal('');

  // Conteúdo inicial de exemplo
  protected readonly initialContent = `# Bem-vindo ao Editor de Markdown Avançado! 🚀

Este é um editor completo com todas as funcionalidades modernas para criação de conteúdo.

## ✨ Funcionalidades

### 🎨 Syntax Highlighting
\`\`\`typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-example',
  template: \`<h1>Hello Angular!</h1>\`
})
export class ExampleComponent {
  readonly message = signal('Olá mundo!');
}
\`\`\`

### 📝 Formatação Rica
- **Texto em negrito** e *itálico*
- ~~Texto riscado~~ 
- \`código inline\`
- [Links para qualquer lugar](https://angular.dev)

### 📊 Listas e Tabelas

| Funcionalidade | Status | Descrição |
|---------------|--------|-----------|
| Syntax Highlighting | ✅ | Prism.js integrado |
| Upload de Imagens | ✅ | NgOptimizedImage |
| Preview | ✅ | Tempo real |

### 🖼️ Imagens Otimizadas
Use o botão "Galeria de Imagens" na toolbar para adicionar imagens com otimização automática!

## 🚀 Começe a escrever!

Este editor suporta todo o Markdown padrão plus extensões modernas. Use a toolbar acima para formatação rápida ou digite diretamente em Markdown.

### Dica Pro
Pressione o botão "Preview" para ver como seu conteúdo ficará renderizado!
`;

  // Computed properties para estatísticas
  protected readonly wordCount = signal(0);
  protected readonly charCount = signal(0);
  protected readonly imageCount = signal(0);

  constructor() {
    this.content.set(this.initialContent);
    this.updateStats();
  }

  ngOnInit(): void {
    this.seoService.setSeoData({
      title: 'Editor de Markdown',
      description:
        'Experimente nosso editor de Markdown avançado com syntax highlighting, upload de imagens e preview em tempo real. Ideal para criar conteúdo técnico.',
      keywords: [
        'editor markdown',
        'markdown',
        'editor',
        'syntax highlighting',
        'upload imagens',
        'preview',
        'Prism.js',
      ],
      type: 'website',
      url: 'https://your-domain.com/editor',
      noIndex: true, // Página de demo não precisa ser indexada
    });
  }

  protected onContentChange(newContent: string): void {
    this.content.set(newContent);
    this.updateStats();
  }

  private updateStats(): void {
    const content = this.content();

    // Contagem de palavras
    const words = content
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    this.wordCount.set(words.length);

    // Contagem de caracteres
    this.charCount.set(content.length);

    // Contagem de imagens (markdown image syntax)
    const imageMatches = content.match(/!\[.*?\]\(.*?\)/g);
    this.imageCount.set(imageMatches ? imageMatches.length : 0);
  }
}
