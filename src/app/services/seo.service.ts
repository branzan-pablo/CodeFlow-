import { Injectable, inject, DOCUMENT } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string[];
  imageUrl?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly _titleService = inject(Title);
  private readonly _metaService = inject(Meta);
  private readonly _document = inject(DOCUMENT);

  setSeoData(seoData: SeoData): void {
    const title = seoData.title
      ? `${seoData.title} | CodeFlow Angular`
      : 'CodeFlow Angular';

    this._titleService.setTitle(title);

    // Meta descrição
    this._updateMetaTag('name', 'description', seoData.description);
    this._updateMetaTag('name', 'keywords', seoData.keywords?.join(', '));

    // Open Graph tags
    this._updateMetaTag('property', 'og:title', title);
    this._updateMetaTag('property', 'og:description', seoData.description);
    this._updateMetaTag(
      'property',
      'og:image',
      this._getImageParamsUrl(seoData.imageUrl)
    );
    this._updateMetaTag('property', 'og:url', seoData.url);
    this._updateMetaTag('property', 'og:type', seoData.type || 'website');
    this._updateMetaTag('property', 'og:site_name', 'CodeFlow Angular');

    // Twitter Card tags
    this._updateMetaTag('name', 'twitter:card', 'summary_large_image');
    this._updateMetaTag('name', 'twitter:title', title);
    this._updateMetaTag('name', 'twitter:description', seoData.description);
    this._updateMetaTag(
      'name',
      'twitter:image',
      this._getImageParamsUrl(seoData.imageUrl)
    );

    // Robots tag
    this._updateMetaTag(
      'name',
      'robots',
      seoData.noIndex ? 'noindex,nofollow' : 'index,follow'
    );

    // Canonical URL
    this._updateCanonicalUrl(seoData.url);
  }

  private _updateMetaTag(
    attribute: string,
    name: string,
    content?: string
  ): void {
    if (!content) {
      this._metaService.removeTag(`${attribute}="${name}"`);
      return;
    }

    if (this._metaService.getTag(`${attribute}="${name}"`)) {
      this._metaService.updateTag({ [attribute]: name, content });
    } else {
      this._metaService.addTag({ [attribute]: name, content });
    }
  }

  private _updateCanonicalUrl(url?: string): void {
    const existingCanonicalUrl = this._document.querySelector(
      'link[rel="canonical"]'
    );

    if (existingCanonicalUrl) existingCanonicalUrl.remove();

    if (url) {
      const canonicalLink = this._document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = url;
      this._document.head.appendChild(canonicalLink);
    }
  }

  private _getImageParamsUrl(imageUrl?: string): string | undefined {
    if (!imageUrl) return undefined;

    // Se for uma URL completa, retorna como está
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    // Se for uma URL relativa, adiciona o domínio
    return `https://your-domain.com${imageUrl}`;
  }
}
