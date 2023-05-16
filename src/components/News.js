import "./../index.css";
import axios from "axios";
import { useState } from "react";
function News(props) {

    let [state, setData] = useState({
        show_section_one: true,
        loading: false,
        data: [],
        status_code: 400,
        rss_name: ""
    });

    let rss_names = [
        {
            name: "شبکه خبر",
            value: "irinn"
        },
        {
            name: "تسنیم",
            value: "tasnim"
        },
        {
            name: "مهر",
            value: "mehr"
        },
        {
            name: "ایرنا",
            value: "irna"
        },
        {
            name: "میزان",
            value: "mizan"
        },
        {
            name: "ورزش سه",
            value: "varzesh3"
        },
    ];


    let get_rss_name = (event) => {


        setData((last_data) => {
            return {
                ...last_data,
                rss_name: event.target.value
            }
        })


    }

    let get_news = () => {
        setData((last_data) => {
            return {
                ...last_data,
                show_section_one: false,
                loading: true,
            }
        })
        console.log(state);
        axios.get(`https://one-api.ir/rss/?token=201728:645a91c17e142&action=${state.rss_name}`).then((res) => {
            if (res.data.status == 200) {
                setData((last_data) => {
                    return {
                        ...last_data,
                        loading: false,
                        data: res.data.result,
                        status_code: 200,
                    }
                })
            } else {
                setData((last_data) => {
                    return {
                        ...last_data,
                        loading: false,
                        status_code: 404,
                    }
                })
            }

        }).catch((error) => {
            setData((last_data) => {
                return {
                    ...last_data,
                    loading: false,
                    status_code: 404,
                }
            })
        })
    }

    let go_back = () => {
        setData({
            show_section_one: true,
            loading: false,
            data: [],
            status_code: 400,
            rss_name: ""
        });
    }

    return (
        <>

            {
                state.show_section_one == true
                    ?
                    <section className="container h-auto mt-[200px] mx-auto flex flex-col justify-around items-center">
                        <span className="font-bold text-xl">برای دریافت خبر لطفا خبر گذاری خود را مشخص کنید</span>
                        <select onChange={get_rss_name} className="w-96 h-[50px] mt-5 text-right outline-transparent rounded-lg  bg-slate-300 text-white">
                            <option>نام خبر گذاری</option>
                            {
                                rss_names.map((item, index) => {
                                    return (
                                        <option key={index} value={item.value}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                        <button onClick={get_news} className="w-3/12 h-[50px] mt-10 text-white rounded flex justify-center items-center font-bold bg-green-500">دریافت خبر</button>
                    </section>
                    :
                    ""
            }





            {
                state.loading == true
                    ?
                    <section className={`flex container flex-col justify-center items-center  mt-[150px]`}>

                        <div role="status">
                            <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                        <span className="font-bold mt-2">در حال دریافت اطلاعات</span>


                    </section>
                    :
                    ""

            }


            {
                state.status_code == 200
                    ?
                    <section className={`flex container flex-col justify-center items-center  mt-5 mx-auto`}>
                        <section className="w-8/12 h-auto flex flex-col justify-around items-center my-10 border-b-2 pb-10">
                            <p dir="rtl" className="text-lg font-bold text-right">{state.data.title}</p>
                            <p dir="rtl" className="text-lg font-bold text-right">{state.data.description}</p>
                        </section>
                        <section className="w-full h-auto grid grid-cols-2 gap-5">
                            {
                                state.data.item.map((item, index) => {
                                    let item_date = new Date(item.pubDate);
                                    item_date = item_date.toLocaleString("fa", {
                                        timeZone: 'Asia/Tehran',
                                    });
                                    return (
                                        <div key={index} className="w-full h-[200px] flex flex-col justify-around items-end bg-slate-100 box-border p-2 rounded-lg col-span-1">
                                            <p dir="rtl" className="text-lg font-bold text-right">{item.title}</p>
                                            <p dir="rtl" className="text-slate-400 text-right">{item.description}</p>
                                            <div className="w-11/12 flex flex-row-reverse justify-between items-center">
                                                <a href={item.link} className="p-2 bg-sky-300 rounded-md">مشاهده خبر</a>
                                                <span>{item_date}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </section>
                        <button onClick={go_back} className="w-[200px] h-[50px] bg-orange-500 text-white flex justify-center items-center my-5" >برگشت به مرحله قبل</button>
                    </section>
                    :
                    ""
            }



            {
                state.status_code == 404
                    ?
                    <section className={`flex container flex-col justify-center items-center  mt-[120px]`}>
                        <img src="/assets/not_found.png" className="w-[200px] h-[200px] object-contain" alt="" />
                        <span className="text-lg font-bold">مشکل در گرفتن خبر</span>
                        <button onClick={go_back} className="w-[200px] h-[50px] bg-orange-500 text-white flex justify-center items-center my-5" >دریافت خبر جدید</button>
                    </section>
                    :
                    ""
            }
        </>
    )


}




export default News;