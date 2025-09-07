import { useCallback, useState, useEffect } from 'react'

function App() {

  const [length, setLength] = useState(6);
  const [nums, setNums] = useState(false);
  const [chars, setChars] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (nums) str += "1234567890"
    if (chars) str += "!@#$&^{}"

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
    if(password.length <= 11) return "medium"
    if(password.length >= 12 ) return "strong"
  }

  return (
    <>
  <div className="min-h-screen bg-gray-50">
  <nav className="w-full bg-white shadow-sm border-b border-gray-200 py-4 px-4 flex">
    <a href="#" className="w-auto">
      <h1 className="text-2xl font-inter text-gray-900 font-semibold px-4">
        Password Generator
      </h1>
    </a>
  </nav>

  <div className="flex flex-col items-center h-auto">
    <h1 className="text-4xl font-inter text-gray-900 text-center tracking-wide font-bold my-16">
      Generate unique and strong password.
    </h1>

    <div className="w-1/3 px-10 py-8 flex flex-col gap-8 justify-center bg-white border border-gray-200 rounded-2xl shadow-md">
      
      <div className="flex">
        <input
          className="w-full h-16 bg-gray-50 border border-gray-300 border-r-0 px-4 text-xl rounded-bl-2xl rounded-tl-2xl text-gray-800 hover:border-gray-500 focus:outline-none"
          type="text"
          placeholder="password"
          value={password}
          readOnly
        />
        <button 
          onClick={copyPassword} 
          className="border border-gray-300 px-6 text-base font-medium rounded-tr-2xl rounded-br-2xl bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 duration-200"
        >
          Copy
        </button>
      </div>

      <div className="flex gap-6 items-center">
        <h2 className="text-xl font-semibold text-gray-800">Generate Password</h2>
        <p className="rounded-xl bg-green-500 text-white text-sm font-medium py-1 px-3">
          {passStrength(password)}
        </p>
        <button
          onClick={passwordGenerator} 
          className="py-2 px-3 rounded-xl text-blue-600 hover:text-blue-700 active:text-blue-800 focus:outline-none"
        >
          Refresh
        </button>
      </div>

      <div className="flex items-center gap-3">
        <h3 className="text-lg font-medium text-gray-800">Password Length</h3>
        <span className="border border-gray-300 rounded-full px-2 cursor-pointer hover:bg-gray-100">-</span> 
        <input 
          className="cursor-pointer accent-blue-600 focus:outline-none" 
          type="range"
          min={6}
          max={24}
          value={length}
          onChange={(e) => {setLength(e.target.value)}}
        />
        <label className="text-gray-700 text-sm">Length: {length}</label>
        <span className="border border-gray-300 rounded-full px-2 cursor-pointer hover:bg-gray-100">+</span>
      </div>

      <div className="flex gap-8 text-lg text-gray-800">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            defaultChecked={nums}
            onChange={() => setNums((prev) => !prev)}
            className="accent-blue-600"
          />
          <span>Numbers</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            defaultChecked={chars}
            onChange={() => setChars((prev) => !prev)}
            className="accent-blue-600"
          />
          <span>Symbols</span>
        </label>
      </div>

    </div>
  </div>
</div>


  
</>


  )
}


export default App