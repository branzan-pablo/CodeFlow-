import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-terms',
  imports: [RouterLink],
  template: `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Header -->
      <div class="mb-8 sm:mb-12">
        <a
          routerLink="/"
          class="inline-flex items-center text-responsive-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar para Home
        </a>
        <h1 class="text-responsive-4xl font-bold text-gray-900 mb-4">
          Termos de Uso
        </h1>
        <p class="text-responsive-base text-gray-600">
          Última atualização: {{ lastUpdate() }}
        </p>
      </div>

      <!-- Content -->
      <div class="prose prose-lg max-w-none">
        <div class="bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-8">
          <!-- Introdução -->
          <section>
            <h2 class="text-responsive-2xl font-bold text-gray-900 mb-4">
              Termos de Uso do CodeFlow Angular
            </h2>
            <p class="text-responsive-sm text-gray-700 leading-relaxed mb-4">
              Bem-vindo ao CodeFlow Angular. Ao acessar e utilizar este site,
              você concorda em cumprir e estar vinculado aos seguintes termos e
              condições de uso.
            </p>
            <p class="text-responsive-sm text-gray-700 leading-relaxed">
              Se você não concordar com qualquer parte destes termos, por favor,
              não utilize nosso site.
            </p>
          </section>

          <!-- Licença de Uso -->
          <section>
            <h3 class="text-responsive-xl font-semibold text-gray-900 mb-4">
              📄 Licença de Uso
            </h3>
            <p class="text-responsive-sm text-gray-700 leading-relaxed mb-4">
              O conteúdo deste site, incluindo mas não se limitando a textos,
              gráficos, imagens, código-fonte e outros materiais, é fornecido
              para fins educacionais e informativos.
            </p>
            <p class="text-responsive-sm text-gray-700 leading-relaxed mb-4">
              <strong>Você pode:</strong>
            </p>
            <ul
              class="list-disc list-inside text-responsive-sm text-gray-700 space-y-2 mb-4"
            >
              <li>Ler, visualizar e navegar pelo conteúdo do site</li>
              <li>
                Compartilhar links para artigos e páginas nas redes sociais
              </li>
              <li>
                Utilizar trechos de código apresentados nos artigos (com
                atribuição)
              </li>
              <li>Aprender e se inspirar no conteúdo para seus projetos</li>
            </ul>
            <p class="text-responsive-sm text-gray-700 leading-relaxed mb-4">
              <strong>Você não pode:</strong>
            </p>
            <ul
              class="list-disc list-inside text-responsive-sm text-gray-700 space-y-2"
            >
              <li>
                Copiar ou reproduzir artigos completos sem autorização expressa
              </li>
              <li>Utilizar o conteúdo para fins comerciais sem permissão</li>
              <li>
                Remover atribuições de autoria ou informações de copyright
              </li>
              <li>Modificar ou criar trabalhos derivados sem consentimento</li>
            </ul>
          </section>

          <!-- Responsabilidade -->
          <section>
            <h3 class="text-responsive-xl font-semibold text-gray-900 mb-4">
              ⚠️ Isenção de Responsabilidade
            </h3>
            <p class="text-responsive-sm text-gray-700 leading-relaxed mb-4">
              O conteúdo fornecido neste site é apenas para fins informativos e
              educacionais. Embora nos esforcemos para garantir a precisão das
              informações:
            </p>
            <ul
              class="list-disc list-inside text-responsive-sm text-gray-700 space-y-2 mb-4"
            >
              <li>
                Não garantimos que o conteúdo esteja sempre atualizado ou livre
                de erros
              </li>
              <li>
                Não nos responsabilizamos por danos resultantes do uso das
                informações
              </li>
              <li>
                Exemplos de código são fornecidos "como estão", sem garantias
              </li>
              <li>
                Recomendamos sempre testar código em ambiente de desenvolvimento
              </li>
            </ul>
            <p class="text-responsive-sm text-gray-700 leading-relaxed">
              O uso de qualquer informação ou material neste site é por sua
              conta e risco, pelo qual não seremos responsáveis.
            </p>
          </section>

          <!-- Links Externos -->
          <section>
            <h3 class="text-responsive-xl font-semibold text-gray-900 mb-4">
              🔗 Links para Sites Externos
            </h3>
            <p class="text-responsive-sm text-gray-700 leading-relaxed mb-4">
              Este site pode conter links para sites externos que não são
              operados por nós. Não temos controle sobre o conteúdo e práticas
              desses sites e não podemos aceitar responsabilidade por suas
              respectivas políticas de privacidade.
            </p>
            <p class="text-responsive-sm text-gray-700 leading-relaxed">
              A inclusão de qualquer link não implica necessariamente uma
              recomendação ou endosso das visões expressas dentro deles.
            </p>
          </section>

          <!-- Modificações -->
          <section>
            <h3 class="text-responsive-xl font-semibold text-gray-900 mb-4">
              📝 Modificações dos Termos
            </h3>
            <p class="text-responsive-sm text-gray-700 leading-relaxed mb-4">
              Reservamo-nos o direito de revisar estes termos de uso a qualquer
              momento sem aviso prévio. Ao utilizar este site, você concorda em
              estar vinculado à versão atual destes termos.
            </p>
            <p class="text-responsive-sm text-gray-700 leading-relaxed">
              É sua responsabilidade verificar periodicamente estas páginas para
              se manter informado sobre quaisquer alterações.
            </p>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class TermsComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setSeoData({
      title: 'Termos de Uso',
      description:
        'Termos de uso do CodeFlow Angular. Conheça as regras de utilização, licença de conteúdo, uso de código-fonte e direitos autorais do blog.',
      keywords: [
        'termos de uso',
        'licença',
        'direitos autorais',
        'uso de conteúdo',
        'CodeFlow Angular',
        'regras',
      ],
      type: 'website',
      url: 'https://your-domain.com/terms',
    });
  }

  protected lastUpdate() {
    return new Date().toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  protected currentYear() {
    return new Date().getFullYear();
  }
}
