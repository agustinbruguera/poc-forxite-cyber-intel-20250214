import { Layout, Breadcrumb, Typography } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { AppHeader } from '../organisms/AppHeader';
import { AppSidebar } from '../organisms/AppSidebar';

const breadcrumbMap: Record<string, string[]> = {
  '/': ['Dashboard'],
  '/alerts': ['Alertas'],
  '/alerts/new': ['Alertas', 'Nueva alerta'],
  '/alerts/:id': ['Alertas', 'Detalle'],
  '/assets': ['Activos'],
  '/users': ['Usuarios y roles'],
  '/webhooks': ['Webhooks'],
  '/automation/telegram': ['Automatizaciones', 'Telegram'],
};

const getBreadcrumbTrail = (path: string): string[] => {
  if (breadcrumbMap[path]) return breadcrumbMap[path];
  if (path.startsWith('/alerts/')) return breadcrumbMap['/alerts/:id'];
  return ['Dashboard'];
};

export const DashboardShell = () => {
  const location = useLocation();
  const trail = getBreadcrumbTrail(location.pathname);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSidebar />
      <Layout>
        <AppHeader />
        <Layout.Content style={{ margin: '24px', padding: 24, background: '#ffffff', borderRadius: 16 }}>
          <Breadcrumb style={{ marginBottom: 16 }}>
            {trail.map((crumb) => (
              <Breadcrumb.Item key={crumb}>{crumb}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <Typography.Title level={3} style={{ marginBottom: 24 }}>
            {trail[trail.length - 1]}
          </Typography.Title>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
