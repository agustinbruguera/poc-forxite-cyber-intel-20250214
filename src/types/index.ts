export type UserRole = 'admin' | 'analyst' | 'viewer';
export type AlertSeverity = 'low' | 'medium' | 'high';
export type AlertStatus = 'new' | 'in_review' | 'closed';
export type AlertCategory = 'social' | 'repository' | 'phishing' | 'cards';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastLogin: string;
  tenant: string;
  factorEnabled: boolean;
}

export interface Asset {
  id: string;
  type: 'domain' | 'social' | 'keyword' | 'brand' | 'repository';
  label: string;
  metadata?: Record<string, string>;
  tenant: string;
}

export interface AlertTimelineEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  note?: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  category: AlertCategory;
  severity: AlertSeverity;
  status: AlertStatus;
  source: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  relatedAssets: string[];
  indicators: string[];
  assignedTo?: string;
  messageId?: string;
  evidenceUrls?: string[];
  tenant: string;
  timeline: AlertTimelineEntry[];
}

export interface WebhookConfig {
  id: string;
  name: string;
  targetUrl: string;
  secret: string;
  events: Array<'alert.created' | 'alert.updated' | 'alert.closed'>;
  isActive: boolean;
  createdAt: string;
}

export interface WebhookDelivery {
  id: string;
  webhookId: string;
  payloadPreview: string;
  status: 'success' | 'failed';
  deliveredAt: string;
  attempts: number;
}

export interface TelegramSource {
  chatId: string;
  label: string;
  type: 'channel' | 'group' | 'bot';
  lastSync: string;
}

export interface TelegramRule {
  id: string;
  keyword: string;
  severity: AlertSeverity;
  active: boolean;
  exclusions: string[];
}

export interface TelegramMessage {
  id: string;
  chatId: string;
  text: string;
  capturedAt: string;
  link?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  createdAt: string;
}
