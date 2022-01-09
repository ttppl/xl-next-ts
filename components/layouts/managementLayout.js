import Head from "next/head";
import {Breadcrumb, Layout, Menu} from "antd";
const { Header, Content, Footer } = Layout;
import '/styles/layouts/managementLayout.scss'
import Icon from "../Icon";
import {createContext, useMemo, useState} from "react";
import Link from "next/link";
import useLoading from "../../hooks/useLoading";
MyLayout.propTypes = {
}
MyLayout.defaultProps = {
}
export const ManagementLayoutContext = createContext(null)
function MyLayout(props) {

    const [activeMenu,setActiveMenu] = useState(['blog'])
    const [position,setPosition] = useState([{name:'主页'}])
    const [loading, setLoading] = useLoading(false, null, {
        containerCssText:'position:fixed;width:100%;height:100%',
        mask: true,
        size: '100',
        maskClose:false,
        label:'努力加载中...'
    })
    const provider = useMemo(()=>{
        return {setActiveMenu,setLoading,setPosition}
    },[setActiveMenu,setLoading,setPosition])

    const menuItemClick = (item)=>{
        if(!activeMenu.includes(item.key)){
            setLoading(true)
        }

    }
    return (
        <>
            <Head>
                <title>吞天泡泡龙的管理后台</title>
                <meta name="description" content="吞天泡泡龙的管理后台"/>
                <link rel="icon" href="/my_favicon.ico" />
            </Head>
            <Layout style={{minHeight: '100vh'}}>
                <Header style={{ position: 'fixed',backgroundColor:'white', zIndex: 10, width: '100%' }}>
                    <div className="xl-management-logo">吞天泡泡龙</div>
                    <Menu theme="light"
                          mode="horizontal"
                          selectedKeys={activeMenu}
                          onClick={menuItemClick}
                    >
                        <Menu.Item key="index"><Link href='/'>主页</Link></Menu.Item>
                        <Menu.SubMenu key="blog" icon={<Icon className='blog'/>} title="博客">
                            <Menu.ItemGroup title="更新">
                                <Menu.Item key="addBlog"><Link href='/management/blog/add'>写博客</Link></Menu.Item>
                                <Menu.Item key="editBlog">编辑博客</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="查询">
                                <Menu.Item key="blogList">博客列表</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                    </Menu>
                </Header>
                <Content className="site-layout" style={{ padding: '0 20px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {position.map(p=>{
                            return <Breadcrumb.Item key={`bread-item-${p.name}`}>{p.name}</Breadcrumb.Item>
                        })}
                    </Breadcrumb>
                    <main className="xl-management-layout-main" style={{ padding: 24, minHeight: 380 }}>
                        <ManagementLayoutContext.Provider value={provider}>
                            {props.children}
                        </ManagementLayoutContext.Provider>
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
