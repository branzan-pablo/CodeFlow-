import { Component, signal, inject, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ImageUploadService,
  UploadedImage,
} from '../../services/image-upload.service';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';

@Component({
  selector: 'app-image-upload',
  imports: [CommonModule, ImageGalleryComponent],
  template: `
    <!-- Modal overlay -->
    @if (showGallery()) {
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <app-image-gallery
        (imageSelected)="onImageSelected($event)"
        (galleryClose)="showGallery.set(false)"
      />
    </div>
    }

    <!-- Upload button/area -->
    <div class="space-y-4">
      <!-- Quick upload button -->
      <div class="flex items-center space-x-3">
        <button
          (click)="showGallery.set(true)"
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg
            class="w-5 h-5 mr-2"
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
          Galeria de Imagens
        </button>

        <span class="text-gray-400">ou</span>

        <label
          for="quick-upload"
          class="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
        >
          <svg
            class="w-5 h-5 mr-2"
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
          Upload Rápido
          <input
            id="quick-upload"
            type="file"
            class="sr-only"
            accept="image/*"
            multiple
            (change)="onQuickUpload($event)"
          />
        </label>
      </div>

      <!-- Upload progress -->
      @if (uploadService.uploading()) {
      <div class="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div class="flex items-center">
          <div
            class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"
          ></div>
          <div class="flex-1">
            <p class="text-sm font-medium text-blue-900">Fazendo upload...</p>
            <p class="text-xs text-blue-700">Por favor, aguarde</p>
          </div>
        </div>
      </div>
      }

      <!-- Recent uploads -->
      @if (recentImages().length > 0 && !uploadService.uploading()) {
      <div class="bg-gray-50 rounded-md p-4">
        <h4 class="text-sm font-medium text-gray-900 mb-3">Uploads Recentes</h4>
        <div class="overflow-x-auto pb-2">
          <div class="flex gap-2 w-max">
            @for (image of recentImages(); track image.id) {
            <button
              (click)="insertRecentImage(image)"
              class="group relative h-20 w-20 flex-shrink-0 bg-white rounded border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              [title]="image.name"
            >
              <img
                [src]="image.url"
                [alt]="image.alt || image.name"
                class="w-full h-full object-cover"
                loading="lazy"
                (error)="onImageError(image)"
                (load)="onImageLoad(image)"
              />
            </button>
            }
          </div>
        </div>
      </div>
      }

      <!-- Quick tips -->
      <div class="text-xs text-gray-500">
        <p>
          <strong>Dica:</strong> Use a galeria para organizar e editar metadados
          das imagens.
        </p>
        <p>
          <strong>Formatos:</strong> PNG, JPG, WebP •
          <strong>Tamanho máximo:</strong> 5MB
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      /* Animações suaves */
      button,
      label {
        transition: all 0.2s ease-in-out;
      }

      /* Efeitos hover melhorados */
      button:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      /* Grid responsivo para uploads recentes */
      @media (max-width: 640px) {
        .grid-cols-4 {
          grid-template-columns: repeat(3, 1fr);
        }
      }
    `,
  ],
})
export class ImageUploadComponent {
  protected readonly uploadService = inject(ImageUploadService);
  protected readonly showGallery = signal(false);

  // Outputs
  imageInserted = output<string>();

  // Computed - pega as 8 imagens mais recentes
  protected readonly recentImages = computed(() => {
    const allImages = this.uploadService.images();
    console.log('Todas as imagens:', allImages);
    const recent = allImages.slice(-8).reverse();
    console.log('Imagens recentes (8 últimas):', recent);
    return recent;
  });

  protected async onQuickUpload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    try {
      const files = Array.from(input.files);

      if (files.length === 1) {
        const uploadedImage = await this.uploadService.uploadImage(files[0]);
        // Auto-inserir se for upload único
        this.insertImage(uploadedImage);
      } else {
        await this.uploadService.uploadMultipleImages(input.files);
        // Abrir galeria para seleção múltipla
        this.showGallery.set(true);
      }
    } catch (error) {
      console.error('Erro no upload rápido:', error);
      alert(error instanceof Error ? error.message : 'Erro no upload');
    }

    // Reset input
    input.value = '';
  }

  protected onImageSelected(image: UploadedImage): void {
    this.insertImage(image);
    this.showGallery.set(false);
  }

  protected insertRecentImage(image: UploadedImage): void {
    this.insertImage(image);
  }

  private insertImage(image: UploadedImage): void {
    const markdown = this.uploadService.generateImageMarkdown(image);
    this.imageInserted.emit(markdown);
  }

  // Debug methods
  protected onImageError(image: UploadedImage): void {
    console.error('Erro ao carregar imagem recente:', image.url, image);
  }

  protected onImageLoad(image: UploadedImage): void {
    console.log('Imagem recente carregada com sucesso:', image.url, image);
  }
}
