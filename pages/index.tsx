import Head from 'next/head'
import '/styles/Home.css'
import {getDefaultLayout} from "../components/layouts/main";
import {NextPageWithLayout} from "./_app";


export async function getStaticProps(context:any) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
const Home: NextPageWithLayout = () => {
  return (
    <div className='container'>
      <Head>
        <title>吞天泡泡龙的主页</title>
        <meta name="description" content="吞天泡泡龙的主页"/>
        <link rel="icon" href="/my_favicon.ico" />
      </Head>

      <main className='main'>
        main大大闪电发货
      </main>

      {/*<footer className={styles.footer}>*/}
      {/*  <a*/}
      {/*    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Powered by{' '}*/}
      {/*    <span className={styles.logo}>*/}
      {/*      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />*/}
      {/*    </span>*/}
      {/*  </a>*/}
      {/*</footer>*/}
    </div>
  )
}

Home.layout = getDefaultLayout

export default Home
