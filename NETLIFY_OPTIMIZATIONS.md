# 🔧 Otimizações Netlify para Angular SSR

## 📚 Baseado na Documentação Oficial

Este documento explica as otimizações aplicadas ao projeto baseadas na [documentação oficial do Netlify para Angular](https://docs.netlify.com/build/frameworks/framework-setup-guides/angular/).

---

## ✅ Mudanças Aplicadas

### 1. **Habilitado Angular Runtime do Netlify**

**Antes:**

```toml
[build.environment]
  NETLIFY_USE_ANGULAR_RUNTIME = "false"
```

**Depois:**

```toml
[build.environment]
  NODE_VERSION = "20"
  NETLIFY_USE_YARN = "false"
  # Angular runtime habilitado por padrão (não precisa declarar)
```

**Por quê?**

- O Netlify detecta automaticamente projetos Angular
- Com o runtime habilitado, SSR usa **Edge Functions** automaticamente
- Edge Functions executam antes dos redirects, proporcionando melhor performance
- Não precisa configuração manual de SSR

---

### 2. **Removido Redirect Global no `netlify.toml`**

**Antes:**

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Depois:**

```toml
# NOTA: Para SSR Angular, o Netlify usa Edge Functions automaticamente
# Não é necessário adicionar redirect /* → /index.html
```

**Por quê?**

- Com SSR habilitado, as Edge Functions lidam com todas as rotas
- Redirect `/* → /index.html` seria para SPAs sem SSR
- Mantemos apenas redirects para o `/admin` (Decap CMS)

---

### 3. **Removido Redirect Global no `_redirects`**

**Antes:**

```
/* /index.html 200
```

**Depois:**

```
# NOTA: Com SSR Angular no Netlify, Edge Functions lidam automaticamente
# com as rotas. Não inclua /* /index.html aqui para SSR funcionar.
```

**Por quê?**

- Mesma razão: Edge Functions > Redirects para SSR
- Documentação oficial deixa claro: "Pages utilizing SSR are not subject to redirects"

---

### 4. **Mantido Redirects para `/admin`**

```toml
[[redirects]]
  from = "/admin"
  to = "/admin/index.html"
  status = 200
  force = true

[[redirects]]
  from = "/admin/*"
  to = "/admin/:splat"
  status = 200
```

**Por quê?**

- O Decap CMS é uma aplicação estática (não usa SSR)
- Precisa servir `index.html` e assets estáticos
- `force = true` garante que sempre serve o arquivo estático, não passa pelo Angular

---

### 5. **Adicionada Configuração de Image CDN (opcional)**

```toml
# [images]
#   remote_images = [
#     "https://exemplo.com/.*",
#     "https://cdn.exemplo.com/.*"
#   ]
```

**Quando usar?**

- Se usar `NgOptimizedImage` com imagens de outros domínios
- Netlify Image CDN otimiza automaticamente:
  - Conversão para WebP/AVIF
  - Redimensionamento responsivo
  - Compressão automática
  - Content negotiation

---

## 🚀 Como Funciona o SSR no Netlify

### Fluxo de Requisição:

```
Cliente faz requisição → Netlify CDN
                              ↓
                        Edge Function (SSR)
                              ↓
                    Renderiza HTML no Edge
                              ↓
                    Retorna HTML completo
                              ↓
                    Hidratação no Cliente
```

### Benefícios:

1. **Performance**: Renderização no Edge (próximo ao usuário)
2. **SEO**: HTML completo para crawlers
3. **First Paint**: Conteúdo visível imediatamente
4. **No Cold Start**: Edge Functions são mais rápidas que servidores tradicionais
5. **Escalabilidade**: CDN global automático

---

## 🔍 Recursos Netlify para Angular

### 1. **Detecção Automática de Framework**

Netlify detecta automaticamente:

- Build command: `ng build --prod`
- Publish directory: `dist/blog/browser` (do `angular.json`)
- SSR enabled: Sim (pela presença de `server.ts`)

### 2. **Edge Functions para SSR**

- Executam antes dos redirects
- Mais rápidas que serverless functions
- Distribuídas globalmente
- Sem cold starts

### 3. **Netlify Image CDN**

- Integração automática com `NgOptimizedImage`
- Otimização on-the-fly
- Não impacta tempo de build
- Content negotiation automática

### 4. **Acesso a Request/Context no SSR**

Você pode acessar objetos Netlify durante SSR:

```typescript
import type { Context } from "@netlify/edge-functions";

export class MyComponent {
  constructor(@Inject("netlify.request") @Optional() request?: Request, @Inject("netlify.context") @Optional() context?: Context) {
    console.log(`Path: ${request?.url}`);
    console.log(`City: ${context?.geo?.city}`);
  }
}
```

**Use cases:**

- Geolocalização
- A/B testing
- Personalização de conteúdo
- Rate limiting

---

## 📊 Comparação: Antes vs Depois

| Aspecto        | Antes                | Depois                        |
| -------------- | -------------------- | ----------------------------- |
| SSR            | Manual com redirects | Automático com Edge Functions |
| Performance    | Boa                  | Excelente (Edge)              |
| Configuração   | Complexa             | Simples (auto-detect)         |
| Cold Starts    | Sim (serverless)     | Não (Edge)                    |
| SEO            | Bom                  | Ótimo                         |
| Escalabilidade | Boa                  | Excelente (CDN global)        |

---

## 🎯 Melhores Práticas

### ✅ Faça:

1. **Deixe o Netlify detectar automaticamente** o framework
2. **Use prerendering** para páginas estáticas (`app.routes.server.ts`)
3. **Use `NgOptimizedImage`** para otimização automática de imagens
4. **Mantenha redirects simples** - apenas para casos específicos (como `/admin`)
5. **Configure `NODE_VERSION`** explicitamente

### ❌ Não faça:

1. **Não desabilite** `NETLIFY_USE_ANGULAR_RUNTIME` sem razão
2. **Não adicione** `/* /index.html` com SSR habilitado
3. **Não use** serverless functions para SSR (use Edge Functions)
4. **Não force** build commands manualmente (deixe auto-detect)

---

## 🧪 Testando Localmente

### Testar SSR com Netlify CLI:

```powershell
# Instalar Netlify CLI
npm install -g netlify-cli

# Build do projeto
npm run build

# Servir com Netlify (simula Edge Functions)
netlify serve

# Acesse: http://localhost:8888
```

### Testar apenas Angular SSR:

```powershell
npm run build
npm run serve:ssr:blog
```

---

## 🔗 Documentação Oficial

- [Angular on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/angular/)
- [Netlify Edge Functions](https://docs.netlify.com/edge-functions/overview/)
- [Netlify Image CDN](https://docs.netlify.com/build/image-cdn/overview/)
- [Angular SSR Guide](https://angular.dev/guide/ssr)
- [Angular Prerendering](https://angular.dev/guide/prerendering)

---

## 📝 Notas Importantes

### SSR vs Prerendering vs SPA

| Tipo             | Quando Renderiza          | Use Para          |
| ---------------- | ------------------------- | ----------------- |
| **SSR**          | Em cada requisição (Edge) | Páginas dinâmicas |
| **Prerendering** | No build time             | Páginas estáticas |
| **SPA**          | No cliente                | Apps interativos  |

**Seu projeto usa**: SSR + Prerendering híbrido

- Home, About, Posts → Prerendered
- Post Detail → SSR (dinâmico por slug)

### Configuração em `app.routes.server.ts`

```typescript
export const routes: ServerRoute[] = [
  {
    path: "/",
    renderMode: RenderMode.Prerender,
  },
  {
    path: "/posts/:slug",
    renderMode: RenderMode.Server, // SSR
  },
];
```

---

## ✅ Checklist Pós-Deploy

Após deploy no Netlify, verifique:

- [ ] Build concluído com sucesso
- [ ] Edge Functions listadas no painel
- [ ] SSR funcionando (view source mostra HTML completo)
- [ ] `/admin` acessível e separado do Angular
- [ ] Redirects funcionando corretamente
- [ ] Imagens otimizadas (se usando NgOptimizedImage)
- [ ] Lighthouse score > 90

---

**Data de Atualização**: 26 de Outubro, 2025  
**Baseado em**: Netlify Docs (Jul 14, 2025)
