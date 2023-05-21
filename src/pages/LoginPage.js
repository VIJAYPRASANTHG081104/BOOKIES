import './LoginPage.css';
import { useState } from 'react';
import { storeUserData } from '../services/storage';
import { LoginApi } from '../services/api';
import { isAuthenticated } from '../services/Auth';
import { Link , Navigate } from 'react-router-dom';




export default function LoginPage (){

    const initialStateErrors = {
        
        email:{required:false},
        password:{required:false},
        custom_error:null
    
    };
 const [errors,setErrors] = useState(initialStateErrors);
 const[loading,setLoading] = useState(false);

 const handleSubmit = (event)=>{
    console.log(inputs);
    event.preventDefault();    
    let errors ={...initialStateErrors} ;
    let hasError = false;

    if(inputs.email === ""){
       errors.email.required =true;
       hasError=true;
    }
    if(inputs.password === ""){
       errors.password.required =true;
       hasError=true;
    }
   if (hasError!==true){
       setLoading(true)
    //    loginapi
       LoginApi(inputs).then((response)=>{
            storeUserData(response.data.idToken);
       }).catch((err)=>{
          if (err.Code = "ERR_BAD_REQUEST"){
            setErrors({...errors,custom_error:"INVALID CREDENTIALS"})
          }
          
       }).finally(()=>{
           setLoading(false)
       })
   }

    setErrors(errors);
}
const [inputs,setInputs] = useState({
    email:"",
    password:""
})
const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
}
if(isAuthenticated()){
    //redirect user to dashboard
    //installed react-router-dom for redirection
      return <Navigate to="/dashboard"/> //change the current location
   }
    return(
        <section className="login-block">
            <div className="container">
                <div className="row ">
                    <div className="col login-sec">
                        <h2 className="text-center">Login Now</h2>
                        <form onSubmit={handleSubmit} className="login-form" action="">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                            <input type="email"   className="form-control" onChange={handleInput} name="email"  id="" placeholder="email"  />
                            { errors.email.required?
                            (<span className="text-danger" >
                            Email is required.
                        </span>):null
                           }
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                            <input  className="form-control"  type="password" onChange={handleInput}   name="password" placeholder="password" id="" />
                            { errors.password.required?
                            (<span className="text-danger" >
                            password is required.
                        </span>):null
                           }
                        </div>
                        <div className="form-group">
                        {loading ?
                        (<div  className="text-center">
                          <div className="spinner-border text-primary " role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>):null 
                        }
                            <span className="text-danger" >
                        {errors.custom_error?
                           (<p>{errors.custom_error}</p>):null
                        }
                        </span>
                            <input  type="submit" className="btn btn-login float-right" disabled={loading} value="Login"/>
                        </div>
                        <div className="clearfix"></div>
                        <div className="form-group">
                        Create new account ? Please <Link to="/register">Register</Link>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}