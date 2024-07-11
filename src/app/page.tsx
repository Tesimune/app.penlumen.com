import LoginLinks from '@/app/LoginLinks'
import Link from 'next/link';
import {FaFacebookSquare, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaTwitch} from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md'
import { SiMinutemailer } from 'react-icons/si'


export const metadata = {
  title: 'Penlumen - Welcome',
};

const Home = () => {
    return (
      <>
        <div className="flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
          {/* <LoginLinks /> */}

           <section className="header p-7 md:p-10 bg-gray-50flex items-center justify-center font-[poppins]">
                <div className="wrapper md:w-2/3 mx-auto text-zinc-600 space-y-9">
                    {/* <div className="grid justify-center p-3">
                        <AppLogo />
                    </div> */}
                    <h2 className='md:text-5xl text-3xl font-bold text-center capitalize leading-[1.2]'>
                        the Writers Hub for genius minds
                    </h2>
                    <p className='text-md md:text-lg text-center mx-auto  '>
                        Create, Share and Earn with <span className='font-semibold'>Writer</span>.
                        Equipped with FREE tools to help make your creative journey a success.
                        It offers ACCESS to tools to improve and assist you in writing error free contents.
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch text-center sm:items-center gap-5 justify-center">
                        <Link href='login' className='py-3 px-3 md:px-10 border rounded-lg capitalize'>
                            get started
                        </Link>
                        <Link href='register' className='py-3 px-3 md:px-10 bg-blue-900 text-white rounded-lg capitalize'>
                            join the community
                        </Link>
                    </div>

                    {/* <form className="flex items-center">
                        <label className="sr-only">subscribe</label>
                        <div className="relative w-full">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <MdOutlineMail className="w-5 h-5 text-gray-500" />
                            </div>
                            <input type="eamil" id="simple-subscribe" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3" placeholder="subscribe" required />
                        </div>
                        <button type="submit" className="p-3 ml-2 text-sm font-medium text-white bg-blue-900 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            <SiMinutemailer className="w-5 h-5" />
                            <span className="sr-only">subscribe</span>
                        </button>
                    </form> */}

                    <div className="flex items-center gap-5 text-2xl pt-10 justify-center text-zinc-500">
                        <a href="#"><FaFacebookSquare /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaLinkedin /></a>
                        <a href="#"><FaEnvelope /></a>
                    </div>

                </div>
            </section>
        </div>
      </>
    );
}

export default Home
