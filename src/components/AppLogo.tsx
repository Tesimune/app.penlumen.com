import { SiSololearn } from 'react-icons/si';
import React from 'react';

interface AppLogoProps {
}

const AppLogo: React.FC<AppLogoProps> = (props) => (
    <div className="grid justify-center items-center w-full">
      <div className="flex justify-center text-slate-600 h-fit w-full border p-3 rounded-full">
        <span className="flex justify-center font-extrabold text-xl">
          <SiSololearn />
        </span>
      </div>
    </div>
)
export default AppLogo;
