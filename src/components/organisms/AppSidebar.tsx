import { useState, useMemo } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  AlertOutlined,
  ApiOutlined,
  ShareAltOutlined,
  RobotOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

interface NavigationItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  roles: Array<'admin' | 'analyst' | 'viewer'>;
}

const NAV_ITEMS: NavigationItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined />, path: '/', roles: ['admin', 'analyst', 'viewer'] },
  { key: 'alerts', label: 'Alertas', icon: <AlertOutlined />, path: '/alerts', roles: ['admin', 'analyst', 'viewer'] },
  { key: 'assets', label: 'Activos', icon: <ApiOutlined />, path: '/assets', roles: ['admin'] },
  { key: 'users', label: 'Usuarios y roles', icon: <TeamOutlined />, path: '/users', roles: ['admin'] },
  { key: 'webhooks', label: 'Webhooks', icon: <ShareAltOutlined />, path: '/webhooks', roles: ['admin', 'analyst'] },
  { key: 'automation', label: 'Automatizaciones', icon: <RobotOutlined />, path: '/automation/telegram', roles: ['admin', 'analyst'] },
];

export const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useAppContext();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = useMemo<MenuProps['items']>(() => {
    const filtered = NAV_ITEMS.filter((item) => item.roles.includes(role));
    return filtered.map((item) => ({ key: item.key, icon: item.icon, label: item.label }));
  }, [role]);

  const selectedKey = useMemo(() => {
    const currentItem = NAV_ITEMS.find((item) => location.pathname === item.path || location.pathname.startsWith(item.path));
    return currentItem?.key ?? 'dashboard';
  }, [location.pathname]);

  const handleClick: MenuProps['onClick'] = (event) => {
    const target = NAV_ITEMS.find((item) => item.key === event.key);
    if (target) {
      navigate(target.path);
    }
  };

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={240}
      style={{
        minHeight: '100vh',
        position: 'sticky',
        top: 0,
        overflow: 'auto',
      }}
      theme="dark"
    >
      <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: collapsed ? 16 : 18 }}>
        {collapsed ? 'FX' : 'Forxite'}
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} items={menuItems} onClick={handleClick} />
    </Layout.Sider>
  );
};
