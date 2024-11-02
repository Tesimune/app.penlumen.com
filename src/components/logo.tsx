import { SiSololearn } from 'react-icons/si';

interface LogoProps {}

const Logo: React.FC<LogoProps> = (props) => (
  <div className='grid justify-center items-center w-full'>
    <div className='flex justify-center text-slate-600 border p-4 rounded-full'>
      <span className='flex justify-center font-extrabold text-xl'>
        {/* <SiSololearn className='h-9 w-9' /> */}
      </span>
    </div>
    <span className='text-xs text-slate-600 font-bold'>Penlumen</span>
  </div>
);

export default Logo;
