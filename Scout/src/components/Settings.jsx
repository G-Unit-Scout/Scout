import { useState, useEffect } from "react";

const Settings = ({toggleMode, setToggleMode, theme, setTheme, handleToggle}) => {
//   const [toggleMode, setToggleMode] = useState(false);
//   const [theme, setTheme] = useState('dark');



//   const handleToggle = () => {
//     // Toggle the toggleMode state
//     setToggleMode(!toggleMode);
//   };

  return (
    <>
      <div className='flex flex-row ml-[10px] bg-[rgba(22,26,40,255)] rounded-xl' data-theme={theme}>
        <div className='flex flex-col justify-center items-center'>
          <span className="material-symbols-outlined">
            dark_mode
          </span>
        </div>
        <div className='flex flex-col justify-center items-center h-[50px] w-[50px]'>
          <input type="checkbox" className="toggle" checked={toggleMode} onChange={handleToggle}/>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <span className="material-symbols-outlined">
            light_mode
          </span>
        </div>
      </div>
    </>
  );
};

export default Settings;
