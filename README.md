# Forxite Intelligence MVP · POC

Plataforma web POC para el MVP de Forxite, una suite de inteligencia accionable enfocada en detectar, gestionar y compartir hallazgos de ciberseguridad (phishing, redes sociales, repositorios, tarjetas comprometidas y automatizaciones Telegram).

## 🚀 Stack
- React 18 + Vite + TypeScript
- Ant Design (design system) + Atomic Design (atoms → molecules → organisms → templates → pages)
- React Router para ruteo protegido
- Datos mockeados y utilidades simuladas para webhooks/automatizaciones

## ✨ Funcionalidades clave
- Autenticación simulada con flujo Login → 2FA (OTP por email) → Acceso
- Gestión de roles (admin, analyst, viewer) con cambio rápido desde el header
- Dashboard con métricas principales y backlog de acciones
- Módulo de alertas con filtros, tabla, detalle, ciclo de vida y exportaciones simuladas
- Creación manual e importación mock (CSV/JSON) de alertas
- Administración de activos y reglas (dominios, redes sociales, keywords)
- Configuración de webhooks y registro de entregas
- Automatizaciones Telegram (chat IDs, reglas, job simulado con dedupe por message_id)
- Notificaciones in-app y layout responsive con branding Forxite

## 📦 Scripts (Yarn)
```bash
yarn install      # instala dependencias
yarn dev          # arranca Vite en modo desarrollo
yarn build        # genera build de producción (tsc + vite)
yarn preview      # sirve la build
```

## 🗂️ Estructura relevante
```
├── src
│   ├── App.tsx
│   ├── main.tsx
│   ├── router.tsx                # Declaración de rutas y guards
│   ├── theme.ts                  # Tokens y paleta Forxite
│   ├── context/AppContext.tsx    # Estado global (auth, rol, notificaciones)
│   ├── data/mockData.ts          # Datos base mockeados
│   ├── types/index.ts            # Tipos compartidos
│   ├── components
│   │   ├── atoms
│   │   ├── molecules
│   │   ├── organisms
│   │   └── templates
│   └── pages                     # Dashboard, Alertas, Activos, Usuarios, etc.
```

## 🔄 Flujos simulados
- **Login/2FA:** el login fija `isAuthenticated`; la pantalla de 2FA habilita el acceso completo.
- **Exportaciones (CSV/PDF):** muestran mensajes de éxito y exponen cómo se integraría la lógica real.
- **Importaciones:** leen el archivo y muestran resultados validados con mocks.
- **Webhooks:** formulario de configuración + tabla con entregas simuladas y estados success/fail.
- **Telegram job:** botón "Ejecutar búsqueda" que recorre mensajes mock y crea alertas evitando duplicados por `message_id`.

## ⚠️ Limitaciones del POC
- No hay backend real ni persistencia: todo vive en memoria.
- 2FA y notificaciones son simuladas (no se envían correos reales).
- Importaciones validan estructura pero no almacenan archivos.
- Exportaciones generan respuestas mock (sin archivos descargables reales).
- Integraciones externas (Telegram, Slack, repositorios) están deshabilitadas; se ilustran con mocks.

## 🧭 Próximos pasos sugeridos
1. Conectar el frontend a un backend real (Nest/Express) con Postgres multi-tenant.
2. Implementar autenticación robusta (OIDC/Keycloak) y 2FA productiva.
3. Integrar pipelines de ingest y normalización de alertas automatizadas (Telegram, PhishTank, Git). 
4. Añadir dashboards analíticos, módulo de investigaciones y API pública según roadmap.

---
Creado como POC visual y de flujo para conversaciones de preventa y validación temprana con clientes Forxite.
