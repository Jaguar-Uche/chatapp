import {useState,useContext } from 'react'
import assets from '../assets/assets'
import {AuthContext} from '../../context/AuthContext'

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const[isDataSubmitted, setIsDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);


      return;
  }
  login(currState==="Sign Up" ? 'signup' : 'login', {
    fullName, email, password,bio
  })
    }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* left */}

      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />
      {/* right */}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>{currState} 
          {isDataSubmitted && <img onClick={()=> setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />}
          </h2>

          {currState === "Sign Up" && !isDataSubmitted && (<input type="text" value={fullName} onChange={(e)=> setFullName(e.target.value)} placeholder='Full Name' name="" id="" className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required  />)}

        {!isDataSubmitted && (
          <>
          <input type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required /> 
          
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required />
          </>
          
        )}        

          {
            currState === "Sign Up" && isDataSubmitted && (
              <textarea value={bio} rows={4} onChange={(e) => setBio(e.target.value)} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Provide a short bio...' required />
            )
          }

          <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
            {currState === "Sign Up" ? "Create Account" : "Login Now"}
          </button>

            {
              currState === "Sign Up" && <div className='flex items-center gap-2 text-sm text-gray-500'>
            <input type="checkbox" required /> 
            <p>I Agree to the terms of use & privacy policy</p>
          </div>
            }
          
          <div className='flex flex-col gap-2 text-center'>
            {currState === "Sign Up" ? 
            (
              <p className='text-sm text-gray-600'>Already Have an account? <span className='font-medium text-violet-500 cursor-pointer' onClick={()=>{setCurrState("Login"); setIsDataSubmitted(false)}}>Login here</span></p>
            )
            :
            (
              <p className='text-sm text-gray-600'>Create Account<span className='font-medium text-violet-500 cursor-pointer' onClick={()=>{setCurrState("Sign Up");setIsDataSubmitted(false)}}>Click here</span></p>
            ) }
          </div>
      </form>
    </div>
  )
}

export default LoginPage