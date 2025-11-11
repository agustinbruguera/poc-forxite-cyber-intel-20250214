import { useMemo, useState } from 'react';
import { Button, message, Space, Table, Tag, Tooltip, Typography } from 'antd';
import { EyeOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { AlertFilters, AlertFiltersState } from '../../components/molecules/AlertFilters';
import { mockAlerts, mockAssets } from '../../data/mockData';
import type { Alert } from '../../types';
import { StatusBadge } from '../../components/atoms/StatusBadge';

const severityColor = {
  high: 'red',
  medium: 'orange',
  low: 'blue',
};

export const AlertsListPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<AlertFiltersState>({});

  const filteredAlerts = useMemo(() => {
    return mockAlerts.filter((alert) => {
      if (filters.severity && alert.severity !== filters.severity) return false;
      if (filters.category && alert.category !== filters.category) return false;
      if (filters.keyword && !`${alert.title} ${alert.description}`.toLowerCase().includes(filters.keyword.toLowerCase())) return false;
      if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
        const created = dayjs(alert.createdAt);
        if (!created.isBetween(filters.dateRange[0], filters.dateRange[1], 'day', '[]')) {
          return false;
        }
      }
      return true;
    });
  }, [filters]);

  const handleExport = (format: 'csv' | 'pdf') => {
    message.success({ content: `Exportación ${format.toUpperCase()} generada (simulada).`, duration: 2 });
  };

  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
      render: (_: string, alert: Alert) => (
        <Space direction="vertical" size={0}>
          <Typography.Link onClick={() => navigate(`/alerts/${alert.id}`)}>{alert.title}</Typography.Link>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {alert.category.toUpperCase()} · {alert.source}
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Severidad',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: Alert['severity']) => <Tag color={severityColor[severity]}>{severity.toUpperCase()}</Tag>,
    },
    {
      title: 'Activos vinculados',
      dataIndex: 'relatedAssets',
      key: 'relatedAssets',
      render: (assetIds: string[]) => (
        <Space wrap>
          {assetIds.map((assetId) => {
            const asset = mockAssets.find((item) => item.id === assetId);
            return asset ? <Tag key={assetId}>{asset.label}</Tag> : null;
          })}
        </Space>
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status: Alert['status']) => <StatusBadge status={status} />,
    },
    {
      title: 'Creada',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => dayjs(createdAt).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: unknown, alert: Alert) => (
        <Space>
          <Tooltip title="Ver detalle">
            <Button icon={<EyeOutlined />} type="link" onClick={() => navigate(`/alerts/${alert.id}`)} />
          </Tooltip>
          <Tooltip title="Actualizar estado">
            <Button icon={<EditOutlined />} type="link" onClick={() => message.info('Actualización simulada')} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={16}>
      <AlertFilters
        value={filters}
        onChange={setFilters}
        onReset={() => setFilters({})}
      />
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Typography.Text type="secondary">Mostrando {filteredAlerts.length} de {mockAlerts.length} alertas</Typography.Text>
        <Space>
          <Button icon={<DownloadOutlined />} onClick={() => handleExport('csv')}>
            Exportar CSV
          </Button>
          <Button icon={<DownloadOutlined />} onClick={() => handleExport('pdf')}>
            Exportar PDF
          </Button>
        </Space>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredAlerts}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </Space>
  );
};
