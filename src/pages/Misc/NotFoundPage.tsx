import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="Página no encontrada"
      subTitle="Revisá la URL o volvé al dashboard para continuar monitoreando la superficie de ataque."
      extra={<Button type="primary" onClick={() => navigate('/')}>Ir al dashboard</Button>}
    />
  );
};
