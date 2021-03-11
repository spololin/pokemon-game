import Footer from "./components/AppFooter";
import Header from "./components/AppHeader";
import Layout from "./components/AppLayout";
import backgroundImg from './assets/bg2.jpg'

function App() {
    return (
        <>
            <Header title="This is header title" descr="This is header description"/>
            <Layout title="This is layout1 title" descr="This is layout1 description" urlBg={backgroundImg}/>
            <Layout title="This is layout2 title" descr="This is layout2 description" colorBg="green"/>
            <Layout title="This is layout3 title" descr="This is layout3 description" urlBg={backgroundImg}/>
            <Footer/>
        </>
    );
}

export default App
