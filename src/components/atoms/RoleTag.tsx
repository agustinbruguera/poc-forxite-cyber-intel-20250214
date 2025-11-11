import { Tag } from 'antd';
import type { UserRole } from '../../types';

const ROLE_META: Record<UserRole, { label: string; color: string }> = {
  admin: { label: 'Admin', color: 'magenta' },
  analyst: { label: 'Analista', color: 'blue' },
  viewer: { label: 'Lector', color: 'default' },
};

interface RoleTagProps {
  role: UserRole;
}

export const RoleTag = ({ role }: RoleTagProps) => {
  const meta = ROLE_META[role];
  return <Tag color={meta.color}>{meta.label}</Tag>;
};
