import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
// import { DevTool } from "@hookform/devtools";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { authContext } from "../App";

const usernameOptions = {
    required: "username is required",
    minLength: {
        value: 5,
        message: "Username must be at least 5 characters"
    },
    maxLength: {
        value: 12,
        message: "Username must be at most 12 characters"
    }
}

const passwordOptions = {
    required: "Password is required",
    minLength: {
        value: 5,
        message: "Password must be at least 5 characters"
    },
    maxLength: {
        value: 16,
        message: "Password must be at most 16 characters"
    }
}

function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const { setIsLoggedIn } = useContext(authContext);

    // uncomment this to use devtool
    // const { register, handleSubmit, formState: { errors }, control } = useForm();

    // comment this to use devtool
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { username, password } = data;
        if (username === "admin" && password === "admin") {
            setIsLoggedIn(true);
        }else{
            toast.error("Invalid username or password")
        }
    }


    return (
        <div className="flex justify-center items-center h-screen bg-slate-100">
            <div className="bg-white p-4 rounded-lg shadow-md w-[400px]">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <div>
                        <label>username</label>
                        <input {...register("username", usernameOptions)} type="text" placeholder="username" className="w-full p-2 rounded-md border border-gray-300" />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>
                    <div>
                        <label>password</label>
                        <div className="relative">
                            <input {...register("password", passwordOptions)} type={showPassword ? "text" : "password"} placeholder="password" className="w-full p-2 rounded-md border border-gray-300" />
                            <span className="absolute top-1/2 transform -translate-y-1/2 right-[16px]" onClick={() => setShowPassword((oldVal) => !oldVal)}>
                                {
                                    showPassword ?
                                        <EyeSlashIcon className="w-[20px] h-[20px]" />
                                        :
                                        <EyeIcon className="w-[20px] h-[20px]" />
                                }
                            </span>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{`error: ${errors.password.message}`}</p>}
                    </div>
                    <div className="w-full mt-6">
                        <button className="w-full bg-gray-950 text-white py-3 flex justify-center items-center rounded-md hover:bg-gray-900 hover:border-4 hover:border-pink-600">Login</button>
                    </div>
                </form>
            </div>
            {/* <DevTool control={control} /> */}
        </div>
    )
}

export default Login