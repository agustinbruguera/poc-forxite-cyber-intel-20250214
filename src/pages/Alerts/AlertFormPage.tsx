import { Form, Input, Select, Button, Space, message, Checkbox, Upload, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockAssets, mockUsers } from '../../data/mockData';

const categoryOptions = [
  { value: 'social', label: 'Redes sociales' },
  { value: 'repository', label: 'Repositorios' },
  { value: 'phishing', label: 'Phishing' },
  { value: 'cards', label: 'Tarjetas comprometidas' },
];

const severityOptions = [
  { value: 'high', label: 'Alta' },
  { value: 'medium', label: 'Media' },
  { value: 'low', label: 'Baja' },
];

export const AlertFormPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values: unknown) => {
    console.log('Nueva alerta (mock):', values);
    message.success('Alerta creada (simulado)');
    navigate('/alerts');
  };

  const handleImport = (info: { file: File }) => {
    const reader = new FileReader();
    reader.onload = () => {
      message.success(`Importación procesada (${info.file.name})`);
    };
    reader.readAsText(info.file, 'utf-8');
  };

  return (
    <Card title="Crear alerta manual" bordered>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item name="title" label="Título" rules={[{ required: true, message: 'Ingrese el título de la alerta' }]}> 
          <Input placeholder="Resumen corto de la alerta" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Descripción"
          rules={[{ required: true, message: 'Ingrese la descripción detallada' }]}
        >
          <Input.TextArea rows={4} placeholder="Contexto y hallazgos" />
        </Form.Item>

        <Space size="large" wrap style={{ width: '100%' }}>
          <Form.Item name="category" label="Categoría" rules={[{ required: true }]} style={{ minWidth: 220 }}>
            <Select options={categoryOptions} placeholder="Seleccione" />
          </Form.Item>
          <Form.Item name="severity" label="Severidad" rules={[{ required: true }]} style={{ minWidth: 220 }}>
            <Select options={severityOptions} placeholder="Seleccione" />
          </Form.Item>
          <Form.Item name="status" label="Estado" initialValue="new" style={{ minWidth: 220 }}>
            <Select
              options={[
                { value: 'new', label: 'Nueva' },
                { value: 'in_review', label: 'En revisión' },
                { value: 'closed', label: 'Cerrada' },
              ]}
            />
          </Form.Item>
        </Space>

        <Form.Item name="relatedAssets" label="Activos relacionados">
          <Select
            mode="multiple"
            placeholder="Seleccione activos"
            options={mockAssets.map((asset) => ({ value: asset.id, label: asset.label }))}
          />
        </Form.Item>

        <Form.Item name="assignedTo" label="Responsable">
          <Select
            allowClear
            placeholder="Asignar analista"
            options={mockUsers
              .filter((user) => user.role !== 'viewer')
              .map((user) => ({ value: user.name, label: `${user.name} (${user.role})` }))}
          />
        </Form.Item>

        <Form.Item label="Indicadores">
          <Form.List name="indicators" initialValue={['']}>
            {(fields, { add, remove }) => (
              <Space direction="vertical" style={{ width: '100%' }}>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item {...field} rules={[{ required: true, message: 'Ingrese el indicador' }]}> 
                      <Input placeholder="hash, dominio, IP, etc." />
                    </Form.Item>
                    <Button onClick={() => remove(field.name)} type="link" danger>
                      Eliminar
                    </Button>
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()}>Agregar indicador</Button>
              </Space>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item label="Evidencias">
          <Upload.Dragger
            accept=".png,.jpg,.pdf,.txt"
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess?.('ok');
                message.success(`Evidencia ${file.name} cargada (mock)`);
              }, 600);
            }}
            beforeUpload={() => false}
            multiple
            onChange={({ file }) => {
              if (file.status === 'done') {
                message.success(`${file.name} listo (mock)`);
              }
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Arrastre archivos o haga click para subir</p>
            <p className="ant-upload-hint">Tamaño máximo 10MB · sin persistencia real</p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item name="webhook" valuePropName="checked">
          <Checkbox>Enviar notificación vía webhooks configurados</Checkbox>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Crear alerta
            </Button>
            <Button onClick={() => handleImport({ file: new File([''], 'import.csv') })}>
              Importar CSV/JSON (mock)
            </Button>
            <Button onClick={() => form.resetFields()}>Limpiar</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};
