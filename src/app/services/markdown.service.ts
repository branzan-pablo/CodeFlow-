import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { marked } from 'marked';

@Injectable({
  providedIn: 'root',
})
export class MarkdownService {
  private platformId = inject(PLATFORM_ID);
  private prismLoaded = false;

  constructor() {
    this.configureMarked();
    this.loadPrism();
  }

  /**
   * Converte markdown para HTML seguro
   */
  parse(markdownContent: string): string {
    if (!markdownContent) {
      return '';
    }

    try {
      const html = marked(markdownContent) as string;
      // Adiciona classes CSS básicas ao HTML gerado
      const styledHtml = this.addTailwindClasses(html);

      // Aplica syntax highlighting se estiver no browser
      if (isPlatformBrowser(this.platformId) && this.prismLoaded) {
        this.highlightCode(styledHtml);
      }

      return styledHtml;
    } catch (error) {
      console.error('Erro ao processar markdown:', error);
      return markdownContent; // Fallback para o conteúdo original
    }
  }

  /**
   * Carrega Prism.js dinamicamente
   */
  private async loadPrism(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || this.prismLoaded) {
      return;
    }

    try {
      // Importação dinâmica para evitar problemas com SSR
      const Prism = await import('prismjs');

      // Carregar linguagens mais comuns usando require dinâmico
      // @ts-ignore - Prism components não têm tipos específicos
      await import('prismjs/components/prism-typescript.min.js');
      // @ts-ignore
      await import('prismjs/components/prism-javascript.min.js');
      // @ts-ignore
      await import('prismjs/components/prism-css.min.js');
      // @ts-ignore
      await import('prismjs/components/prism-scss.min.js');
      // @ts-ignore
      await import('prismjs/components/prism-json.min.js');
      // @ts-ignore
      await import('prismjs/components/prism-bash.min.js');

      this.prismLoaded = true;
      console.log('Prism.js carregado com sucesso');
    } catch (error) {
      console.warn('Falha ao carregar Prism.js:', error);
    }
  }

  /**
   * Aplica syntax highlighting usando Prism.js
   */
  private highlightCode(html: string): void {
    if (!isPlatformBrowser(this.platformId) || !this.prismLoaded) {
      return;
    }

    // Usar setTimeout para garantir que o DOM foi atualizado
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).Prism) {
        (window as any).Prism.highlightAll();
      }
    }, 100);
  }

  /**
   * Método público para highlight manual após inserção no DOM
   */
  highlightAllCode(): void {
    if (
      isPlatformBrowser(this.platformId) &&
      typeof window !== 'undefined' &&
      (window as any).Prism
    ) {
      (window as any).Prism.highlightAll();
    }
  }

  /**
   * Configura as opções do marked
   */
  private configureMarked(): void {
    marked.setOptions({
      gfm: true, // GitHub Flavored Markdown
      breaks: true, // Converte quebras de linha em <br>
      pedantic: false,
    });
  }

  /**
   * Adiciona classes Tailwind CSS ao HTML gerado
   */
  private addTailwindClasses(html: string): string {
    return (
      html
        // Headings
        .replace(
          /<h1>/g,
          '<h1 class="text-3xl font-bold mb-6 mt-8 text-gray-900">'
        )
        .replace(
          /<h2>/g,
          '<h2 class="text-2xl font-bold mb-4 mt-6 text-gray-900">'
        )
        .replace(
          /<h3>/g,
          '<h3 class="text-xl font-bold mb-3 mt-4 text-gray-900">'
        )
        .replace(
          /<h4>/g,
          '<h4 class="text-lg font-semibold mb-2 mt-3 text-gray-900">'
        )
        .replace(
          /<h5>/g,
          '<h5 class="text-base font-semibold mb-2 mt-2 text-gray-900">'
        )
        .replace(
          /<h6>/g,
          '<h6 class="text-sm font-semibold mb-2 mt-2 text-gray-900">'
        )

        // Parágrafos
        .replace(/<p>/g, '<p class="mb-4 text-gray-700 leading-relaxed">')

        // Links
        .replace(
          /<a /g,
          '<a class="text-blue-600 hover:text-blue-800 transition-colors underline" '
        )

        // Código inline (não deve ser processado pelo Prism)
        .replace(
          /<code>/g,
          '<code class="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">'
        )

        // Blocos de código com Prism.js
        .replace(
          /<pre><code class="language-(\w+)">/g,
          '<div class="relative mb-6"><pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto line-numbers"><code class="language-$1">'
        )
        .replace(
          /<pre><code>/g,
          '<div class="relative mb-6"><pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code class="language-plaintext">'
        )
        .replace(/<\/code><\/pre>/g, '</code></pre></div>')

        // Blockquotes
        .replace(
          /<blockquote>/g,
          '<blockquote class="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 text-gray-700 italic">'
        )

        // Listas
        .replace(
          /<ul>/g,
          '<ul class="list-disc list-inside mb-4 space-y-2 text-gray-700">'
        )
        .replace(
          /<ol>/g,
          '<ol class="list-decimal list-inside mb-4 space-y-2 text-gray-700">'
        )
        .replace(/<li>/g, '<li class="ml-2">')

        // Separadores
        .replace(/<hr>/g, '<hr class="my-8 border-gray-300">')

        // Imagens - preparado para NgOptimizedImage mas usando img tradicional no preview
        .replace(
          /<img ([^>]*?)src="([^"]*?)"([^>]*?)>/g,
          (match, beforeSrc, src, afterSrc) => {
            // Extrair alt text se existir
            const altMatch = match.match(/alt="([^"]*?)"/);
            const alt = altMatch ? altMatch[1] : '';

            // TODO: Implementar NgOptimizedImage quando renderizar em componentes
            // Por enquanto usando img tradicional para preview de markdown
            return `<img src="${src}" alt="${alt}" class="w-full h-auto rounded-lg shadow-md mb-6" loading="lazy" />`;
          }
        )
    );
  }

  /**
   * Extrai o primeiro parágrafo como excerpt
   */
  extractExcerpt(markdownContent: string, maxLength: number = 200): string {
    if (!markdownContent) {
      return '';
    }

    // Remove markdown formatting para o excerpt
    const plainText = markdownContent
      .replace(/#{1,6}\s+/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/`(.*?)`/g, '$1') // Remove code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, mantém texto
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
      .split('\n\n')[0] // Pega primeiro parágrafo
      .trim();

    if (plainText.length <= maxLength) {
      return plainText;
    }

    return plainText.substring(0, maxLength).trim() + '...';
  }

  /**
   * Calcula tempo estimado de leitura
   */
  calculateReadTime(
    markdownContent: string,
    wordsPerMinute: number = 200
  ): number {
    if (!markdownContent) {
      return 0;
    }

    // Remove markdown formatting para contagem de palavras
    const plainText = markdownContent
      .replace(/#{1,6}\s+/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '');

    const words = plainText.split(/\s+/).filter((word) => word.length > 0);
    const readTime = Math.ceil(words.length / wordsPerMinute);

    return readTime || 1; // Mínimo 1 minuto
  }
}
