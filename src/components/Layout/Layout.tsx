import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  FireOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.svg';

const { Header, Sider, Content } = Layout;

type LayoutAppProps = {
  children: React.ReactNode;
}

export default function LayoutApp({ children }: LayoutAppProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Link to="/">
          <div className="logo">
            <img src={Logo} loading="lazy" style={{ width: 50, margin: 16 }} />
          </div>
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          style={{}}
          items={[
            {
              key: '1',
              icon: <FireOutlined />,
              label: <Link to="/posts">Posts</Link>,
            },
            {
              key: '2',
              icon: <PictureOutlined />,
              label: <Link to="/albums">Albums</Link>,
            },
            {
              key: '3',
              icon: <UnorderedListOutlined />,
              label: <Link to="/todos">Todos</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ paddingLeft: 10, color: '#fff' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}

        </Header>
        <Content
          style={{
            margin: '4px 16px',
            padding: 24,
            minHeight: "100vh",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
