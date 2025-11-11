import { useMemo } from 'react';
import { Button, Card, Empty, List, Space, Tabs, Typography, message } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { mockAssets } from '../../data/mockData';

const tabItems = [
  { key: 'domain', label: 'Dominios' },
  { key: 'social', label: 'Redes sociales' },
  { key: 'keyword', label: 'Keywords' },
  { key: 'brand', label: 'Marcas' },
  { key: 'repository', label: 'Repositorios' },
];

export const AssetsPage = () => {
  const assetsByType = useMemo(() => {
    return tabItems.reduce<Record<string, typeof mockAssets>>( (acc, tab) => {
      acc[tab.key] = mockAssets.filter((asset) => asset.type === tab.key);
      return acc;
    }, {} as Record<string, typeof mockAssets>);
  }, []);

  const handleImport = () => {
    message.success('Importación de activos ejecutada (simulada)');
  };

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Card
        bordered
        title="Activos monitoreados"
        extra={
          <Space>
            <Button icon={<UploadOutlined />} onClick={handleImport}>
              Importar CSV/JSON
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              Nuevo activo
            </Button>
          </Space>
        }
      >
        <Tabs
          defaultActiveKey="domain"
          items={tabItems.map((tab) => ({
            key: tab.key,
            label: `${tab.label} (${assetsByType[tab.key]?.length ?? 0})`,
            children: assetsByType[tab.key] && assetsByType[tab.key].length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={assetsByType[tab.key]}
                renderItem={(asset) => (
                  <List.Item
                    actions={[
                      <Button key="edit" type="link" onClick={() => message.info('Editar activo (mock)')}>
                        Editar
                      </Button>,
                      <Button key="delete" type="link" danger onClick={() => message.success('Activo actualizado (mock)')}>
                        Quitar
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={asset.label}
                      description={
                        <Typography.Text type="secondary">
                          {asset.metadata ? Object.entries(asset.metadata).map(([key, value]) => `${key}: ${value}`).join(' · ') : 'Sin metadatos'}
                        </Typography.Text>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty description="Sin activos registrados" />
            ),
          }))}
        />
      </Card>
    </Space>
  );
};
