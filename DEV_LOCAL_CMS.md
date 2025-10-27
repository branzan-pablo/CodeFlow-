# 🛠️ Desenvolvimento Local - Decap CMS

## ⚠️ Importante: Acesso ao CMS em Desenvolvimento

Em **desenvolvimento local** (`npm start`), o Angular Router intercepta todas as rotas, incluindo `/admin`.

### ✅ Como Acessar o CMS Localmente

**Opção 1: Acesso Direto ao HTML (Recomendado)**

```
http://localhost:4200/admin/index.html
```

**Opção 2: Usar Netlify CLI (Simula Produção)**

```powershell
# Instalar Netlify CLI
npm install -g netlify-cli

# Build do projeto
npm run build

# Servir com Netlify (com redirects funcionando)
netlify dev
```

## 🚀 Em Produção (Netlify)

Em produção, o `/admin` funciona perfeitamente:

```
https://seu-site.netlify.app/admin
```

Os redirects do Netlify garantem que `/admin` serve o arquivo estático do CMS.

## 🔧 Por Que Isso Acontece?

### Desenvolvimento Local:

```
Cliente → Angular Dev Server → Angular Router
                                     ↓
                              Não há redirects
                              (usa rotas Angular)
```

### Produção (Netlify):

```
Cliente → Netlify CDN → Redirects (_redirects/netlify.toml)
                              ↓
                        /admin → /admin/index.html
                        (serve arquivo estático)
```

## 📝 Notas

1. **Nunca** adicione rota `/admin` no `app.routes.ts`
2. Use `/admin/index.html` para testar localmente
3. Use `netlify dev` para testar como em produção
4. Em produção, `/admin` funciona corretamente

## 🎯 Workflows

### Desenvolvimento de Conteúdo Local:

```powershell
# Terminal 1: Angular dev server
npm start

# Terminal 2: Acesse
# http://localhost:4200/admin/index.html
```

### Teste Completo (como em produção):

```powershell
# Build
npm run build

# Serve com Netlify
netlify dev

# Acesse: http://localhost:8888/admin
```

---

**TL;DR**: Em dev local, use `/admin/index.html`. Em produção, use `/admin` (redirects funcionam).
