import Head from "next/head";
import {Breadcrumb, Layout, Menu} from "antd";
const { Header, Content, Footer } = Layout;
import '/styles/layouts/managementLayout.scss'
MyLayout.propTypes = {
}
MyLayout.defaultProps = {
}

function MyLayout(props) {


    return (
        <>
            <Head>
                <title>吞天泡泡龙的管理后台</title>
                <meta name="description" content="吞天泡泡龙的管理后台"/>
                <link rel="icon" href="/my_favicon.ico" />
            </Head>
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo">吞天泡泡龙</div>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <main className="xl-management-layout-main" style={{ padding: 24, minHeight: 380 }}>
                        {props.children}
                    </main>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </>
    )
}

export default MyLayout

export function getManagementLayout(page) {
    return <MyLayout>{page}</MyLayout>
}
