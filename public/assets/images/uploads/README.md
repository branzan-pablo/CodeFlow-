# Pasta de Uploads do Decap CMS

Esta pasta armazena as imagens enviadas através do Decap CMS.

## 📁 Estrutura

As imagens são automaticamente salvas aqui quando você faz upload através da interface do CMS em `/admin`.

## ⚙️ Configuração

Esta pasta é definida no arquivo `public/admin/config.yml`:

```yaml
media_folder: "public/assets/images/uploads"
public_folder: "/assets/images/uploads"
```

## 🔒 Git

Esta pasta deve ser commitada no Git para que as imagens sejam versionadas junto com o conteúdo.

## 🚀 Uso

1. Acesse `/admin` no seu site
2. Crie ou edite um post
3. No campo "Imagem Destacada", clique em "Choose an image"
4. Faça upload da imagem
5. A imagem será salva automaticamente nesta pasta
6. O Decap CMS criará um commit no GitHub com a nova imagem

## 📝 Notas

- Recomenda-se otimizar imagens antes do upload (WebP, compressão)
- Tamanho máximo recomendado: 2MB por imagem
- Formatos suportados: JPG, PNG, GIF, WebP, SVG
