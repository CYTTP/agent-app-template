import {
  Alert,
  App as AntdApp,
  Button,
  Card,
  ConfigProvider,
  Skeleton,
  Space,
  Tag,
  Typography,
} from 'antd';
import { useHealthQuery } from './api/health';

const { Paragraph, Text, Title } = Typography;

export default function App() {
  const { data, error, isLoading, refetch, isFetching } = useHealthQuery();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0f766e',
          colorBgLayout: '#f5f7f4',
          colorBgContainer: '#ffffff',
          borderRadius: 12,
        },
      }}
    >
      <AntdApp>
        <div className="app-shell">
          <Card className="status-card">
            <Space direction="vertical" size={20} style={{ width: '100%' }}>
              <Space align="center">
                <Tag color="cyan">Agent Template</Tag>
                <Text type="secondary">React + NestJS + pnpm workspace</Text>
              </Space>

              <div>
                <Title level={2}>今天心情怎么样?</Title>
              </div>

              {isLoading ? <Skeleton active paragraph={{ rows: 3 }} /> : null}

              {!isLoading && error instanceof Error ? (
                <Alert
                  type="error"
                  message="接口请求失败"
                  description={error.message}
                  showIcon
                />
              ) : null}

              {!isLoading && data ? (
                <Card size="small">
                  <Space direction="vertical" size={12}>
                    <Space>
                      <Text strong>状态</Text>
                      <Tag color="green">{data.data?.status ?? 'unknown'}</Tag>
                    </Space>
                    <Text>服务名：{data.data?.service}</Text>
                    <Text>时间：{data.data?.timestamp}</Text>
                  </Space>
                </Card>
              ) : null}

              <Space>
                <Button type="primary" onClick={() => void refetch()} loading={isFetching}>
                  刷新健康状态
                </Button>
              </Space>
            </Space>
          </Card>
        </div>
      </AntdApp>
    </ConfigProvider>
  );
}
