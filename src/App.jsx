import { useCallback, useState, useEffect, useRef } from 'react'

function App() {

  const [length, setLength] = useState(6);
  const [nums, setNums] = useState(false);
  const [chars, setChars] = useState(false);
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const [dark, setDark] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (nums) str += "1234567890"
    if (chars) str += "!@#$&^{_}@#$^!_"

    for(let i = 1; i <= length; i++){  
      let charIndex = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(charIndex)
    }

    setPassword(pass)
  }, [length, nums, chars, setPassword]);

  useEffect(() => {
    passwordGenerator()
  }, [length, nums, chars, passwordGenerator])

  function copyPassword(){

    passwordRef.current.select();

    if(!password) {
      alert("Nothing to copy!");
      return;
    }

    navigator.clipboard.writeText(password)
    .then(() => {
      console.log("Copied to Clipboard", password);
    })
    .catch((err) => {
      console.log("Failed to copy", err);
      
    });
    
  }

  function passStrength(password){
    if(password.length <= 8 ) return "weak"
    if(!nums) return "weak"
    if(password.length <= 11 && (nums)) return "medium"
    if((nums) && password.length <16 ) return "medium"
    if(password.length >= 16 ) return "strong"  
    if((nums) && (chars) && password.length > 16 ) return "very strong" 
  }

  useEffect(() => {
    if(dark){
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark")
    }

  },[dark] )

  return (
    <>
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-all duration-500">
  <nav className=" h-16 w-full bg-white shadow-md shadow-gray-800 border-b border-gray-200 px-4 flex items-center justify-between dark:bg-gray-900 dark:shadow-md dark:shadow-gray-600 transition-all duration-500">
    <a href="#" className="w-auto">
      <h1 className="text-lg font-bold font-inter text-gray-900 md:text-2xl md:font-bold tracking-tight md:tracking-normal dark:text-white transition-all duration-500">
        Password Generator
      </h1>
    </a>

    <label className="relative inline-flex items-center cursor-pointer mx-4 transition-all duration-500">
  <input type="checkbox" checked={dark} onChange={() => setDark(!dark)} value="" className="sr-only peer hidden" />
  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
       peer-checked:after:translate-x-full peer-checked:after:border-white 
       after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
       after:bg-white after:border-gray-300 after:border after:rounded-full 
       after:h-5 after:w-5 after:transition-all duration-500
       peer-checked:bg-gray-600"></div>
</label>

    
  </nav>

  <div className="flex flex-col items-center h-auto px-4">
    <h1 className="text-2xl sm:text-4xl font-inter text-gray-900 text-center tracking-wide font-bold my-10 sm:my-16 dark:text-white transition-all durationo-500">
      Generate unique and strong password.
    </h1>

    <div className="w-full sm:w-2/3 md:w-1/3 px-6 md:px-10 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8 justify-center bg-white border border-gray-200 rounded-2xl shadow-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-950">
      <div className="flex">
        <input
          className="w-full h-14 sm:h-16 bg-gray-50 border border-gray-300 border-r-0 px-3 sm:px-4 text-lg sm:text-xl rounded-bl-2xl rounded-tl-2xl text-gray-800 hover:border-gray-500 focus:outline-none dark:text-white dark:bg-gray-900 dark:border-gray-950 transition-all duration-500"
          type="text"
          ref={passwordRef}
          placeholder="password"
          value={password}
          readOnly
        />
        <button 
          onClick={copyPassword}
          className="select-none border border-gray-300 px-4 sm:px-6 text-sm sm:text-base font-medium rounded-tr-2xl rounded-br-2xl bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 duration-200 dark:border-none"
        >
          Copy
        </button>
      </div>

      <div className="select-none flex sm:flex-row md:gap-0 md:flex sm:gap-10 items-start sm:items-center">
        <h2 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-white transition-all durationo-500">Generate Password</h2>
        <p className="rounded-xl bg-green-400 text-black text-xs sm:text-xs font-normal py-1 px-2 ml-1 dark:bg-green-600 dark:text-white transition-all durationo-500">
          {passStrength(password)}
        </p>
        <button
          onClick={passwordGenerator} 
          className="select-none md:ml-[125px] ml-[75px] text-blue-600 hover:text-blue-700 active:text-blue-800 focus:outline-none hover:border-b-2 border-blue-600"
        >
          Refresh
        </button>
      </div>

      <div className="select-none flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-white transition-all duration-500">Password Length</h3>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-base rounded-full px-2 cursor-pointer hover:bg-gray-100 dark:border-gray-950 dark:hover:bg-gray-700 text-blue-600 transition-all duration-500">-</span> 
          <input 
            className="cursor-pointer accent-blue-600 focus:outline-none w-32 sm:w-auto " 
            type="range"
            min={6}
            max={24}
            value={length}
            onChange={(e) => {setLength(e.target.value)}}
          />
          <label className="text-gray-700 text-xs sm:text-sm dark:text-white">Length: {length}</label>
          <span className="text-base rounded-full px-[6px] pb-[2px] cursor-pointer hover:bg-gray-100 dark:border-gray-950 dark:hover:bg-gray-700 text-blue-600 transition-all duration-500">+</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-base sm:text-sm text-gray-800">
        <label className="relative inline-flex items-center cursor-pointer">
  <input 
  type="checkbox" 
  defaultChecked={nums}
  onChange={() => setNums((prev) => !prev)}
  className="sr-only peer" />
  <div
    className="group peer bg-white rounded-full duration-300 w-12 h-6 ring-2 ring-gray-400 
           after:duration-300 after:bg-gray-400 peer-checked:after:bg-blue-500 
           peer-checked:ring-blue-500 after:rounded-full after:absolute after:h-4 after:w-4 
           after:top-1 after:left-1 after:flex after:justify-center after:items-center 
           peer-checked:after:translate-x-6 peer-hover:after:scale-95"
  ></div>
  <span className='px-3 text-base select-none text-white transition-all duration-500'>Include Numbers</span>
</label>


        <label className="relative inline-flex items-center cursor-pointer">
  <input 
  type="checkbox" 
  defaultChecked={chars}
  onChange={() => setChars((prev) => !prev)}
  className="sr-only peer" />
  <div
    className="group peer bg-white rounded-full duration-300 w-12 h-6 ring-2 ring-gray-400 
           after:duration-300 after:bg-gray-400 peer-checked:after:bg-blue-500 peer-checked:ring-blue-500 after:rounded-full after:absolute after:h-4 after:w-4 
           after:top-1 after:left-1 after:flex after:justify-center after:items-center 
           peer-checked:after:translate-x-6 peer-hover:after:scale-95"
  ></div>
  <span className='px-3 text-base select-none text-white transition-all duration-500'>Include Symbols</span>
</label>
      </div>
    </div>
  </div>
</div>



  
</>


  )
}


export default App