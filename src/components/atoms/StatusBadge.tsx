import { Tag } from 'antd';
import type { AlertStatus } from '../../types';

const STATUS_COLOR: Record<AlertStatus, string> = {
  new: 'geekblue',
  in_review: 'gold',
  closed: 'green',
};

const STATUS_LABEL: Record<AlertStatus, string> = {
  new: 'Nueva',
  in_review: 'En revisión',
  closed: 'Cerrada',
};

interface StatusBadgeProps {
  status: AlertStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <Tag color={STATUS_COLOR[status]}>{STATUS_LABEL[status]}</Tag>;
};
