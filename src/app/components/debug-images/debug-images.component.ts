import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-debug-images',
  imports: [CommonModule],
  template: `
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">Debug de Imagens</h1>

      <div class="grid grid-cols-2 gap-4">
        <!-- Teste 1: Imagem Externa -->
        <div>
          <h2 class="font-semibold mb-2">1. Imagem Externa (Picsum)</h2>
          <img
            src="https://picsum.photos/200/200?random=1"
            alt="Teste externo"
            class="w-full border rounded"
            (load)="onLoad('external')"
            (error)="onError('external')"
          />
        </div>

        <!-- Teste 2: SVG Local -->
        <div>
          <h2 class="font-semibold mb-2">2. SVG Local</h2>
          <img
            src="/images/angular-logo.svg"
            alt="Angular Logo"
            class="w-full border rounded"
            (load)="onLoad('svg-local')"
            (error)="onError('svg-local')"
          />
        </div>

        <!-- Teste 3: SVG Inline -->
        <div>
          <h2 class="font-semibold mb-2">3. SVG Inline</h2>
          <svg class="w-full h-32 border rounded" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#ff6b6b" />
            <text
              x="50"
              y="55"
              text-anchor="middle"
              fill="white"
              font-size="12"
            >
              SVG
            </text>
          </svg>
        </div>

        <!-- Teste 4: PNG Local (se existir) -->
        <div>
          <h2 class="font-semibold mb-2">4. PNG Local</h2>
          <img
            src="/images/angular-logo.png"
            alt="Angular PNG"
            class="w-full border rounded"
            (load)="onLoad('png-local')"
            (error)="onError('png-local')"
          />
        </div>
      </div>

      <div class="mt-8">
        <h2 class="font-semibold mb-2">Logs:</h2>
        <div class="bg-gray-100 p-4 rounded text-sm">
          <div *ngFor="let log of logs">{{ log }}</div>
        </div>
      </div>
    </div>
  `,
})
export class DebugImagesComponent {
  logs: string[] = [];

  onLoad(type: string): void {
    const message = `✅ ${type} carregou com sucesso`;
    this.logs.push(message);
    console.log(message);
  }

  onError(type: string): void {
    const message = `❌ ${type} falhou ao carregar`;
    this.logs.push(message);
    console.error(message);
  }
}
