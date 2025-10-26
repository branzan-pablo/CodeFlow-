# Configuração do Decap CMS no Blog Angular

Este documento explica como configurar e usar o Decap CMS (antigo Netlify CMS) para gerenciar o conteúdo do blog.

## 📋 O que é o Decap CMS?

Decap CMS é um sistema de gerenciamento de conteúdo (CMS) de código aberto e baseado em Git que permite:

- ✅ Escrever posts através de uma interface web amigável
- ✅ Não precisa rodar o projeto localmente para criar conteúdo
- ✅ Todo conteúdo fica versionado no GitHub
- ✅ Workflow editorial: rascunho → revisão → publicação
- ✅ Upload de imagens integrado
- ✅ Editor Markdown visual
- ✅ 100% gratuito e open source

## 🏗️ Arquitetura Implementada

```
blog/
├── public/
│   └── admin/
│       ├── index.html      # Interface do CMS
│       └── config.yml      # Configuração do CMS
└── src/
    └── content/
        └── posts/          # Posts em Markdown
            └── *.md        # Arquivos dos posts
```

## 🔧 Passos de Configuração

### 1. Habilitar Git Gateway no Netlify (MAIS FÁCIL) ✅ RECOMENDADO

**Vantagens**: Configuração mais simples, não precisa criar OAuth App no GitHub.

1. **Deploy o blog no Netlify**:

   ```bash
   # Se ainda não fez deploy
   netlify deploy --prod
   ```

2. **Habilitar Identity no Netlify**:

   - Acesse o painel do Netlify
   - Vá em **Site settings** → **Identity**
   - Clique em **Enable Identity**

3. **Habilitar Git Gateway**:

   - Ainda em **Identity**, vá em **Services** → **Git Gateway**
   - Clique em **Enable Git Gateway**
   - Escolha o repositório do GitHub

4. **Convidar você mesmo**:

   - Vá em **Identity** → **Invite users**
   - Digite seu email
   - Você receberá um convite por email
   - Aceite o convite e crie uma senha

5. **Pronto!** Acesse `https://seu-site.netlify.app/admin`

### 2. Autenticação Direta com GitHub (ALTERNATIVA)

**Vantagens**: Não depende do Netlify, funciona em qualquer hosting.

#### 2.1. Criar GitHub OAuth App

1. Acesse **GitHub** → **Settings** → **Developer settings** → **OAuth Apps**
2. Clique em **New OAuth App**
3. Preencha:
   - **Application name**: `Blog CMS`
   - **Homepage URL**: `https://seu-site.com`
   - **Authorization callback URL**: `https://seu-site.com/admin/`
4. Clique em **Register application**
5. Anote o **Client ID** e gere um **Client Secret**

#### 2.2. Configurar Backend de Autenticação

**Opção A: Usar Netlify Functions** (se hospedar no Netlify):

```bash
npm install netlify-cms-oauth-provider-node --save-dev
```

Crie `netlify/functions/oauth.js`:

```javascript
const NetlifyCmsOAuthProvider = require("netlify-cms-oauth-provider-node");

exports.handler = NetlifyCmsOAuthProvider.handler({
  OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
});
```

**Opção B: Usar Vercel (se hospedar no Vercel)**:

```bash
npm install @openlab/vercel-netlify-cms-github
```

Crie `pages/api/auth.js` e `pages/api/callback.js` seguindo a documentação.

#### 2.3. Adicionar Variáveis de Ambiente

No Netlify ou Vercel:

```
OAUTH_CLIENT_ID=seu_client_id
OAUTH_CLIENT_SECRET=seu_client_secret
```

#### 2.4. Atualizar config.yml

Altere o backend em `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: seu-usuario/seu-repositorio
  branch: main
```

## 📝 Como Usar o CMS

### Acessar o CMS

1. Vá para `https://seu-site.com/admin`
2. Faça login (Git Gateway ou GitHub)
3. Você verá a interface do CMS

### Criar um Novo Post

1. Clique em **"Novo Post"**
2. Preencha os campos:

   - **Título**: Nome do post
   - **Slug**: URL amigável (ex: `meu-primeiro-post`)
   - **Resumo**: Descrição curta
   - **Conteúdo**: Use o editor Markdown
   - **Categoria**: Escolha uma categoria
   - **Tags**: Adicione tags relevantes
   - **Imagem Destacada**: Upload opcional
   - **Data de Publicação**: Quando publicar
   - **Autor**: Suas informações

3. **Salvar como rascunho**: Clique em **"Save"**

   - O post fica em **Draft** (rascunho)
   - Ainda não está publicado

4. **Publicar**:
   - Mova para **"In Review"** (em revisão)
   - Quando pronto, mova para **"Ready"**
   - Clique em **"Publish"**
   - O CMS fará um commit no GitHub

### Editar um Post Existente

1. Na lista de posts, clique no post desejado
2. Faça as alterações
3. Salve
4. O CMS criará um commit com as mudanças

### Upload de Imagens

1. No campo **"Imagem Destacada"** ou no editor de conteúdo
2. Clique no botão de upload
3. Escolha a imagem
4. A imagem será salva em `public/assets/images/uploads/`

## 🔄 Workflow Editorial

O Decap CMS suporta três estados:

```
Draft (Rascunho)
    ↓
In Review (Em Revisão)
    ↓
Ready (Pronto)
    ↓
Publish (Publicado)
```

- **Draft**: Trabalhando no post, não visível
- **In Review**: Pronto para revisão
- **Ready**: Aprovado, pronto para publicar
- **Publish**: Cria um commit e publica no blog

## 🚀 Próximos Passos

### 1. Implementar Carregador de Posts

Atualmente os posts estão em `PostService.getMockPosts()`. Você precisa:

1. **Criar um serviço de carregamento de Markdown**:

   ```typescript
   // src/app/core/services/content-loader.service.ts
   import { Injectable } from "@angular/core";
   import { Post } from "../models/post.model";

   @Injectable({
     providedIn: "root",
   })
   export class ContentLoaderService {
     async loadPosts(): Promise<Post[]> {
       // Importar arquivos .md da pasta content/posts
       // Fazer parse do frontmatter
       // Retornar array de Posts
     }
   }
   ```

2. **Usar no PostService**:

   ```typescript
   constructor(private contentLoader: ContentLoaderService) {
     this.loadContent();
   }

   private async loadContent() {
     const posts = await this.contentLoader.loadPosts();
     this._allPosts.set(posts);
   }
   ```

### 2. Opções de Parse de Markdown

**Opção A: Build-time** (SSG - Recomendado):

- Usar um script Node.js durante o build
- Gerar JSON estático dos posts
- Angular apenas lê o JSON

**Opção B: Runtime**:

- Usar biblioteca como `marked` ou `markdown-it`
- Fazer parse no navegador
- Mais flexível, mas menos performático

### 3. Exemplo de Script de Build

```javascript
// scripts/build-posts.js
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const postsDir = path.join(__dirname, "../src/content/posts");
const outputFile = path.join(__dirname, "../src/assets/data/posts.json");

const posts = fs
  .readdirSync(postsDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const content = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const { data, content: body } = matter(content);

    return {
      ...data,
      content: body,
      slug: data.slug || file.replace(".md", ""),
    };
  });

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`✅ ${posts.length} posts processados!`);
```

Adicione ao `package.json`:

```json
{
  "scripts": {
    "prebuild": "node scripts/build-posts.js",
    "build": "ng build"
  }
}
```

## 📚 Recursos

- [Documentação do Decap CMS](https://decapcms.org/docs/intro/)
- [Widgets disponíveis](https://decapcms.org/docs/widgets/)
- [Configuração de coleções](https://decapcms.org/docs/collection-folder/)
- [Editorial workflow](https://decapcms.org/docs/editorial-workflows/)
- [Customização de previews](https://decapcms.org/docs/customization/)

## ❓ Troubleshooting

### Erro: "Config could not be loaded"

- Verifique se `public/admin/config.yml` está correto
- Valide a sintaxe YAML em https://www.yamllint.com/

### Erro de autenticação

- **Git Gateway**: Verifique se habilitou Identity no Netlify
- **GitHub OAuth**: Confirme Client ID e Secret nas variáveis de ambiente

### Posts não aparecem no blog

- Verifique se o `ContentLoaderService` está implementado
- Confirme que os arquivos `.md` estão em `src/content/posts/`
- Valide o frontmatter dos posts

## 🎉 Conclusão

Com o Decap CMS configurado, você pode:

- Escrever posts de qualquer lugar (computador, tablet, celular)
- Não precisa rodar o projeto localmente
- Gerenciar imagens facilmente
- Versionar todo o conteúdo no Git
- Ter workflow editorial profissional

**Próximo passo crítico**: Implementar o carregador de posts para substituir os dados mock!
