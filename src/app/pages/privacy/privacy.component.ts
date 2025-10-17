import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-privacy',
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
          Política de Privacidade
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
              Política de privacidade para CodeFlow Angular
            </h2>
            <p class="text-responsive-sm text-gray-700 leading-relaxed mb-4">
              Todas as suas informações pessoais recolhidas serão usadas para
              ajudar a tornar a sua visita neste site o mais produtiva e
              agradável possível.
            </p>
            <p class="text-responsive-sm text-gray-700 leading-relaxed mb-4">
              A garantia da confidencialidade dos dados pessoais dos usuários
              deste site é importante para o CodeFlow Angular.
            </p>
            <p class="text-responsive-sm text-gray-700 leading-relaxed">
              Todas as informações pessoais relativas ao uso do CodeFlow Angular
              serão tratadas em concordância com a
              <strong
                >Lei Nº 13.709, de 14 de Agosto de 2018 (LGPD - Lei Geral de
                Proteção de Dados)</strong
              >.
            </p>
          </section>

          <!-- Informações Coletadas -->
          <section>
            <h3 class="text-responsive-xl font-semibold text-gray-900 mb-4">
              📋 Informações Coletadas
            </h3>
            <p class="text-responsive-sm text-gray-700 leading-relaxed mb-4">
              A informação pessoal recolhida pode incluir:
            </p>
            <ul
              class="list-disc list-inside text-responsive-sm text-gray-700 space-y-2 mb-4"
            >
              <li>
                Nome e endereço de e-mail (quando fornecidos voluntariamente
                através da newsletter)
              </li>
              <li>
                Endereço IP e informações básicas do navegador (logs de
                servidor)
              </li>
            </ul>
            <p class="text-responsive-sm text-gray-700 leading-relaxed">
              O uso do CodeFlow Angular pressupõe a aceitação deste acordo de
              privacidade. Reservamo-nos ao direito de alterar este acordo sem
              aviso prévio. Recomendamos que consulte esta política com
              regularidade.
            </p>
          </section>

          <!-- Armazenamento Local -->
          <section>
            <h3 class="text-responsive-xl font-semibold text-gray-900 mb-4">
              � Armazenamento Local
            </h3>
            <p class="text-responsive-sm text-gray-700 leading-relaxed mb-4">
              Este site utiliza <strong>localStorage</strong> do navegador
              exclusivamente para:
            </p>
            <ul
              class="list-disc list-inside text-responsive-sm text-gray-700 space-y-2 mb-4"
            >
              <li>
                Armazenar temporariamente a lista de inscritos da newsletter
                (apenas localmente, para gerenciamento)
              </li>
            </ul>
            <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <p class="text-responsive-sm text-blue-900">
                <strong>💡 Nota importante:</strong> Este site NÃO utiliza
                cookies, Google Analytics ou qualquer ferramenta de
                rastreamento. Seus dados de navegação não são monitorados.
              </p>
            </div>
          </section>

          <!-- Newsletter -->
          <section>
            <h3 class="text-responsive-xl font-semibold text-gray-900 mb-4">
              📧 Newsletter e E-mails
            </h3>
            <p class="text-responsive-sm text-gray-700 leading-relaxed mb-4">
              Ao se inscrever em nossa newsletter, você concorda em receber
              e-mails periódicos com:
            </p>
            <ul
              class="list-disc list-inside text-responsive-sm text-gray-700 space-y-2 mb-4"
            >
              <li>Novos posts e artigos do blog</li>
              <li>Atualizações sobre tecnologias Angular e TypeScript</li>
              <li>Dicas e recursos de desenvolvimento web</li>
            </ul>
            <p class="text-responsive-sm text-gray-700 leading-relaxed mb-4">
              <strong>Seus dados de e-mail:</strong>
            </p>
            <ul
              class="list-disc list-inside text-responsive-sm text-gray-700 space-y-2 mb-4"
            >
              <li>Nunca serão vendidos ou compartilhados com terceiros</li>
              <li>Serão utilizados exclusivamente para envio da newsletter</li>
              <li>
                Podem ser removidos a qualquer momento através do link de
                descadastro nos e-mails
              </li>
            </ul>
            <p class="text-responsive-sm text-gray-700 leading-relaxed">
              O serviço de newsletter é gerenciado através do
              <strong>EmailJS</strong>, que possui sua própria política de
              privacidade e proteção de dados.
            </p>
          </section>

          <!-- Links Externos -->
          <section>
            <h3 class="text-responsive-xl font-semibold text-gray-900 mb-4">
              🔗 Links para Sites de Terceiros
            </h3>
            <p class="text-responsive-sm text-gray-700 leading-relaxed mb-4">
              O CodeFlow Angular pode conter links para outros sites que podem
              conter informações úteis. Nossa política de privacidade não se
              aplica a sites de terceiros.
            </p>
            <p class="text-responsive-sm text-gray-700 leading-relaxed">
              Não nos responsabilizamos pela política de privacidade ou conteúdo
              presente em sites externos. Recomendamos que você leia a política
              de privacidade de cada site que visitar.
            </p>
          </section>

          <!-- Direitos do Usuário -->
          <section>
            <h3 class="text-responsive-xl font-semibold text-gray-900 mb-4">
              ⚖️ Seus Direitos (LGPD)
            </h3>
            <p class="text-responsive-sm text-gray-700 leading-relaxed mb-4">
              De acordo com a LGPD, você tem direito a:
            </p>
            <ul
              class="list-disc list-inside text-responsive-sm text-gray-700 space-y-2 mb-4"
            >
              <li>
                <strong>Confirmação</strong> da existência de tratamento dos
                seus dados
              </li>
              <li>
                <strong>Acesso</strong> aos dados pessoais que mantemos sobre
                você
              </li>
              <li>
                <strong>Correção</strong> de dados incompletos, inexatos ou
                desatualizados
              </li>
              <li>
                <strong>Anonimização, bloqueio ou eliminação</strong> de dados
                desnecessários
              </li>
              <li>
                <strong>Revogação do consentimento</strong> a qualquer momento
              </li>
              <li>
                <strong>Oposição</strong> ao tratamento realizado em
                desconformidade
              </li>
            </ul>
            <p class="text-responsive-sm text-gray-700 leading-relaxed">
              Para exercer qualquer um destes direitos, entre em contato através
              dos canais disponíveis no site.
            </p>
          </section>

          <!-- Segurança -->
          <section>
            <h3 class="text-responsive-xl font-semibold text-gray-900 mb-4">
              🔒 Segurança dos Dados
            </h3>
            <p class="text-responsive-sm text-gray-700 leading-relaxed mb-4">
              Adotamos medidas de segurança técnicas e organizacionais para
              proteger seus dados pessoais contra acesso não autorizado, perda,
              destruição ou alteração.
            </p>
            <ul
              class="list-disc list-inside text-responsive-sm text-gray-700 space-y-2"
            >
              <li>Conexão HTTPS em todas as páginas</li>
              <li>Armazenamento seguro de dados em servidores confiáveis</li>
              <li>Acesso restrito a informações pessoais</li>
              <li>Backups regulares dos dados</li>
            </ul>
          </section>

          <!-- Alterações -->
          <section>
            <h3 class="text-responsive-xl font-semibold text-gray-900 mb-4">
              📝 Alterações nesta Política
            </h3>
            <p class="text-responsive-sm text-gray-700 leading-relaxed">
              Esta política de privacidade pode ser atualizada periodicamente.
              Recomendamos que você revise esta página regularmente para se
              manter informado sobre como protegemos suas informações. A data da
              última atualização está indicada no topo desta página.
            </p>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class PrivacyComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setSeoData({
      title: 'Política de Privacidade',
      description:
        'Política de privacidade do CodeFlow Angular em conformidade com a LGPD. Saiba como tratamos seus dados pessoais, uso de localStorage e informações sobre newsletter via EmailJS.',
      keywords: [
        'privacidade',
        'LGPD',
        'proteção de dados',
        'política de privacidade',
        'dados pessoais',
        'CodeFlow Angular',
      ],
      type: 'website',
      url: 'https://your-domain.com/privacy',
    });
  }

  protected lastUpdate() {
    return new Date().toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
