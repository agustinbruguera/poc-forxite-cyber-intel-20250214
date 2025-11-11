import { Navigate, useRoutes } from 'react-router-dom';
import { DashboardShell } from './components/templates/DashboardShell';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { AlertsListPage } from './pages/Alerts/AlertsListPage';
import { AlertDetailPage } from './pages/Alerts/AlertDetailPage';
import { AlertFormPage } from './pages/Alerts/AlertFormPage';
import { AssetsPage } from './pages/Assets/AssetsPage';
import { UsersPage } from './pages/Users/UsersPage';
import { WebhooksPage } from './pages/Webhooks/WebhooksPage';
import { TelegramAutomationPage } from './pages/Automation/TelegramAutomationPage';
import { LoginPage } from './pages/Auth/LoginPage';
import { TwoFactorPage } from './pages/Auth/TwoFactorPage';
import { NotFoundPage } from './pages/Misc/NotFoundPage';
import { useAppContext } from './context/AppContext';

export const AppRoutes = () => {
  const { isAuthenticated, isTwoFactorComplete } = useAppContext();

  const requireAuth = (element: JSX.Element) => {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" replace />;
    }
    if (!isTwoFactorComplete) {
      return <Navigate to="/auth/2fa" replace />;
    }
    return element;
  };

  return useRoutes([
    {
      path: '/auth/login',
      element: !isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />,
    },
    {
      path: '/auth/2fa',
      element:
        isAuthenticated && !isTwoFactorComplete ? (
          <TwoFactorPage />
        ) : isAuthenticated && isTwoFactorComplete ? (
          <Navigate to="/" replace />
        ) : (
          <Navigate to="/auth/login" replace />
        ),
    },
    {
      path: '/',
      element: requireAuth(<DashboardShell />),
      children: [
        { index: true, element: <DashboardPage /> },
        { path: 'alerts', element: <AlertsListPage /> },
        { path: 'alerts/new', element: <AlertFormPage /> },
        { path: 'alerts/:id', element: <AlertDetailPage /> },
        { path: 'assets', element: <AssetsPage /> },
        { path: 'users', element: <UsersPage /> },
        { path: 'webhooks', element: <WebhooksPage /> },
        { path: 'automation/telegram', element: <TelegramAutomationPage /> },
      ],
    },
    { path: '*', element: <NotFoundPage /> },
  ]);
};
