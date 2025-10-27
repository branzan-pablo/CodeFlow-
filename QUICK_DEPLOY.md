# 🚀 Quick Deploy - Resumo Rápido

## Deploy Rápido em 3 Passos

### 1. GitHub

```powershell
# Push do código para o GitHub
git add .
git commit -m "Preparar para deploy"
git push origin main
```

### 2. Netlify

1. Acesse [app.netlify.com](https://app.netlify.com)
2. **Add new site** → **Import from GitHub**
3. Selecione o repositório `blog`
4. Clique em **Deploy site**

### 3. Decap CMS (Autenticação)

1. No Netlify: **Site settings** → **Identity** → **Enable Identity**
2. **Services** → **Git Gateway** → **Enable**
3. **Identity** → **Invite users** → Digite seu email
4. Aceite o convite no email
5. Acesse `https://seu-site.netlify.app/admin`

## ✅ Pronto!

Seu blog está no ar com CMS completo.

## 📚 Guia Completo

Para instruções detalhadas, veja: **DEPLOY_GUIDE.md**

## 🆘 Problemas?

### Build Falha

```powershell
# Teste localmente
npm run build
```

### CMS Não Carrega

1. Verifique se Identity está habilitado
2. Verifique se Git Gateway está habilitado
3. Limpe cache do navegador

### Posts Não Aparecem

1. Aguarde deploy completar no Netlify
2. Verifique se o post foi publicado (não está em draft)
3. Force refresh: Ctrl+Shift+R

## 🔗 Links Úteis

- **Netlify Dashboard**: https://app.netlify.com
- **Documentação Completa**: DEPLOY_GUIDE.md
- **Setup Técnico**: DECAP_CMS_SETUP.md
