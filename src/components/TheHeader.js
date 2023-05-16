import "./../index.css";
import { Link , useLocation } from "react-router-dom";


function TheHeader(props) {

    


    return (
        <>
            <header className="w-full h-[60px] text-white bg-slate-800 flex justify-center items-center">
                <section className="container h-5/6 mx-auto flex justify-between items-center">
                    <span className="font-bold text-lg">ابزارک</span>
                    <div className="w-auto h-full flex flex-row-reverse justify-around items-center">
                        <Link to="/" className={`${useLocation().pathname === '/' ? 'text-white border-b-2'  : 'text-slate-300'}  mx-3`}>صفحه نخست</Link>
                        <Link to="/azan" className={`${useLocation().pathname === '/azan' ? 'text-white border-b-2'  : 'text-slate-300'}  mx-3`}>اذان</Link>
                        <Link to="/translate" className={`${useLocation().pathname === '/translate' ? 'text-white border-b-2'  : 'text-slate-300'}  mx-3`}>ترجمه</Link>
                        <Link to="/danestani" className={`${useLocation().pathname === '/danestani' ? 'text-white border-b-2'  : 'text-slate-300'}  mx-3`}>دانستنی</Link>
                        <Link to="/joke" className={`${useLocation().pathname === '/joke' ? 'text-white border-b-2'  : 'text-slate-300'}  mx-3`}>لطیفه</Link>
                        <Link to="/news" className={`${useLocation().pathname === '/news' ? 'text-white border-b-2'  : 'text-slate-300'}  mx-3`}>آخرین خبر</Link>
                    </div>
                </section>
            </header>
        </>
    )
}


export default TheHeader;