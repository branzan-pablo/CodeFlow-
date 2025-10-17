# SEO Dinâmico no CodeFlow Angular

## 📋 Visão Geral

Cada página do blog possui **meta tags dinâmicas** que são atualizadas automaticamente quando você navega entre as páginas. Isso melhora o SEO e a experiência de compartilhamento em redes sociais.

## 🎯 Como Funciona

### 1. **SeoService** (`src/app/services/seo.service.ts`)

Serviço central que gerencia todas as meta tags:

```typescript
this.seoService.setSeoData({
  title: 'Título da Página',
  description: 'Descrição que aparece no Google',
  keywords: ['palavra1', 'palavra2', 'palavra3'],
  type: 'website',
  url: 'https://seu-dominio.com/pagina',
  imageUrl: '/assets/imagem.jpg', // Opcional
  noIndex: false, // true para não indexar no Google
});
```

### 2. **Tags Atualizadas Automaticamente**

O serviço atualiza:

- ✅ `<title>` - Título da aba do navegador
- ✅ `<meta name="description">` - Descrição no Google
- ✅ `<meta name="keywords">` - Palavras-chave (opcional)
- ✅ Open Graph (Facebook, LinkedIn, WhatsApp)
  - `og:title`
  - `og:description`
  - `og:image`
  - `og:url`
  - `og:type`
- ✅ Twitter Cards
  - `twitter:title`
  - `twitter:description`
  - `twitter:image`
  - `twitter:card`
- ✅ `<link rel="canonical">` - URL canônica
- ✅ `<meta name="robots">` - Controle de indexação

## 📄 Páginas Implementadas

### Home (`/`)
- **Título:** CodeFlow Angular
- **Descrição:** Blog moderno sobre Angular 20 e TypeScript
- **Keywords:** Angular, TypeScript, blog, desenvolvimento web

### Posts (`/posts`)
- **Título:** Todos os Posts | CodeFlow Angular
- **Descrição:** Explore todos os artigos sobre Angular e desenvolvimento web
- **Keywords:** posts, artigos, Angular, tutoriais

### Post Detail (`/posts/:slug`)
- **Título Dinâmico:** [Título do Post] | CodeFlow Angular
- **Descrição Dinâmica:** Extrato do conteúdo do post
- **Keywords Dinâmicas:** Tags do post
- **Imagem:** Thumbnail do post (Open Graph)

### About (`/about`)
- **Título:** Sobre o Blog | CodeFlow Angular
- **Descrição:** Conheça o projeto, stack tecnológica e arquitetura
- **Keywords:** sobre, CodeFlow Angular, Angular 20, SSR

### Newsletter (`/newsletter`)
- **Título:** Newsletter | CodeFlow Angular
- **Descrição:** Inscreva-se e receba atualizações sobre Angular
- **Keywords:** newsletter, inscrição, e-mail, atualizações

### Privacy (`/privacy`)
- **Título:** Política de Privacidade | CodeFlow Angular
- **Descrição:** Política LGPD compliant, localStorage e EmailJS
- **Keywords:** privacidade, LGPD, proteção de dados

### Terms (`/terms`)
- **Título:** Termos de Uso | CodeFlow Angular
- **Descrição:** Regras de utilização e licença de conteúdo
- **Keywords:** termos de uso, licença, direitos autorais

### Editor (`/editor`)
- **Título:** Editor de Markdown | CodeFlow Angular
- **Descrição:** Editor avançado com syntax highlighting
- **Keywords:** editor markdown, syntax highlighting
- **noIndex:** `true` (não indexar no Google)

## 🔧 Como Implementar em Nova Página

### Passo 1: Import do SeoService

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  // ...
})
export class MinhaPageComponent implements OnInit {
  private readonly seoService = inject(SeoService);
  
  ngOnInit(): void {
    this.seoService.setSeoData({
      title: 'Minha Página',
      description: 'Descrição da minha página para SEO',
      keywords: ['palavra1', 'palavra2'],
      url: 'https://seu-dominio.com/minha-pagina',
    });
  }
}
```

## 🌐 Configuração de Produção

### Antes de Fazer Deploy:

1. **Atualizar domínio no SeoService** (`seo.service.ts`):
```typescript
// Linha ~108
return `https://SEU-DOMINIO-AQUI.com${imageUrl}`;
```

2. **Atualizar URLs em todas as páginas:**
   - Substituir `https://your-domain.com` pelo seu domínio real
   - Arquivos afetados:
     - `home.component.ts`
     - `about.component.ts`
     - `posts.component.ts`
     - `post-detail.component.ts`
     - `privacy.component.ts`
     - `terms.component.ts`
     - `newsletter-page.component.ts`
     - `editor-demo.component.ts`

3. **Adicionar imagem padrão para Open Graph:**
   - Criar imagem 1200x630px
   - Salvar em `public/og-image.jpg`
   - Adicionar nas páginas que não têm imagem específica

## 🧪 Testar SEO

### Ferramentas de Teste:

1. **Google Search Console**
   - Testar URL após deploy
   - Verificar rich snippets

2. **Open Graph Debuggers**
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

3. **Chrome DevTools**
   - Inspecionar `<head>` e verificar meta tags
   - Ver como são atualizadas ao navegar

## 📱 Preview em Redes Sociais

Quando você compartilhar um link do blog, as pessoas verão:

### Facebook/WhatsApp
- Imagem grande (og:image)
- Título em negrito (og:title)
- Descrição (og:description)

### Twitter
- Card com imagem (twitter:image)
- Título (twitter:title)
- Descrição (twitter:description)

### LinkedIn
- Mesmas tags Open Graph do Facebook

## 🎨 Benefícios

✅ **Melhor Ranqueamento no Google** - Meta descriptions e títulos otimizados
✅ **Rich Snippets** - Preview bonito em buscas
✅ **Compartilhamento Social** - Cards visuais ao compartilhar
✅ **User Experience** - Título da aba muda conforme navega
✅ **Analytics Melhores** - URLs canônicas evitam conteúdo duplicado

## 🔍 Exemplo Visual

Quando alguém buscar no Google:

```
[Título do Post] | CodeFlow Angular
↳ Descrição do post aparece aqui, dando contexto
  sobre o conteúdo e atraindo cliques...
```

Quando compartilhar no WhatsApp:

```
┌─────────────────────────────────┐
│   [Imagem do Post 1200x630]    │
├─────────────────────────────────┤
│ Título do Post                  │
│ Descrição que aparece...        │
│ codeflow-angular.com            │
└─────────────────────────────────┘
```

---

**Última atualização:** Janeiro 2025
**Versão Angular:** 20.0.0
