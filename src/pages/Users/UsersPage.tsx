import { Button, Card, Space, Table, Tag, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { mockUsers } from '../../data/mockData';
import { RoleTag } from '../../components/atoms/RoleTag';

export const UsersPage = () => {
  return (
    <Card
      title="Usuarios del tenant"
      extra={
        <Space>
          <Button icon={<PlusOutlined />} type="primary" onClick={() => message.success('Usuario creado (mock)')}>
            Invitar usuario
          </Button>
        </Space>
      }
    >
      <Table
        rowKey="id"
        dataSource={mockUsers}
        pagination={false}
        columns={[
          {
            title: 'Nombre',
            dataIndex: 'name',
            render: (name: string, user) => (
              <Space direction="vertical" size={0}>
                <Typography.Text strong>{name}</Typography.Text>
                <Typography.Text type="secondary">{user.email}</Typography.Text>
              </Space>
            ),
          },
          {
            title: 'Rol',
            dataIndex: 'role',
            render: (role: string) => <RoleTag role={role as 'admin' | 'analyst' | 'viewer'} />,
          },
          {
            title: 'Último acceso',
            dataIndex: 'lastLogin',
            render: (value: string) => new Date(value).toLocaleString('es-AR'),
          },
          {
            title: '2FA',
            dataIndex: 'factorEnabled',
            render: (enabled: boolean) => <Tag color={enabled ? 'green' : 'volcano'}>{enabled ? 'Activo' : 'Pendiente'}</Tag>,
          },
          {
            title: 'Acciones',
            key: 'actions',
            render: (_, user) => (
              <Space>
                <Button type="link" onClick={() => message.info(`Editar ${user.name} (mock)`) }>
                  Editar
                </Button>
                <Button type="link" danger onClick={() => message.warning('Se revocaron permisos (mock)')}>
                  Revocar
                </Button>
              </Space>
            ),
          },
        ]}
      />
    </Card>
  );
};
