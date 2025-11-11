import { useMemo } from 'react';
import { Layout, Space, Typography, Segmented, Button, Badge, Popover, List, Avatar, Flex } from 'antd';
import { PlusOutlined, BellOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAppContext } from '../../context/AppContext';
import { forxitePalette } from '../../theme';

dayjs.extend(relativeTime);

export const AppHeader = () => {
  const navigate = useNavigate();
  const { role, setRole, notifications, clearNotifications } = useAppContext();

  const notificationContent = useMemo(
    () => (
      <Flex vertical gap={12} style={{ maxWidth: 320 }}>
        <Flex justify="space-between" align="center">
          <Typography.Text strong>Notificaciones</Typography.Text>
          <Button size="small" type="link" onClick={() => clearNotifications()}>
            Limpiar
          </Button>
        </Flex>
        <List
          size="small"
          dataSource={notifications}
          locale={{ emptyText: 'Sin novedades por ahora' }}
          renderItem={(item) => (
            <List.Item style={{ alignItems: 'flex-start' }}>
              <List.Item.Meta
                avatar={<Avatar size={32} style={{ backgroundColor: forxitePalette.primary }}>{item.severity.toUpperCase().charAt(0)}</Avatar>}
                title={item.title}
                description={
                  <Space direction="vertical" size={4}>
                    <Typography.Text type="secondary">{item.description}</Typography.Text>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      {dayjs(item.createdAt).fromNow()}
                    </Typography.Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Flex>
    ),
    [notifications, clearNotifications],
  );

  return (
    <Layout.Header
      style={{
        padding: '0 24px',
        background: '#ffffff',
        borderBottom: '1px solid #eef0fb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Space size={16} align="center">
        <Avatar size={40} style={{ backgroundColor: forxitePalette.secondary }} icon={<ThunderboltOutlined />} />
        <Space direction="vertical" size={0}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Forxite Intelligence
          </Typography.Title>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Monitoreo activo · Tenant "forxite-bank"
          </Typography.Text>
        </Space>
      </Space>
      <Space size={20} align="center">
        <Segmented
          value={role}
          onChange={(value) => setRole(value as typeof role)}
          options={[
            { label: 'Admin', value: 'admin' },
            { label: 'Analista', value: 'analyst' },
            { label: 'Lector', value: 'viewer' },
          ]}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/alerts/new')}
        >
          Nueva alerta
        </Button>
        <Popover placement="bottomRight" arrow={false} content={notificationContent} trigger="click">
          <Badge count={notifications.length} size="small">
            <Button shape="circle" icon={<BellOutlined />} />
          </Badge>
        </Popover>
        <Avatar style={{ backgroundColor: forxitePalette.primary }}>LR</Avatar>
      </Space>
    </Layout.Header>
  );
};
