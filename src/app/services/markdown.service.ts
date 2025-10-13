import { Injectable } from '@angular/core';
import { marked } from 'marked';

@Injectable({
  providedIn: 'root',
})
export class MarkdownService {
  constructor() {
    this.configureMarked();
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
      return this.addTailwindClasses(html);
    } catch (error) {
      console.error('Erro ao processar markdown:', error);
      return markdownContent; // Fallback para o conteúdo original
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

        // Código inline
        .replace(
          /<code>/g,
          '<code class="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">'
        )

        // Blocos de código
        .replace(
          /<pre><code>/g,
          '<div class="relative mb-6"><pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>'
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

        // Imagens
        .replace(
          /<img /g,
          '<img class="w-full h-auto rounded-lg shadow-md mb-6" '
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
