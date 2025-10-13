import { Injectable, signal } from '@angular/core';

export interface UploadedImage {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: Date;
  alt?: string;
  caption?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private readonly _images = signal<UploadedImage[]>(this.getMockImages());
  private readonly _uploading = signal(false);

  readonly images = this._images.asReadonly();
  readonly uploading = this._uploading.asReadonly();

  /**
   * Simula upload de imagem (em produção seria uma API)
   */
  async uploadImage(file: File): Promise<UploadedImage> {
    this._uploading.set(true);

    try {
      // Validação de arquivo
      if (!this.isValidImageFile(file)) {
        throw new Error(
          'Arquivo deve ser uma imagem válida (JPG, PNG, WebP, AVIF)'
        );
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        throw new Error('Arquivo muito grande. Máximo 5MB permitido.');
      }

      // Simular delay de upload
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Criar URL temporária para preview (em produção seria URL do servidor)
      const url = URL.createObjectURL(file);

      const uploadedImage: UploadedImage = {
        id: this.generateId(),
        name: file.name,
        url: `/images/uploads/${this.generateFileName(file)}`, // URL correta sem /public
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
        alt: this.generateAltText(file.name),
      };

      // Adicionar à lista de imagens
      this._images.update((images) => [uploadedImage, ...images]);

      return uploadedImage;
    } catch (error) {
      console.error('Erro no upload:', error);
      throw error;
    } finally {
      this._uploading.set(false);
    }
  }

  /**
   * Upload múltiplo de imagens
   */
  async uploadMultipleImages(files: FileList): Promise<UploadedImage[]> {
    const uploads: Promise<UploadedImage>[] = [];

    for (let i = 0; i < files.length; i++) {
      uploads.push(this.uploadImage(files[i]));
    }

    return Promise.all(uploads);
  }

  /**
   * Deletar imagem
   */
  deleteImage(imageId: string): void {
    this._images.update((images) => images.filter((img) => img.id !== imageId));
  }

  /**
   * Atualizar metadados da imagem
   */
  updateImageMetadata(
    imageId: string,
    updates: Partial<Pick<UploadedImage, 'alt' | 'caption'>>
  ): void {
    this._images.update((images) =>
      images.map((img) => (img.id === imageId ? { ...img, ...updates } : img))
    );
  }

  /**
   * Buscar imagens por nome
   */
  searchImages(query: string): UploadedImage[] {
    const searchTerm = query.toLowerCase();
    return this._images().filter(
      (img) =>
        img.name.toLowerCase().includes(searchTerm) ||
        img.alt?.toLowerCase().includes(searchTerm) ||
        img.caption?.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Obter imagem por ID
   */
  getImageById(imageId: string): UploadedImage | undefined {
    return this._images().find((img) => img.id === imageId);
  }

  /**
   * Gerar markdown para imagem
   */
  generateImageMarkdown(image: UploadedImage): string {
    const alt = image.alt || image.name;
    let markdown = `![${alt}](${image.url})`;

    if (image.caption) {
      markdown += `\n*${image.caption}*`;
    }

    return markdown;
  }

  // Métodos privados
  private isValidImageFile(file: File): boolean {
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/svg+xml',
    ];
    return validTypes.includes(file.type);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private generateFileName(file: File): string {
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const baseName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9]/g, '-')
      .toLowerCase();
    return `${baseName}-${timestamp}.${extension}`;
  }

  private generateAltText(fileName: string): string {
    return fileName
      .replace(/\.[^/.]+$/, '') // Remove extensão
      .replace(/[-_]/g, ' ') // Substitui traços e underscores por espaços
      .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitaliza primeira letra de cada palavra
  }

  // Mock data para desenvolvimento
  private getMockImages(): UploadedImage[] {
    return [];
  }
}
