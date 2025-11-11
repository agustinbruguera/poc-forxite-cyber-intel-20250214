import { Card, DatePicker, Input, Select, Space, Button } from 'antd';
import { FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';

export interface AlertFiltersState {
  keyword?: string;
  severity?: 'low' | 'medium' | 'high';
  category?: 'social' | 'repository' | 'phishing' | 'cards';
  dateRange?: [Dayjs | null, Dayjs | null];
}

interface AlertFiltersProps {
  value: AlertFiltersState;
  onChange: (next: AlertFiltersState) => void;
  onReset: () => void;
}

const severityOptions = [
  { value: 'high', label: 'Alta' },
  { value: 'medium', label: 'Media' },
  { value: 'low', label: 'Baja' },
];

const categoryOptions = [
  { value: 'social', label: 'Redes sociales' },
  { value: 'repository', label: 'Repositorios' },
  { value: 'phishing', label: 'Phishing' },
  { value: 'cards', label: 'Tarjetas comprometidas' },
];

export const AlertFilters = ({ value, onChange, onReset }: AlertFiltersProps) => {
  const handleFieldChange = <K extends keyof AlertFiltersState>(key: K, fieldValue: AlertFiltersState[K]) => {
    onChange({ ...value, [key]: fieldValue });
  };

  return (
    <Card size="small" bordered style={{ marginBottom: 16 }} title={<Space><FilterOutlined />Filtros</Space>}>
      <Space size="middle" wrap>
        <Input.Search
          allowClear
          placeholder="Buscar por palabra clave"
          style={{ width: 240 }}
          value={value.keyword}
          onChange={(event) => handleFieldChange('keyword', event.target.value || undefined)}
        />
        <Select
          allowClear
          placeholder="Severidad"
          options={severityOptions}
          value={value.severity}
          style={{ width: 180 }}
          onChange={(val) => handleFieldChange('severity', val)}
        />
        <Select
          allowClear
          placeholder="Categoría"
          options={categoryOptions}
          value={value.category}
          style={{ width: 220 }}
          onChange={(val) => handleFieldChange('category', val)}
        />
        <DatePicker.RangePicker
          value={value.dateRange}
          onCalendarChange={(dates) => handleFieldChange('dateRange', dates ?? undefined)}
        />
        <Button type="text" icon={<ReloadOutlined />} onClick={onReset}>
          Limpiar
        </Button>
      </Space>
    </Card>
  );
};
