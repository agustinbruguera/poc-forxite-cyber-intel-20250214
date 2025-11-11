import { Card, Col, Row, Space, Typography, Button, message, Input } from 'antd';
import { CheckCircleOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export const TwoFactorPage = () => {
  const navigate = useNavigate();
  const { setTwoFactorComplete } = useAppContext();

  const handleVerify = (code: string) => {
    console.log('OTP ingresado (mock):', code);
    setTwoFactorComplete(true);
    message.success('Autenticación completada');
    navigate('/');
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#f5f6fb' }}>
      <Col xs={22} sm={16} md={10} lg={6}>
        <Card bordered style={{ borderRadius: 18 }}>
          <Space direction="vertical" size={20} style={{ width: '100%' }}>
            <Space align="center" size={12}>
              <MailOutlined style={{ fontSize: 28, color: '#5120ff' }} />
              <div>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  Verifica tu identidad
                </Typography.Title>
                <Typography.Text type="secondary">
                  Ingresá el código OTP enviado a tu correo corporativo
                </Typography.Text>
              </div>
            </Space>
            <Input.OTP
              length={6}
              formatter={(str) => str.toUpperCase()}
              onChange={(value) => value.length === 6 && handleVerify(value)}
              size="large"
            />
            <Button
              icon={<CheckCircleOutlined />}
              type="primary"
              block
              onClick={() => handleVerify('123456')}
            >
              Confirmar código
            </Button>
            <Typography.Link onClick={() => message.info('Nuevo OTP enviado (mock)')}>
              Reenviar código
            </Typography.Link>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};
