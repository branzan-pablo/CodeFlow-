import { Component, signal, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownService } from '../../services/markdown.service';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-markdown-editor',
  imports: [CommonModule, FormsModule, ImageUploadComponent],
  template: `
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Toolbar -->
      <div class="border-b border-gray-200 px-4 py-3 bg-gray-50">
        <div class="flex items-center space-x-2 flex-wrap gap-2">
          <!-- Formatação básica -->
          <div
            class="flex items-center space-x-1 border-r border-gray-300 pr-2"
          >
            <button
              (click)="insertMarkdown('**', '**', 'texto em negrito')"
              class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Negrito (Ctrl+B)"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M3 5a1 1 0 011-1h5.5a2.5 2.5 0 010 5H6v2h4.5a2.5 2.5 0 010 5H4a1 1 0 01-1-1V5zM6 6v2h3.5a.5.5 0 000-1H6zm0 5v2h4.5a.5.5 0 000-1H6z"
                />
              </svg>
            </button>

            <button
              (click)="insertMarkdown('*', '*', 'texto em itálico')"
              class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Itálico (Ctrl+I)"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M8.5 3a.5.5 0 01.5.5V6h1.5a.5.5 0 010 1H9.5v6H11a.5.5 0 010 1H7a.5.5 0 010-1h1.5V7H7a.5.5 0 010-1h1.5V3.5a.5.5 0 01.5-.5z"
                />
              </svg>
            </button>

            <button
              (click)="insertMarkdown('~~', '~~', 'texto riscado')"
              class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Riscado"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M6 7H4a1 1 0 000 2h2v2a1 1 0 002 0V9h4v2a1 1 0 002 0V9h2a1 1 0 000-2h-2V5a1 1 0 00-2 0v2H8V5a1 1 0 00-2 0v2z"
                />
              </svg>
            </button>
          </div>

          <!-- Headers -->
          <div
            class="flex items-center space-x-1 border-r border-gray-300 pr-2"
          >
            <button
              (click)="insertHeader(1)"
              class="px-2 py-1 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Cabeçalho 1"
            >
              H1
            </button>
            <button
              (click)="insertHeader(2)"
              class="px-2 py-1 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Cabeçalho 2"
            >
              H2
            </button>
            <button
              (click)="insertHeader(3)"
              class="px-2 py-1 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Cabeçalho 3"
            >
              H3
            </button>
          </div>

          <!-- Listas -->
          <div
            class="flex items-center space-x-1 border-r border-gray-300 pr-2"
          >
            <button
              (click)="insertList('unordered')"
              class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Lista não ordenada"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                />
              </svg>
            </button>

            <button
              (click)="insertList('ordered')"
              class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Lista ordenada"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                />
              </svg>
            </button>
          </div>

          <!-- Links e código -->
          <div
            class="flex items-center space-x-1 border-r border-gray-300 pr-2"
          >
            <button
              (click)="insertLink()"
              class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Inserir link"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </button>

            <button
              (click)="insertCode()"
              class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Bloco de código"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <!-- Toggle preview -->
          <div class="flex items-center space-x-1">
            <button
              (click)="togglePreview()"
              class="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              [class.bg-blue-100]="showPreview()"
              [class.text-blue-600]="showPreview()"
            >
              @if (showPreview()) {
              <svg
                class="w-4 h-4 mr-1 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Editar } @else {
              <svg
                class="w-4 h-4 mr-1 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Preview }
            </button>
          </div>
        </div>
      </div>

      <!-- Content area -->
      <div
        class="flex"
        [class.h-[300px]]="!fullHeight()"
        [style.height.px]="fullHeight() || null"
      >
        <!-- Editor -->
        @if (!showPreview()) {
        <div class="flex-1 flex flex-col">
          <textarea
            #editor
            [(ngModel)]="content"
            (input)="onContentChange()"
            class="flex-1 p-4 border-none focus:outline-none resize-none font-mono text-sm leading-relaxed min-h-[300px]"
            placeholder="Digite seu markdown aqui...

# Exemplo de cabeçalho

Você pode usar **negrito**, *itálico*, [links](https://example.com) e muito mais!

\`\`\`typescript
// Blocos de código também são suportados
const example = 'Hello World';
\`\`\`

Use a toolbar acima para formatação rápida."
          ></textarea>

          <!-- Upload de imagens -->
          <div class="border-t border-gray-200 p-4 bg-gray-50">
            <app-image-upload (imageInserted)="insertImageMarkdown($event)" />
          </div>
        </div>
        }

        <!-- Preview -->
        @if (showPreview()) {
        <div class="flex-1 p-4 overflow-y-auto bg-white">
          @if (renderedContent(); as rendered) {
          <div class="prose prose-lg max-w-none" [innerHTML]="rendered"></div>
          } @else {
          <div class="text-gray-500 italic">Nada para mostrar ainda...</div>
          }
        </div>
        }
      </div>

      <!-- Footer com informações -->
      <div
        class="border-t border-gray-200 px-4 py-2 bg-gray-50 text-xs text-gray-500 flex justify-between items-center"
      >
        <div>
          Caracteres: {{ content().length }} | Linhas: {{ lineCount() }}
        </div>
        <div class="flex items-center space-x-4">
          <span>Markdown suportado</span>
          <span>•</span>
          <span>Syntax highlighting habilitado</span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* Editor styling */
      textarea {
        font-family: 'JetBrains Mono', 'Consolas', 'Monaco', 'Courier New',
          monospace;
        tab-size: 2;
      }

      textarea:focus {
        box-shadow: none;
        outline: none;
      }

      /* Toolbar styling */
      button:hover {
        transform: translateY(-1px);
      }

      /* Scrollbar styling */
      .overflow-y-auto::-webkit-scrollbar {
        width: 8px;
      }

      .overflow-y-auto::-webkit-scrollbar-track {
        background: #f1f5f9;
      }

      .overflow-y-auto::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 4px;
      }

      .overflow-y-auto::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
      }
    `,
  ],
})
export class MarkdownEditorComponent {
  private readonly markdownService = inject(MarkdownService);

  // Inputs
  initialContent = input<string>('');
  fullHeight = input<number | null>(null);

  // Outputs
  contentChange = output<string>();

  // Signals
  protected readonly content = signal('');
  protected readonly showPreview = signal(false);
  protected readonly renderedContent = signal<string | null>(null);

  // Computed
  protected readonly lineCount = signal(1);

  constructor() {
    // Initialize content
    this.content.set(this.initialContent());
    this.updateRenderedContent();
  }

  protected onContentChange(): void {
    this.updateLineCount();
    this.updateRenderedContent();
    this.contentChange.emit(this.content());
  }

  private updateLineCount(): void {
    const lines = this.content().split('\n').length;
    this.lineCount.set(lines);
  }

  private async updateRenderedContent(): Promise<void> {
    if (this.content().trim()) {
      try {
        const rendered = await this.markdownService.parse(this.content());
        this.renderedContent.set(rendered);
      } catch (error) {
        console.error('Erro ao renderizar markdown:', error);
        this.renderedContent.set(
          '<p class="text-red-500">Erro ao renderizar o conteúdo</p>'
        );
      }
    } else {
      this.renderedContent.set(null);
    }
  }

  protected togglePreview(): void {
    this.showPreview.update((current) => !current);
  }

  // Toolbar methods
  protected insertMarkdown(
    before: string,
    after: string,
    placeholder: string
  ): void {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = this.content().substring(start, end);
    const replacement = selectedText || placeholder;

    const newContent =
      this.content().substring(0, start) +
      before +
      replacement +
      after +
      this.content().substring(end);

    this.content.set(newContent);
    this.onContentChange();

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + replacement.length
      );
    });
  }

  protected insertHeader(level: number): void {
    const prefix = '#'.repeat(level) + ' ';
    this.insertAtCursor(prefix, 'Cabeçalho', true);
  }

  protected insertList(type: 'ordered' | 'unordered'): void {
    const prefix = type === 'ordered' ? '1. ' : '- ';
    this.insertAtCursor(prefix, 'Item da lista', true);
  }

  protected insertLink(): void {
    this.insertMarkdown('[', '](https://)', 'texto do link');
  }

  protected insertCode(): void {
    this.insertMarkdown('```\n', '\n```', 'código aqui');
  }

  protected insertImageMarkdown(markdown: string): void {
    this.insertAtCursor('', markdown, true);
  }

  private insertAtCursor(
    before: string,
    placeholder: string,
    newLine: boolean = false
  ): void {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const prefix =
      newLine && start > 0 && this.content()[start - 1] !== '\n' ? '\n' : '';
    const suffix = newLine ? '\n' : '';

    const newContent =
      this.content().substring(0, start) +
      prefix +
      before +
      placeholder +
      suffix +
      this.content().substring(start);

    this.content.set(newContent);
    this.onContentChange();

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      const newStart = start + prefix.length + before.length;
      textarea.setSelectionRange(newStart, newStart + placeholder.length);
    });
  }
}
