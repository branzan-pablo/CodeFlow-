# 🚀 Guia Completo de Deploy - Angular Blog com Decap CMS

Este guia mostra como fazer o deploy completo do seu blog Angular com Decap CMS headless usando GitHub e Netlify.

## ⚡ Otimizações Incluídas

Este projeto está **otimizado** para Netlify seguindo as [melhores práticas oficiais](https://docs.netlify.com/build/frameworks/framework-setup-guides/angular/):

- ✅ **SSR com Edge Functions** - Renderização no Edge para máxima performance
- ✅ **Detecção Automática de Framework** - Configuração simplificada
- ✅ **Prerendering Híbrido** - Páginas estáticas + dinâmicas
- ✅ **Netlify Image CDN** - Otimização automática de imagens
- ✅ **Redirects Otimizados** - Apenas para rotas necessárias (CMS)

> 📖 Veja detalhes técnicos em: [NETLIFY_OPTIMIZATIONS.md](./NETLIFY_OPTIMIZATIONS.md)

## 📋 Pré-requisitos

- ✅ Conta no GitHub
- ✅ Conta no Netlify (gratuita)
- ✅ Git instalado localmente
- ✅ Node.js e npm instalados

---

## 1️⃣ Preparar o Repositório GitHub

### 1.1. Criar Repositório no GitHub (se ainda não existe)

1. Acesse [github.com](https://github.com) e faça login
2. Clique no botão **+** no canto superior direito → **New repository**
3. Preencha:
   - **Repository name**: `blog` (ou nome de sua preferência)
   - **Description**: "Blog pessoal com Angular 20 e Decap CMS"
   - **Public** (para usar Git Gateway do Netlify gratuitamente)
4. **NÃO** marque "Initialize this repository with a README"
5. Clique em **Create repository**

### 1.2. Conectar Repositório Local ao GitHub

```powershell
# Verificar status atual
git status

# Verificar se já tem remote configurado
git remote -v

# Se NÃO tiver remote configurado, adicione:
git remote add origin https://github.com/SEU-USUARIO/blog.git

# Se JÁ tiver, certifique-se que está correto
git remote set-url origin https://github.com/SEU-USUARIO/blog.git

# Fazer push para o GitHub
git push -u origin main
```

### 1.3. Verificar Arquivos Commitados

Certifique-se que estes arquivos estão no repositório:

- ✅ `netlify.toml` - Configuração de build do Netlify
- ✅ `public/_redirects` - Regras de redirecionamento
- ✅ `public/admin/config.yml` - Configuração do Decap CMS
- ✅ `public/admin/index.html` - Interface do CMS

```powershell
# Verificar arquivos
git ls-files | findstr "netlify\|admin"
```

---

## 2️⃣ Deploy no Netlify

### 2.1. Criar Novo Site no Netlify

1. Acesse [app.netlify.com](https://app.netlify.com) e faça login
2. Clique em **Add new site** → **Import an existing project**
3. Selecione **Deploy with GitHub**
4. Autorize o Netlify a acessar sua conta GitHub (se primeiro acesso)
5. Selecione o repositório `blog` (ou o nome que você escolheu)

### 2.2. Configurar Build Settings

Na tela de configuração, o Netlify deve detectar automaticamente (via `netlify.toml`):

- **Build command**: `npm run build`
- **Publish directory**: `dist/blog/browser`
- **Branch to deploy**: `main`

Se precisar configurar manualmente:

```
Base directory: (deixe em branco)
Build command: npm run build
Publish directory: dist/blog/browser
```

Clique em **Deploy site**

### 2.3. Aguardar o Deploy

- O Netlify irá:
  1. Instalar dependências (`npm install`)
  2. Executar build (`npm run build`)
  3. Publicar o site
- Tempo estimado: 2-5 minutos
- Você receberá uma URL temporária tipo: `https://random-name-123456.netlify.app`

### 2.4. (Opcional) Configurar Domínio Customizado

1. No painel do site, vá em **Site settings** → **Domain management**
2. Clique em **Add custom domain**
3. Digite seu domínio (ex: `meublog.com`)
4. Siga as instruções para configurar DNS

---

## 3️⃣ Configurar Decap CMS (Autenticação)

### 3.1. Habilitar Netlify Identity

1. No painel do seu site no Netlify, vá em **Site settings**
2. Clique em **Identity** no menu lateral
3. Clique em **Enable Identity**

### 3.2. Habilitar Git Gateway

1. Ainda na página **Identity**, role até **Services**
2. Clique em **Enable Git Gateway**
3. Na tela que abrir:
   - Confirme o repositório GitHub (já deve estar correto)
   - Clique em **Enable**

> ℹ️ **O que é Git Gateway?**  
> Permite que o Decap CMS faça commits no GitHub sem você precisar criar um OAuth App. É a forma mais simples de autenticação!

### 3.3. Configurar Registration

1. Ainda em **Identity**, vá em **Registration**
2. Selecione **Invite only** (recomendado para blogs pessoais)
   - Isso evita que qualquer pessoa crie uma conta no seu CMS

### 3.4. Convidar Você Mesmo como Administrador

1. Na página **Identity**, clique em **Invite users**
2. Digite seu email
3. Clique em **Send**
4. Você receberá um email com link de convite
5. Clique no link e crie uma senha
6. Pronto! Você é o administrador do CMS

---

## 4️⃣ Acessar o Decap CMS

### 4.1. Acessar Interface do CMS

1. Acesse: `https://seu-site.netlify.app/admin`
2. Clique em **Login with Netlify Identity**
3. Entre com seu email e senha que criou
4. Você verá a interface do Decap CMS! 🎉

### 4.2. Criar Seu Primeiro Post

1. Na interface do CMS, clique em **Posts** no menu
2. Clique em **New Post**
3. Preencha:
   - **Título**: Título do seu post
   - **Slug**: URL amigável (ex: `meu-primeiro-post`)
   - **Resumo**: Descrição curta
   - **Conteúdo**: Escreva usando Markdown
   - **Categoria**: Escolha uma categoria
   - **Tags**: Adicione tags relevantes
   - **Imagem Destacada**: Faça upload de uma imagem (opcional)
4. Clique em **Save** (salva como rascunho)

### 4.3. Workflow Editorial

O Decap CMS usa um workflow de 3 etapas:

1. **Drafts** (Rascunhos): Posts em criação
2. **In Review** (Em Revisão): Posts prontos para revisão
3. **Ready** (Pronto): Posts aprovados para publicação

Para publicar:

1. Arraste o post de **Drafts** → **Ready**
2. Clique em **Publish** → **Publish now**
3. O post será commitado no GitHub e aparecerá no seu blog!

---

## 5️⃣ Testar o Blog

### 5.1. Verificar Build do Netlify

1. No painel do Netlify, vá em **Deploys**
2. Após publicar um post, você verá um novo deploy sendo criado
3. Aguarde completar (1-2 minutos)

### 5.2. Verificar Post no Site

1. Acesse seu site: `https://seu-site.netlify.app`
2. Navegue até a página de posts
3. Seu novo post deve aparecer!

### 5.3. Verificar Commits no GitHub

1. Acesse seu repositório no GitHub
2. Vá em **Commits**
3. Você verá commits automáticos do Decap CMS com mensagens como:
   - `Create Posts "meu-primeiro-post"`
   - `Update Posts "meu-primeiro-post"`

---

## 6️⃣ Configurações Avançadas (Opcional)

### 6.1. Configurar Build Hooks

Para rebuild automático:

1. No Netlify, vá em **Site settings** → **Build & deploy**
2. Role até **Build hooks**
3. Clique em **Add build hook**
4. Nome: "Rebuild from CMS"
5. Branch: main
6. Clique em **Save**
7. Copie a URL do webhook

Use esse webhook se precisar rebuilds externos.

### 6.2. Configurar Variáveis de Ambiente

Se precisar de API keys:

1. Vá em **Site settings** → **Environment variables**
2. Clique em **Add a variable**
3. Adicione suas variáveis (ex: `EMAILJS_PUBLIC_KEY`)

### 6.3. Configurar Deploy Notifications

1. Vá em **Site settings** → **Notifications**
2. Configure notificações por email ou Slack
3. Receba alertas de deploy com sucesso/falha

---

## 7️⃣ Manutenção e Troubleshooting

### Problema: Build Falha no Netlify

**Solução 1: Verificar Logs**

```
1. No Netlify, vá em Deploys
2. Clique no deploy com falha
3. Leia os logs de erro
4. Geralmente são erros de build do Angular
```

**Solução 2: Testar Build Localmente**

```powershell
npm run build
```

Se funcionar localmente, o problema pode ser:

- Versão do Node.js diferente
- Variáveis de ambiente faltando

**Solução 3: Definir Versão do Node.js**

Adicione em `netlify.toml`:

```toml
[build.environment]
  NODE_VERSION = "20"
```

### Problema: CMS Não Carrega

**Verifique:**

1. Git Gateway está habilitado
2. Identity está habilitado
3. Você aceitou o convite e criou senha
4. Tente acessar em janela anônima (limpa cache)

**Solução:**

```powershell
# Limpar cache do navegador e tentar novamente
# Ou acessar: https://seu-site.netlify.app/admin/index.html
```

### Problema: Posts Não Aparecem no Site

**Verifique:**

1. Deploy do Netlify foi concluído com sucesso
2. Arquivo `.md` foi criado em `src/content/posts/`
3. `PostService` está lendo os arquivos corretamente

**Solução:**

```powershell
# Verificar arquivos localmente
git pull origin main
ls src/content/posts/
```

### Problema: Imagens Não Aparecem

**Verifique:**

1. Path em `config.yml` está correto:
   ```yaml
   media_folder: "public/assets/images/uploads"
   public_folder: "/assets/images/uploads"
   ```
2. Pasta existe no repositório
3. Deploy incluiu as imagens

**Solução:**

```powershell
# Criar pasta se não existir
mkdir -p public/assets/images/uploads
git add public/assets/images/uploads/.gitkeep
git commit -m "Add uploads folder"
git push
```

---

## 8️⃣ Checklist Final

### ✅ GitHub

- [ ] Repositório criado e público
- [ ] Código commitado e pushed
- [ ] Branch `main` existe
- [ ] Arquivos `netlify.toml` e `public/admin/*` presentes

### ✅ Netlify

- [ ] Site criado e conectado ao GitHub
- [ ] Deploy concluído com sucesso
- [ ] Site acessível via URL do Netlify
- [ ] Identity habilitado
- [ ] Git Gateway habilitado
- [ ] Usuário administrador convidado e ativado

### ✅ Decap CMS

- [ ] Interface do CMS acessível em `/admin`
- [ ] Login funcionando
- [ ] Consegue criar posts
- [ ] Consegue fazer upload de imagens
- [ ] Posts aparecem no site após publicação

---

## 🎯 Próximos Passos

1. **Domínio Personalizado**: Configure um domínio próprio
2. **SSL/HTTPS**: Netlify fornece automaticamente
3. **Analytics**: Adicione Google Analytics ou similar
4. **SEO**: Configure meta tags e sitemap
5. **Performance**: Otimize imagens e lazy loading
6. **Backup**: GitHub já é seu backup automático!

---

## 📚 Recursos Úteis

- [Documentação Decap CMS](https://decapcms.org/docs/intro/)
- [Documentação Netlify](https://docs.netlify.com/)
- [Documentação Angular SSR](https://angular.dev/guide/ssr)
- [Git Gateway Documentation](https://docs.netlify.com/visitor-access/git-gateway/)

---

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs de deploy no Netlify
2. Consulte `DECAP_CMS_SETUP.md` para detalhes técnicos
3. Verifique issues no [GitHub do Decap CMS](https://github.com/decaporg/decap-cms)
4. Comunidade Netlify em [community.netlify.com](https://community.netlify.com/)

---

**✨ Parabéns! Seu blog está no ar com um CMS profissional!**
