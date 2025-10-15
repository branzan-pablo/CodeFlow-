import {
  Injectable,
  signal,
  computed,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import emailjs from '@emailjs/browser';

export interface NewsletterSubscription {
  email: string;
  timestamp: Date;
  source?: string; // homepage, post-detail, etc.
}

export interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  private platformId = inject(PLATFORM_ID);

  // Configuração EmailJS (você configurará depois)
  private readonly emailConfig: EmailConfig = {
    serviceId: 'YOUR_SERVICE_ID', // Configurar no EmailJS
    templateId: 'YOUR_TEMPLATE_ID', // Configurar no EmailJS
    publicKey: 'YOUR_PUBLIC_KEY', // Configurar no EmailJS
  };

  // Lista local de inscritos (em produção, usaria backend)
  private readonly subscribers = new Set<string>();

  constructor() {
    // Inicializa EmailJS
    this.initEmailJS();
    // Carrega inscritos do localStorage
    this.loadSubscribers();
  }

  /**
   * Inicializa a biblioteca EmailJS
   */
  private initEmailJS(): void {
    if (this.emailConfig.publicKey !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(this.emailConfig.publicKey);
    }
  }

  /**
   * Inscreve um email na newsletter
   */
  async subscribe(
    email: string,
    source: string = 'unknown'
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Valida email
      if (!this.isValidEmail(email)) {
        return { success: false, message: 'E-mail inválido' };
      }

      // Verifica se já está inscrito
      if (this.isSubscribed(email)) {
        return { success: false, message: 'Este e-mail já está inscrito!' };
      }

      // Dados da inscrição
      const subscription: NewsletterSubscription = {
        email,
        timestamp: new Date(),
        source,
      };

      // Envia email de confirmação (se EmailJS configurado)
      if (this.isEmailJSConfigured()) {
        await this.sendConfirmationEmail(subscription);
      }

      // Envia notificação para admin (opcional)
      await this.notifyAdmin(subscription);

      // Salva localmente
      this.addSubscriber(email);

      return {
        success: true,
        message: 'Inscrição realizada com sucesso! Verifique seu e-mail.',
      };
    } catch (error) {
      console.error('Erro ao inscrever na newsletter:', error);
      return {
        success: false,
        message: 'Erro interno. Tente novamente mais tarde.',
      };
    }
  }

  /**
   * Envia email de confirmação para o inscrito
   */
  private async sendConfirmationEmail(
    subscription: NewsletterSubscription
  ): Promise<void> {
    // Só tenta enviar email no browser
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const baseUrl =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'https://your-domain.com';

    const templateParams = {
      to_email: subscription.email,
      to_name: subscription.email.split('@')[0], // Usa parte antes do @
      blog_name: 'CodeFlow Angular',
      blog_url: baseUrl,
      subscription_date: subscription.timestamp.toLocaleDateString('pt-BR'),
      unsubscribe_url: `${baseUrl}/newsletter/unsubscribe?email=${encodeURIComponent(
        subscription.email
      )}`,
    };

    await emailjs.send(
      this.emailConfig.serviceId,
      this.emailConfig.templateId,
      templateParams
    );
  }

  /**
   * Notifica admin sobre nova inscrição
   */
  private async notifyAdmin(
    subscription: NewsletterSubscription
  ): Promise<void> {
    // Template para notificar o admin
    const adminTemplateParams = {
      to_email: 'pablo@pablofbdev.com', // Seu email
      subscriber_email: subscription.email,
      subscription_source: subscription.source,
      subscription_date: subscription.timestamp.toLocaleDateString('pt-BR'),
      total_subscribers: this.getSubscriberCount(),
    };

    try {
      // Envia apenas se configurado
      if (this.isEmailJSConfigured()) {
        await emailjs.send(
          this.emailConfig.serviceId,
          'admin_notification', // Template separado para admin
          adminTemplateParams
        );
      }
    } catch (error) {
      // Falha silenciosa - não afeta a inscrição do usuário
      console.log('Notificação admin falhou:', error);
    }
  }

  /**
   * Cancela inscrição
   */
  async unsubscribe(
    email: string
  ): Promise<{ success: boolean; message: string }> {
    if (!this.isValidEmail(email)) {
      return { success: false, message: 'E-mail inválido' };
    }

    if (!this.isSubscribed(email)) {
      return { success: false, message: 'E-mail não encontrado na lista' };
    }

    this.removeSubscriber(email);
    return { success: true, message: 'Inscrição cancelada com sucesso' };
  }

  /**
   * Verifica se email está inscrito
   */
  isSubscribed(email: string): boolean {
    return this.subscribers.has(email.toLowerCase());
  }

  /**
   * Retorna número de inscritos
   */
  getSubscriberCount(): number {
    return this.subscribers.size;
  }

  /**
   * Valida formato de email
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Verifica se EmailJS está configurado
   */
  private isEmailJSConfigured(): boolean {
    return (
      this.emailConfig.serviceId !== 'YOUR_SERVICE_ID' &&
      this.emailConfig.templateId !== 'YOUR_TEMPLATE_ID' &&
      this.emailConfig.publicKey !== 'YOUR_PUBLIC_KEY'
    );
  }

  /**
   * Adiciona inscrito ao storage local
   */
  private addSubscriber(email: string): void {
    this.subscribers.add(email.toLowerCase());
    this.saveSubscribers();
  }

  /**
   * Remove inscrito do storage local
   */
  private removeSubscriber(email: string): void {
    this.subscribers.delete(email.toLowerCase());
    this.saveSubscribers();
  }

  /**
   * Salva lista no localStorage
   */
  private saveSubscribers(): void {
    if (
      isPlatformBrowser(this.platformId) &&
      typeof localStorage !== 'undefined'
    ) {
      const subscriberList = Array.from(this.subscribers);
      localStorage.setItem(
        'newsletter-subscribers',
        JSON.stringify(subscriberList)
      );
    }
  }

  /**
   * Carrega lista do localStorage
   */
  private loadSubscribers(): void {
    if (
      isPlatformBrowser(this.platformId) &&
      typeof localStorage !== 'undefined'
    ) {
      const stored = localStorage.getItem('newsletter-subscribers');
      if (stored) {
        try {
          const subscriberList: string[] = JSON.parse(stored);
          subscriberList.forEach((email) => this.subscribers.add(email));
        } catch (error) {
          console.error('Erro ao carregar inscritos:', error);
        }
      }
    }
  }

  /**
   * Configuração manual do EmailJS (para desenvolvimento)
   */
  configureEmailJS(
    serviceId: string,
    templateId: string,
    publicKey: string
  ): void {
    this.emailConfig.serviceId = serviceId;
    this.emailConfig.templateId = templateId;
    this.emailConfig.publicKey = publicKey;
    this.initEmailJS();
  }

  /**
   * Método para testar configuração
   */
  async testConfiguration(): Promise<boolean> {
    if (!this.isEmailJSConfigured()) {
      console.warn('EmailJS não configurado');
      return false;
    }

    try {
      const testParams = {
        to_email: 'test@example.com',
        message: 'Teste de configuração EmailJS',
      };

      await emailjs.send(
        this.emailConfig.serviceId,
        this.emailConfig.templateId,
        testParams
      );

      return true;
    } catch (error) {
      console.error('Teste de configuração falhou:', error);
      return false;
    }
  }
}
