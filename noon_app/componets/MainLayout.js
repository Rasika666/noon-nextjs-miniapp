import Head from 'next/head';
import NavBar from './NavBar';

const MainLayout = (props) => (
    <>
        <Head>
            <title>noon</title>
            {/* <!-- font awesome --> */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        </Head>

        
            <main>
                {props.children}
                
            </main>
        
        
    </>
)

export default MainLayout;