import { Card, Col, Form, Input, Row, Typography, Button, Checkbox, Space, message } from 'antd';
import { LockOutlined, MailOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setIsAuthenticated, setTwoFactorComplete } = useAppContext();

  const handleSubmit = (values: { email: string; password: string }) => {
    console.log('Login mock', values);
    setIsAuthenticated(true);
    setTwoFactorComplete(false);
    message.success('Credenciales válidas (mock). Requiere 2FA.');
    navigate('/auth/2fa');
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#0b12370d' }}>
      <Col xs={22} sm={16} md={12} lg={8}>
        <Card bordered style={{ borderRadius: 18, boxShadow: '0 20px 40px rgba(11, 18, 55, 0.08)' }}>
          <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Space align="center" size={12}>
              <ThunderboltOutlined style={{ fontSize: 32, color: '#5120ff' }} />
              <div>
                <Typography.Title level={3} style={{ marginBottom: 0 }}>
                  Forxite Intelligence
                </Typography.Title>
                <Typography.Text type="secondary">Inicie sesión para acceder al SOC digital</Typography.Text>
              </div>
            </Space>
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
              <Form.Item name="email" label="Correo" rules={[{ required: true, type: 'email', message: 'Ingrese un correo válido' }]}> 
                <Input prefix={<MailOutlined />} placeholder="tu@empresa.com" size="large" />
              </Form.Item>
              <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'Ingrese su contraseña' }]}> 
                <Input.Password prefix={<LockOutlined />} placeholder="••••••" size="large" />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked" initialValue>
                <Checkbox>Recordarme</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large">
                  Iniciar sesión
                </Button>
              </Form.Item>
            </Form>
            <Typography.Link onClick={() => message.info('Recuperación de contraseña simulada')}>
              ¿Olvidaste la contraseña?
            </Typography.Link>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};
