# CodeFlow Angular 🚀

> Blog moderno desenvolvido com Angular 20, Tailwind CSS v4 e Server-Side Rendering para compartilhar conhecimento sobre desenvolvimento frontend.

[![Angular](https://img.shields.io/badge/Angular-20.1-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## ✨ Features

- 🎯 **Angular 20** com Zoneless Change Detection
- ⚡ **Server-Side Rendering (SSR)** + Prerendering híbrido
- 🎨 **Tailwind CSS v4** com nova sintaxe `@use`
- � **Editor Markdown** com syntax highlighting (Prism.js)
- 🔍 **SEO Otimizado** com meta tags dinâmicas e Structured Data (JSON-LD)
- 📬 **Newsletter** integrada com EmailJS
- 🖼️ **Gerenciamento de Imagens** com upload e galeria
- � **HTTP Transfer Cache** para evitar duplicação de requisições
- 📱 **Design Responsivo** e acessível (WCAG)
- 🧪 **Type-Safe** com TypeScript strict mode

## 🏗️ Arquitetura

### Stack Tecnológico

```typescript
{
  "framework": "Angular 20.1",
  "language": "TypeScript 5.8",
  "styling": "Tailwind CSS 4.1",
  "ssr": "Angular SSR + Express.js",
  "state": "Signals (Zoneless)",
  "components": "Standalone Components"
}
```

### Estrutura do Projeto

```
src/app/
├── components/          # Componentes reutilizáveis
│   ├── footer/         # Rodapé global
│   ├── header/         # Cabeçalho com navegação
│   ├── layout/         # Layout wrapper
│   ├── newsletter/     # Forms de newsletter
│   ├── post-grid/      # Grid de posts
│   └── markdown-editor/ # Editor WYSIWYG
├── pages/              # Páginas do aplicativo
│   ├── home/          # Homepage
│   ├── posts/         # Listagem de posts
│   ├── post-detail/   # Detalhes do post
│   └── about/         # Página sobre
├── services/           # Serviços especializados
│   ├── post.service.ts            # Gerenciamento de posts
│   ├── seo.service.ts             # Meta tags e SEO
│   ├── markdown.service.ts        # Parse de markdown
│   ├── newsletter.service.ts      # EmailJS integration
│   ├── structured-data.service.ts # JSON-LD
│   └── image-upload.service.ts    # Upload de imagens
└── models/             # Interfaces TypeScript
    └── post.interface.ts
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 20+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/PabloFBDev/blog.git
cd blog

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Servidor de desenvolvimento
npm start

# Acesse http://localhost:4200
```

### Build de Produção

```bash
# Build completo com SSR
npm run build

# Servir build de produção
npm run serve:ssr:blog
```

### Testes

```bash
# Executar testes unitários
npm test

# Executar testes com coverage
npm test -- --code-coverage
```

## 📦 Scripts Disponíveis

| Script                   | Descrição                          |
| ------------------------ | ---------------------------------- |
| `npm start`              | Inicia servidor de desenvolvimento |
| `npm run build`          | Build de produção com SSR          |
| `npm run serve:ssr:blog` | Serve aplicação SSR em produção    |
| `npm test`               | Executa testes unitários com Karma |
| `npm run watch`          | Build em modo watch                |

## 🎯 Features Detalhadas

### Server-Side Rendering (SSR)

- **Prerendering** de rotas estáticas (`/`, `/posts`, `/about`)
- **SSR dinâmico** para posts individuais (`/posts/:slug`)
- **HTTP Transfer Cache** configurado para evitar requisições duplicadas
- **Event Replay** para capturar interações antes do JavaScript carregar

### SEO & Performance

- Meta tags dinâmicas (Open Graph, Twitter Cards)
- Structured Data (JSON-LD) para rich snippets
- URLs canônicas
- Sitemap automático
- Lazy loading de componentes
- Bundle otimizado com tree-shaking

### Sistema de Posts

- Markdown com syntax highlighting (Prism.js)
- Sistema de categorias e tags
- Posts em destaque
- Posts relacionados
- Tempo de leitura estimado
- Breadcrumbs para navegação

### Newsletter

- Integração com EmailJS
- Validação de email
- Confirmação de inscrição
- Tracking de origem (source tracking)
- GDPR compliant (consentimento)

## 🛠️ Configuração

### Variáveis de Ambiente

Configure as seguintes variáveis antes do deploy:

```typescript
// src/app/services/seo.service.ts
const baseUrl = "https://seu-dominio.com"; // Altere para seu domínio

// src/app/services/newsletter.service.ts
emailjs.init("YOUR_PUBLIC_KEY"); // Configure EmailJS
```

### EmailJS Setup

1. Crie uma conta em [EmailJS](https://www.emailjs.com/)
2. Configure um serviço de email
3. Crie um template
4. Atualize as credenciais no `newsletter.service.ts`

## 🌐 Deploy

### Plataformas Recomendadas

- **Vercel** - Deploy automático com SSR
- **Netlify** - Suporte a SSR com Netlify Edge Functions
- **Azure Static Web Apps** - Hosting gratuito com SSR
- **Railway** - Deploy containerizado

### Exemplo de Deploy (Vercel)

```bash
# Instale Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## � Tecnologias e Dependências

### Core

- **Angular 20.1** - Framework principal
- **TypeScript 5.8** - Superset tipado de JavaScript
- **RxJS 7.8** - Programação reativa

### Styling

- **Tailwind CSS 4.1** - Framework CSS utility-first
- **@tailwindcss/typography** - Estilos para conteúdo markdown

### SSR & Build

- **@angular/ssr** - Server-Side Rendering
- **Express.js 5.1** - Servidor Node.js
- **@angular/build** - Build system

### Content & Features

- **Marked 16.4** - Parser de markdown
- **Prism.js 1.30** - Syntax highlighting
- **@emailjs/browser** - Integração de email

### Dev Tools

- **Karma & Jasmine** - Framework de testes
- **Angular CLI** - Interface de linha de comando

## 👨‍💻 Autor

**Pablo Ferreira**

- Desenvolvedor Front-End Sênior
- 9+ anos de experiência em desenvolvimento frontend
- 12 anos de trajetória em tecnologia

[![GitHub](https://img.shields.io/badge/GitHub-PabloFBDev-181717?style=flat&logo=github)](https://github.com/PabloFBDev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-pabloferreirab-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/pabloferreirab)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## ⭐ Agradecimentos

- Angular Team pelo excelente framework
- Tailwind CSS pela produtividade em styling
- Comunidade open source por todas as bibliotecas utilizadas

---

<p align="center">
  Feito com ❤️ e <strong>Angular</strong> por Pablo Ferreira
</p>
