import "./../index.css";
import axios from "axios";
import { PureComponent } from "react";


class Translate extends PureComponent {

    state = {
        show_section_one: true,
        text_box_dir: "rtl",
        loading: false,
        data: "",
        status_code: 400,
        user_text: "",
    }

    change_text_box_dir() {
        if (this.state.text_box_dir == "rtl") {
            this.setState({
                text_box_dir: "ltr"
            });
        } else if (this.state.text_box_dir == "ltr") {
            this.setState({
                text_box_dir: "rtl"
            });
        }
    }

    back_to_section_one() {
        this.setState({
            show_section_one: true,
            data: "",
            status_code: 400,
        });
    }


    get_user_text(event) {

        this.setState({
            user_text: event.target.value
        });

    }

    translate_to_en() {
        this.setState({
            show_section_one: false,
            loading: true,
        });
        axios.get(`https://one-api.ir/translate/?token=201728:645a91c17e142&action=google&lang=en&q=${this.state.user_text}`).then((res) => {
            if (res.data.status == 200) {
                this.setState({
                    status_code: 200,
                    data: res.data.result,
                })
            } else {
                this.setState({
                    status_code: 404,
                })
            }
            this.setState({
                loading: false,
            })
        }).catch((error) => {
            this.setState({
                status_code : 404,
                loading : false,
            })   
        })

    }
    translate_to_fa() {
        this.setState({
            show_section_one: false,
            loading: true,
        });
        axios.get(`https://one-api.ir/translate/?token=201728:645a91c17e142&action=google&lang=fa&q=${this.state.user_text}`).then((res) => {
            if (res.data.status == 200) {
                this.setState({
                    status_code: 200,
                    data: res.data.result,
                    loading: false,
                })
            } else {
                this.setState({
                    status_code: 404,
                    loading: false,
                })
            }

        }).catch((error) => {
            this.setState({
                status_code: 404,
                loading: false,
            })
        })

    }

    render() {
        return (
            <>


                {
                    this.state.show_section_one
                        ?
                        <section className="container h-[400px] mt-[50px] mx-auto flex flex-col justify-around items-center">
                            <span className="font-bold text-xl"> متن خودت رو وارد کن و بعد ترجمش کن</span>
                            <textarea onChange={this.get_user_text.bind(this)} className={`${this.state.text_box_dir == 'rtl' ? 'text-right' : 'text-left'} bg-slate-300 w-8/12 h-4/6 resize-none rounded-md outline-transparent box-border p-2`} value={this.state.user_text}></textarea>
                            <div className="w-8/12 h-1/6 flex justify-around items-center gap-5">
                                <button onClick={this.translate_to_fa.bind(this)} className="w-3/12 h-5/6 rounded flex justify-center items-center font-bold bg-green-500">ترجمه به فارسی</button>
                                <button onClick={this.translate_to_en.bind(this)} className="w-3/12 h-5/6 rounded flex justify-center items-center font-bold bg-blue-500">ترجمه به انگلیسی</button>
                                <button onClick={this.change_text_box_dir.bind(this)} className="w-3/12 h-5/6 rounded flex justify-center items-center font-bold bg-orange-500">تغییر جهت نوشتن</button>
                            </div>
                        </section>
                        :
                        ""
                }


                {
                    this.state.loading
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
                    this.state.status_code == 200
                        ?
                        <section className="container h-[400px] mt-[50px] mx-auto flex flex-col justify-around items-center">
                            <p className={`${this.state.text_box_dir == 'rtl' ? 'text-left' : 'text-right'}  bg-slate-300 w-8/12 h-auto box-border p-2 rounded`}>{this.state.data}</p>
                            <button onClick={this.back_to_section_one.bind(this)} className="w-8/12 rounded-lg h-1/6 bg-green-500 text-white flex justify-center items-center ">برگشت به مرحله قبل</button>
                        </section>
                        :
                        ""
                }

                {
                    this.state.status_code == 404
                        ?
                        <section className={`flex container flex-col justify-center items-center  mt-[120px]`}>
                            <img src="/assets/not_found.png" className="w-[200px] h-[200px] object-contain" alt="" />
                            <span className="text-lg font-bold">مشکل در تر جمه متن</span>
                            <button onClick={this.back_to_section_one.bind(this)} className="w-[200px] h-[50px] bg-orange-500 text-white flex justify-center items-center my-5" >دوباره امتحان کن</button>
                        </section>
                        :
                        ""
                }


            </>
        )
    }

}


export default Translate;