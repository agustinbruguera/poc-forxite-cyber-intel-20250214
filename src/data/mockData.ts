import { Alert, AppNotification, Asset, TelegramMessage, TelegramRule, TelegramSource, User, WebhookConfig, WebhookDelivery } from '../types';

const tenantId = 'forxite-bank';

export const mockUsers: User[] = [
  {
    id: 'u-01',
    name: 'Lucía Ramírez',
    email: 'lucia.ramirez@cliente.com',
    role: 'admin',
    lastLogin: '2025-02-12T09:25:00Z',
    tenant: tenantId,
    factorEnabled: true,
  },
  {
    id: 'u-02',
    name: 'Mateo Fuentes',
    email: 'mateo.fuentes@cliente.com',
    role: 'analyst',
    lastLogin: '2025-02-14T11:05:00Z',
    tenant: tenantId,
    factorEnabled: true,
  },
  {
    id: 'u-03',
    name: 'Carla Ruiz',
    email: 'carla.ruiz@cliente.com',
    role: 'viewer',
    lastLogin: '2025-02-10T16:20:00Z',
    tenant: tenantId,
    factorEnabled: false,
  },
];

export const mockAssets: Asset[] = [
  { id: 'a-01', type: 'domain', label: 'forxitebank.com', tenant: tenantId },
  { id: 'a-02', type: 'domain', label: 'forxitebank.com.ar', tenant: tenantId },
  {
    id: 'a-03',
    type: 'social',
    label: '@ForxiteBank (Twitter/X)',
    metadata: { platform: 'twitter' },
    tenant: tenantId,
  },
  {
    id: 'a-04',
    type: 'keyword',
    label: 'ForxiteBank BIN 552341',
    metadata: { context: 'tarjetas' },
    tenant: tenantId,
  },
  {
    id: 'a-05',
    type: 'repository',
    label: 'github.com/forxite/devops-playbooks',
    tenant: tenantId,
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1001',
    title: 'Sitio phishing que imita a ForxiteBank',
    description:
      'URL detectada con formulario de login similar al portal oficial. Certificado autofirmado y hospedado en proveedor desconocido.',
    category: 'phishing',
    severity: 'high',
    status: 'in_review',
    source: 'crawler:openphish',
    createdAt: '2025-02-12T07:40:00Z',
    updatedAt: '2025-02-14T09:15:00Z',
    tags: ['phishing', 'typosquatting'],
    relatedAssets: ['a-01', 'a-04'],
    indicators: ['https://forxitebannk-login.com', '45.12.89.44'],
    assignedTo: 'Mateo Fuentes',
    tenant: tenantId,
    timeline: [
      {
        id: 'tl-1',
        timestamp: '2025-02-12T07:45:00Z',
        actor: 'Sistema',
        action: 'alert.created',
        note: 'Detectada por motor de phishing',
      },
      {
        id: 'tl-2',
        timestamp: '2025-02-12T10:00:00Z',
        actor: 'Lucía Ramírez',
        action: 'alert.assigned',
        note: 'Asignada a analista para verificación',
      },
    ],
  },
  {
    id: 'alert-1002',
    title: 'Credenciales filtradas en repositorio público',
    description:
      'Archivo config.yml con claves de API que mencionan "forxite" publicado en GitHub público.',
    category: 'repository',
    severity: 'medium',
    status: 'new',
    source: 'monitor:github',
    createdAt: '2025-02-13T15:25:00Z',
    updatedAt: '2025-02-13T15:25:00Z',
    tags: ['credential leak'],
    relatedAssets: ['a-05'],
    indicators: ['https://github.com/leak-repo/config.yml'],
    tenant: tenantId,
    timeline: [
      {
        id: 'tl-3',
        timestamp: '2025-02-13T15:25:00Z',
        actor: 'Sistema',
        action: 'alert.created',
      },
    ],
  },
  {
    id: 'alert-1003',
    title: 'Menciones sospechosas en Telegram',
    description:
      'Canal de fraude comparte BIN parcial y ofrece tarjetas relacionadas con la marca.',
    category: 'cards',
    severity: 'high',
    status: 'new',
    source: 'automation:telegram',
    createdAt: '2025-02-14T04:20:00Z',
    updatedAt: '2025-02-14T04:20:00Z',
    tags: ['telegram', 'tarjetas'],
    relatedAssets: ['a-04'],
    indicators: ['BIN 552341'],
    messageId: 'msg-908',
    tenant: tenantId,
    timeline: [
      {
        id: 'tl-4',
        timestamp: '2025-02-14T04:20:00Z',
        actor: 'Automatización Telegram',
        action: 'alert.created',
        note: 'Regla BIN prioridad alta',
      },
    ],
  },
  {
    id: 'alert-1004',
    title: 'Cuenta falsa en Instagram',
    description:
      'Perfil recién creado utilizando branding de ForxiteBank solicitando datos personales.',
    category: 'social',
    severity: 'medium',
    status: 'closed',
    source: 'monitor:instagram',
    createdAt: '2025-02-11T09:00:00Z',
    updatedAt: '2025-02-13T12:10:00Z',
    tags: ['impersonation'],
    relatedAssets: ['a-03'],
    indicators: ['instagram.com/forxitebank-support'],
    assignedTo: 'Lucía Ramírez',
    tenant: tenantId,
    timeline: [
      {
        id: 'tl-5',
        timestamp: '2025-02-11T09:05:00Z',
        actor: 'Sistema',
        action: 'alert.created',
      },
      {
        id: 'tl-6',
        timestamp: '2025-02-12T14:30:00Z',
        actor: 'Mateo Fuentes',
        action: 'alert.in_review',
        note: 'Escalada a equipo de marca',
      },
      {
        id: 'tl-7',
        timestamp: '2025-02-13T12:10:00Z',
        actor: 'Lucía Ramírez',
        action: 'alert.closed',
        note: 'Cuenta removida por Meta',
      },
    ],
  },
];

export const mockWebhookConfigs: WebhookConfig[] = [
  {
    id: 'wh-01',
    name: 'Canal Slack CSIRT',
    targetUrl: 'https://hooks.slack.com/services/xxx',
    secret: 'slack-secret',
    events: ['alert.created', 'alert.updated'],
    isActive: true,
    createdAt: '2025-02-01T10:15:00Z',
  },
  {
    id: 'wh-02',
    name: 'Microsoft Teams SOC',
    targetUrl: 'https://teams.microsoft.com/webhook/xxx',
    secret: 'teams-secret',
    events: ['alert.created', 'alert.closed'],
    isActive: false,
    createdAt: '2025-02-05T08:00:00Z',
  },
];

export const mockWebhookDeliveries: WebhookDelivery[] = [
  {
    id: 'whd-001',
    webhookId: 'wh-01',
    payloadPreview: '{"alertId":"alert-1001","status":"in_review"}',
    status: 'success',
    deliveredAt: '2025-02-14T09:15:05Z',
    attempts: 1,
  },
  {
    id: 'whd-002',
    webhookId: 'wh-01',
    payloadPreview: '{"alertId":"alert-1002","status":"new"}',
    status: 'failed',
    deliveredAt: '2025-02-13T15:27:10Z',
    attempts: 3,
  },
];

export const mockTelegramSources: TelegramSource[] = [
  {
    chatId: '-100194502222',
    label: 'Fraude tarjetas LATAM',
    type: 'channel',
    lastSync: '2025-02-14T05:00:00Z',
  },
  {
    chatId: '-998855441',
    label: 'Bots suplantadores',
    type: 'bot',
    lastSync: '2025-02-13T23:30:00Z',
  },
];

export const mockTelegramRules: TelegramRule[] = [
  {
    id: 'rule-01',
    keyword: 'ForxiteBank',
    severity: 'medium',
    active: true,
    exclusions: ['soporte'],
  },
  {
    id: 'rule-02',
    keyword: '552341',
    severity: 'high',
    active: true,
    exclusions: [],
  },
  {
    id: 'rule-03',
    keyword: 'Forxite API',
    severity: 'low',
    active: false,
    exclusions: [],
  },
];

export const mockTelegramMessages: TelegramMessage[] = [
  {
    id: 'msg-908',
    chatId: '-100194502222',
    text: 'BIN 552341 validada, tarjetas listas para envío. Marca ForxiteBank.',
    capturedAt: '2025-02-14T04:19:40Z',
    link: 'https://t.me/c/194502222/908',
  },
  {
    id: 'msg-909',
    chatId: '-100194502222',
    text: 'ForxiteBank promo falsa - enviar datos por DM.',
    capturedAt: '2025-02-14T04:50:00Z',
    link: 'https://t.me/c/194502222/909',
  },
  {
    id: 'msg-910',
    chatId: '-998855441',
    text: 'Bot Forxite soporte técnico disponible. Link: http://fx-support.io',
    capturedAt: '2025-02-14T06:10:00Z',
  },
];

export const mockNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Nuevo webhook configurado',
    description: 'Canal Slack listo para recibir alertas críticas.',
    severity: 'medium',
    createdAt: '2025-02-13T12:00:00Z',
  },
  {
    id: 'notif-2',
    title: 'Regla Telegram actualizada',
    description: 'Se añadió palabra clave BIN 552341 con severidad alta.',
    severity: 'high',
    createdAt: '2025-02-14T04:30:00Z',
  },
];
