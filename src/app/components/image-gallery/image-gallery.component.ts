import { Component, signal, computed, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ImageUploadService,
  UploadedImage,
} from '../../services/image-upload.service';

@Component({
  selector: 'app-image-gallery',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-semibold text-gray-900">Galeria de Imagens</h3>
        <button
          (click)="closeGallery()"
          class="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fechar galeria"
        >
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Upload Section -->
      <div
        class="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
      >
        <div class="text-center">
          <svg
            class="mx-auto h-12 w-12 text-gray-400 mb-3"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>

          @if (uploadService.uploading()) {
          <div class="flex items-center justify-center">
            <div
              class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
            ></div>
            <span class="ml-2 text-gray-600">Fazendo upload...</span>
          </div>
          } @else {
          <div>
            <label for="file-upload" class="cursor-pointer">
              <span class="mt-2 block text-sm font-medium text-gray-900">
                Clique para fazer upload ou arraste arquivos aqui
              </span>
              <span class="text-xs text-gray-500">PNG, JPG, WebP até 5MB</span>
            </label>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              class="sr-only"
              multiple
              accept="image/*"
              (change)="onFileSelected($event)"
            />
          </div>
          }
        </div>
      </div>

      <!-- Search -->
      <div class="mb-4">
        <div class="relative">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Buscar imagens..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      <!-- Images Grid -->
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto"
      >
        @for (image of filteredImages(); track image.id) {
        <div
          class="relative group cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200"
          [class.border-blue-500]="selectedImage() === image"
          [class.border-gray-200]="selectedImage() !== image"
          (click)="selectImage(image)"
        >
          <!-- Image -->
          <div
            class="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden"
          >
            <img
              [src]="image.url"
              [alt]="image.alt || image.name"
              class="w-full h-full object-cover"
              loading="lazy"
              (error)="onImageError(image)"
              (load)="onImageLoad(image)"
              style="background-color: transparent;"
            />
          </div>

          <!-- Delete button -->
          <button
            (click)="deleteImage(image, $event)"
            class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
            aria-label="Deletar imagem"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>

          <!-- Image Info -->
          <div
            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <p class="font-medium truncate">{{ image.name }}</p>
            <p class="text-gray-300">{{ formatFileSize(image.size) }}</p>
          </div>
        </div>
        } @empty {
        <div class="col-span-full text-center py-8 text-gray-500">
          @if (searchQuery()) { Nenhuma imagem encontrada para "{{
            searchQuery()
          }}" } @else { Nenhuma imagem disponível. Faça upload de algumas
          imagens! }
        </div>
        }
      </div>

      <!-- Selected Image Details -->
      @if (selectedImage(); as selected) {
      <div class="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 class="font-medium text-gray-900 mb-2">Imagem Selecionada</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Alt Text</label
            >
            <input
              type="text"
              [value]="selected.alt || ''"
              (input)="updateImageAlt(selected, $event)"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Texto alternativo para a imagem"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Legenda</label
            >
            <input
              type="text"
              [value]="selected.caption || ''"
              (input)="updateImageCaption(selected, $event)"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Legenda da imagem"
            />
          </div>
        </div>
      </div>
      }

      <!-- Actions -->
      <div
        class="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200"
      >
        <button
          (click)="closeGallery()"
          class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancelar
        </button>
        @if (selectedImage()) {
        <button
          (click)="insertImage()"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Inserir Imagem
        </button>
        }
      </div>
    </div>
  `,
  styleUrl: './image-gallery.component.scss',
})
export class ImageGalleryComponent {
  protected readonly uploadService = inject(ImageUploadService);

  // Signals
  private readonly _selectedImage = signal<UploadedImage | null>(null);
  protected readonly searchQuery = signal('');

  // Computed
  protected readonly selectedImage = this._selectedImage.asReadonly();
  protected readonly filteredImages = computed(() => {
    const query = this.searchQuery();
    if (!query) {
      return this.uploadService.images();
    }
    return this.uploadService.searchImages(query);
  });

  // Outputs
  imageSelected = output<UploadedImage>();
  galleryClose = output<void>();

  protected selectImage(image: UploadedImage): void {
    this._selectedImage.set(image);
  }

  protected async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    try {
      if (input.files.length === 1) {
        await this.uploadService.uploadImage(input.files[0]);
      } else {
        await this.uploadService.uploadMultipleImages(input.files);
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      // Em produção, mostrar toast de erro
      alert(error instanceof Error ? error.message : 'Erro no upload');
    }

    // Reset input
    input.value = '';
  }

  deleteImage(image: UploadedImage, event: Event): void {
    event.stopPropagation();

    if (confirm(`Tem certeza que deseja deletar "${image.name}"?`)) {
      this.uploadService.deleteImage(image.id);

      // Se era a imagem selecionada, limpar seleção
      if (this._selectedImage() === image) {
        this._selectedImage.set(null);
      }
    }
  }

  updateImageAlt(image: UploadedImage, event: Event): void {
    const alt = (event.target as HTMLInputElement).value;
    this.uploadService.updateImageMetadata(image.id, { alt });
  }

  updateImageCaption(image: UploadedImage, event: Event): void {
    const caption = (event.target as HTMLInputElement).value;
    this.uploadService.updateImageMetadata(image.id, { caption });
  }

  insertImage(): void {
    const selected = this._selectedImage();
    if (selected) {
      this.imageSelected.emit(selected);
    }
  }

  closeGallery(): void {
    this.galleryClose.emit();
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  // Debug methods
  onImageError(image: UploadedImage): void {
    console.error('Erro ao carregar imagem:', image.url, image);
  }

  onImageLoad(image: UploadedImage): void {
    console.log('Imagem carregada com sucesso:', image.url, image);
  }
}
