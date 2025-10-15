import { Injectable, inject, DOCUMENT } from '@angular/core';

export interface StructuredData {
  '@context': string;
  '@type': string;
  '@id'?: string;
  [key: string]: any;
}

export type StructuredDataId = string;

@Injectable({
  providedIn: 'root',
})
export class StructuredDataService {
  private readonly _document = inject(DOCUMENT);

  addStructuredData(data: StructuredData, id: StructuredDataId): void {
    const script = this._document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    script.id = this._transformId(id);

    this.removeStructuredData(id);

    this._document.head.appendChild(script);
  }

  removeStructuredData(id: string): void {
    const script = this._document.getElementById(this._transformId(id));
    if (script) {
      script.remove();
    }
  }

  private _transformId(id: string): string {
    return `${id}-structured-data`;
  }
}

// Funções utilitárias para gerar dados estruturados

export const generateArticleStructuredData = (
  title: string,
  description: string,
  author: string,
  publishedDate: string,
  modifiedDate: string,
  imageUrl?: string,
  url?: string
): StructuredData => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Article',
    '@id': url,
    headline: title,
    description: description,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CodeFlow Angular',
      logo: {
        '@type': 'ImageObject',
        url: 'https://your-domain.com/logo.png',
      },
    },
    datePublished: publishedDate,
    dateModified: modifiedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
};

export const generateBlogStructuredData = (
  name: string,
  description: string,
  url: string
): StructuredData => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Blog',
    '@id': url,
    name: name,
    description: description,
    url: url,
    publisher: {
      '@type': 'Organization',
      name: 'CodeFlow Angular',
      logo: {
        '@type': 'ImageObject',
        url: 'https://your-domain.com/logo.png',
      },
    },
  };
};

export const generatePersonStructuredData = (
  name: string,
  jobTitle: string,
  url: string,
  imageUrl?: string,
  sameAs?: string[]
): StructuredData => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Person',
    '@id': url,
    name: name,
    jobTitle: jobTitle,
    url: url,
    image: imageUrl,
    sameAs: sameAs,
  };
};
