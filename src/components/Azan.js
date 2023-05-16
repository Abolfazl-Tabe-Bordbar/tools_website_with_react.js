import "./../index.css";
import axios from "axios";
import { PureComponent } from "react";
import JDate  from "jalali-date";


class Azan extends PureComponent{

    state = {
        show_section_one : true,
        loading : false,
        city_name : "",
        data : [],
        status_code : 400,
        today_date : ""
    }

    get_city_name(event){
       
        this.setState({
            city_name : event.target.value
        })
    }

    get_data() {
        this.setState({
            show_section_one : false,
            loading : true,
        });
        axios.get(`https://one-api.ir/owghat/?token=201728:645a91c17e142&city=${this.state.city_name}&en_num=false`).then((res) => {
            if (res.data.status == 200) {
                const jdate = new JDate;
                this.setState({
                    status_code : 200,
                    data : res.data.result,
                    today_date : jdate.format('dddd DD MMMM YYYY')
                })
            }else{
                this.setState({
                    status_code : 404,
                })   
            }
            this.setState({
                loading : false,
            })
                 
        }).catch((error) => {
            this.setState({
                status_code : 404,
                loading : false,
            })   
        })
        
   
    }

    back_to_section_one(){
        this.setState({
            show_section_one : true,
            data : [],
            status_code : 400,
        })
    }

    render(){
        return (
            <>
                <main className="w-full h-auto flex justify-center items-center">
    
                    <section className={`${this.state.show_section_one ? 'flex' : 'hidden'} container flex-col justify-center items-center  mt-[150px]`}>
                        <span className="text-xl font-bold">چند قدم کوتاه تا بدست آوردن اوقات شرعی شهر تو</span>
                        <input type="text" className="w-[300px] h-[50px] my-5 text-center rounded-lg outline-transparent border-2 border-gray-400" onChange={this.get_city_name.bind(this)} placeholder="نام شهر تو" />
                        <button onClick={this.get_data.bind(this)} className="w-64 p-2 bg-green-400 rounded-lg text-lg font-bold my-5 text-white flex justify-center items-center ">نمایش اوقات شرعی</button>
                    </section>
    
                    {
                        this.state.loading
                        ?
                            <section className={`flex container flex-col justify-center items-center  mt-[150px]`}>
                                
                                <div role="status">
                                    <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
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
                            <section className={`flex h-[400px] container flex-col justify-center items-center my-10`}>
                                <section className="w-full h-1/6 flex flex-row-reverse justify-between items-center">
                                    <div className="font-bold text-xl flex flex-row-reverse justify-around items-center">
                                        <img src="/assets/speaker.png" className="w-10 h-10 object-contain ml-2" alt="" />
                                        <span>اوقات شرعی { this.state.data.city }</span> 
                                    </div>
                                    <div className="font-bold text-xl flex justify-around items-center">
                                        <img src="/assets/calendar.png" className="w-10 h-10 object-contain" alt="" />
                                        <span>{ this.state.today_date }</span> 
                                    </div>
                                </section>
                                <section className="w-full h-5/6 rounded-lg shadow-stone-600 bg-white flex justify-around items-center">
                                    <section className="w-4/12 h-4/6 flex justify-center items-center">
                                        <img src="/assets/azan.png" className="w-full h-full object-contain" alt="" />
                                    </section>
                                    <section className="w-7/12 h-full flex flex-col justify-around items-center gap-5">
                                        <div dir="rtl" className="w-full h-5/6 font-bold grid grid-rows-2 grid-cols-4 gap-5">
                                            <div className="w-full h-full border rounded-lg col-span-1 flex flex-col justify-around items-center">
                                                <span>{this.state.data.azan_sobh}</span>
                                                <span>اذان صبح</span>
                                            </div>
                                            <div className="w-full h-full border rounded-lg col-span-1 flex flex-col justify-around items-center">
                                                <span>{ this.state.data.toloe_aftab }</span>
                                                <span>طلوع آفتاب</span>
                                            </div>
                                            <div className="w-full h-full border rounded-lg col-span-1 flex flex-col justify-around items-center">
                                                <span>{ this.state.data.azan_zohre }</span>
                                                <span>اذان ظهر</span>
                                            </div>
                                            <div className="w-full h-full border rounded-lg col-span-1 flex flex-col justify-around items-center">
                                                <span>{ this.state.data.ghorob_aftab }</span>
                                                <span>غروب آفتاب</span>
                                            </div>
                                           
                                            <div className="w-full h-full border rounded-lg col-span-1 flex flex-col justify-around items-center">
                                                <span>{ this.state.data.azan_maghreb }</span>
                                                <span>اذان مغرب</span>
                                            </div>
                                            <div className="w-full h-full border rounded-lg col-span-1 flex flex-col justify-around items-center">
                                                <span>{ this.state.data.nime_shabe_sharie }</span>
                                                <span>نیمه شب شرعی</span>
                                            </div>
                                        </div>
                                        <button onClick={this.back_to_section_one.bind(this)} className="w-full h-1/6 bg-green-500 text-white flex justify-center items-center " >تغییر شهر</button>
                                    </section>
                                </section>
                            </section>
                            :
                            ""
                   }

                   {
                        this.state.status_code == 404
                        ?
                            <section className={`flex container flex-col justify-center items-center  mt-[120px]`}>
                                    <img src="/assets/not_found.png" className="w-[200px] h-[200px] object-contain" alt="" />
                                    <span className="text-lg font-bold">مشکل در پیدا کردن اوقات شرعی شهر تو</span>
                                    <p className="text-slate-400 my-2">شاید اسم شهر تو اشتباه تایپ کردی</p>
                                    <button onClick={this.back_to_section_one.bind(this)} className="w-[200px] h-[50px] bg-orange-500 text-white flex justify-center items-center my-5" >تغییر شهر</button>
                            </section>
                        :
                            ""
                   }
    
                </main>
            </>
        )
    }

}


export default Azan;