import Head from "next/head";
import {Breadcrumb, Button, Layout, Menu, Spin} from "antd";

const {Header, Content, Footer} = Layout;
import '/styles/layouts/managementLayout.scss'
import Icon from "../Icon";
import {createContext, useEffect, useMemo, useState} from "react";
import Link from "next/link";
import {parseCookie} from "../../utils/libs/cookieParser";
import useGlobalLoading from "../../hooks/useGlobalLoading";

MyLayout.propTypes = {}
MyLayout.defaultProps = {}

export const ManagementLayoutContext = createContext(null)

function MyLayout(props) {
    useGlobalLoading(false)
    const [activeMenu, setActiveMenu] = useState(['blog'])
    const [position, setPosition] = useState([{name: '主页'}])
    const [loading, setLoading] = useState(false)
    const provider = useMemo(() => {
        return {setActiveMenu, setLoading, setPosition}
    }, [setActiveMenu, setLoading, setPosition])

    const menuItemClick = (item) => {
        if (!activeMenu.includes(item.key)) {
            setActiveMenu(item.keyPath)
            setLoading(true)
        }

    }
    const [userName,setUserName]=useState(props.userName||'吞天泡泡龙')
    useEffect(()=>{
        const name =parseCookie(document.cookie).user?.userName
        if(name){
            setUserName(name)
        }
    },[])
    return (
        <>
            <Head>
                <title>吞天泡泡龙的管理后台</title>
                <meta name="description" content="吞天泡泡龙的管理后台"/>
                <link rel="icon" href="/my_favicon.ico"/>
            </Head>
            <Layout style={{minHeight: '100vh'}}>
                <Header style={{position: 'fixed', backgroundColor: 'white', zIndex: 10, width: '100%'}}>
                    <div className="xl-management-logo">{userName}</div>
                    <Menu theme="light"
                          mode="horizontal"
                          overflowedIndicator={<Icon className='more'/>}
                          selectedKeys={activeMenu}
                          onClick={menuItemClick}
                    >
                        <Menu.Item key="index"><Link href='/management'>主页</Link></Menu.Item>
                        <Menu.SubMenu key="blog" icon={<Icon className='blog'/>} title="博客">
                            <Menu.ItemGroup title="更新">
                                <Menu.Item key="addBlog"><Link href='/management/blog/add'>写博客</Link></Menu.Item>
                                <Menu.Item key="editBlog"><Link href='/management/blog/edit/1'>编辑博客</Link></Menu.Item>
                                <Menu.Item key="editBlogSearch"><Link href='/management/blog/idEdit'>ID编辑博客</Link></Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="查询">
                                <Menu.Item key="blogList"><Link href='/management/blog/blogList'>博客列表</Link></Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="args" icon={<Icon className='blog'/>} title="参数">
                            <Menu.ItemGroup title="树">
                                <Menu.Item key="categoryTree"><Link href='/management/category/categoryTree'>目录树</Link></Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="列表">
                                <Menu.Item key="categoryList"><Link href='/management/category/categoryList'>目录列表</Link></Menu.Item>
                                <Menu.Item key="tagList"><Link href='/management/tag/tagList'>标签列表</Link></Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                    </Menu>
                </Header>
                <Content className="site-layout" style={{padding: '0 20px', marginTop: 64}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        {position.map(p => {
                            return <Breadcrumb.Item key={`bread-item-${p.name}`}>{p.name}</Breadcrumb.Item>
                        })}
                    </Breadcrumb>
                    <Spin spinning={loading} tip='加载中'>
                        <main className="xl-management-layout-main" style={{padding: 24, minHeight: 380}}>
                            <ManagementLayoutContext.Provider value={provider}>
                                {props.children}
                            </ManagementLayoutContext.Provider>
                        </main>
                    </Spin>
                </Content>
                <Footer style={{textAlign: 'center'}}>xl-next-app ©2021 Created by ttppl</Footer>
            </Layout>
        </>
    )
}

export default MyLayout

export function getManagementLayout(page,props) {
    return <MyLayout {...props}>{page}</MyLayout>
}
