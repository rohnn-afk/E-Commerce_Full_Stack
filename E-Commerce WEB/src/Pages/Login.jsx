import { useContext, useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";





const Login = () => {



  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Login");

  const[name,setName] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')

  const {token ,setToken ,backendUrl} = useContext(shopContext)






  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if(currentState == 'Sign Up')
        {
           const response = await axios.post(backendUrl + '/api/user/createuser',{name,email,password})
          console
           if(response.data.success)
            {
              toast.success(response.data.message)
              setToken(response.data.token)
              localStorage.setItem('token',token)
              return
           }
           else
           {
              return toast.error(response.data.message)
           }
        }
        else{
          const response = await axios.post(backendUrl + '/api/user/login',{email,password})

          if(response.data.success)
          {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
            toast.success('user logged-in')
            navigate('/')
            // console.log(response.data)
          }
          else
          {
            toast.error(response.data.message)
          }
        }
      
      }
      catch(error) 
      {
        toast.error(error.response.data.message)
        // console.log(error)
      }
    
  };

  useEffect(() => {
    console.log(token)
  if(token){
    navigate('/')
  }
  }, [token])
  




  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 "
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10 ">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
          value={name}
          required
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        required
      />
      <div className="w-full justify-between mt-[-8px] text-sm flex">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create Account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
