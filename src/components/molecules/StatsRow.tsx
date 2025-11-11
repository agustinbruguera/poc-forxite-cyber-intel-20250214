import { Card, Col, Progress, Row, Statistic, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

export interface MetricItem {
  key: string;
  label: string;
  value: number;
  unit?: string;
  trend?: number;
  description?: string;
}

interface StatsRowProps {
  metrics: MetricItem[];
}

export const StatsRow = ({ metrics }: StatsRowProps) => {
  return (
    <Row gutter={[16, 16]}>
      {metrics.map((metric) => {
        const isPositive = (metric.trend ?? 0) >= 0;
        return (
          <Col xs={24} md={12} lg={6} key={metric.key}>
            <Card bordered hoverable>
              <Statistic
                title={metric.label}
                value={metric.value}
                suffix={metric.unit}
                valueStyle={{ fontWeight: 600 }}
              />
              {metric.description && (
                <Typography.Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
                  {metric.description}
                </Typography.Paragraph>
              )}
              {metric.trend !== undefined && (
                <Typography.Text type={isPositive ? 'success' : 'danger'} style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 12 }}>
                  {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  {Math.abs(metric.trend)}% vs. última semana
                </Typography.Text>
              )}
              {metric.label.toLowerCase().includes('cierre') && (
                <Progress
                  percent={Math.min(100, metric.value)}
                  size="small"
                  strokeColor={isPositive ? '#2bc48a' : '#ff6b6b'}
                  style={{ marginTop: 12 }}
                />
              )}
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};
