import { useState } from 'react';
import { useAuthStore } from '../Store/useAuthStore'
import { Eye, EyeOff, Loader, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthLayout } from "../components/AuthLayout";
import toast from 'react-hot-toast';

const Login = () => {
	const { login, isLogingIn } = useAuthStore();
	const [showPassword, setShowPassword] = useState(false);
	const [userData, setUserData] = useState({
		email: "",
		password: ""
	});
	const isAllFieldsFilled = (userData.email && userData.password);

	const isValid = (userData) => {

		if (!(/\S+@\S+.\S/.test(userData.email)))
			return toast.error("Invalid Email...");

		if (userData.password.length < 8)
			return toast.error("Invalid Credential");

		return true;
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		if (isValid(userData) === true)
			login(userData);
	}

	return (
		<>
			<AuthLayout
				title="Welcome Back"
				subtitle="Sign in to your account"
				animationTitle="Welcome Back,"
			>
				<form onSubmit={handleSubmit} className="space-y-6">

					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Email</span>
						</label>
						<div className="relative group">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Mail className="w-5 h-5 text-base-content/40" />
							</div>
							<input
								type="email"
								className="input w-full pl-10 text-sm placeholder-gray-500 focus:outline-none focus:border-white border border-white/30 bg-transparent"
								placeholder="eg: dhanudanush@gmail.com"
								value={userData.email}
								onChange={(e) => setUserData({ ...userData, email: e.target.value })}
							/>
						</div>
					</div>

					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Password</span>
						</label>
						<div className="relative group">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Lock className="w-5 h-5 text-base-content/40" />
							</div>

							<input
								type={showPassword ? "text" : "password"}
								className="input w-full pl-10 pr-10 placeholder-gray-500 text-sm focus:outline-none
													 focus:border-white border border-white/30 bg-transparent"
								placeholder={showPassword ? "eg: dhanu@7421" : "••••••••"}
								value={userData.password}
								onChange={(e) => setUserData({ ...userData, password: e.target.value })}
							/>

							<button
								type="button"
								className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 cursor-pointer 
													group-focus-within:opacity-100 opacity-50 transition-opacity"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<EyeOff className="w-5 h-5 text-base-content/40" />
								) : (
									<Eye className="w-5 h-5 text-base-content/40" />
								)}
							</button>
						</div>
					</div>

					<button type="submit" className={`btn btn-primary w-full transition-opacity 
			${isAllFieldsFilled ? "opacity-100 cursor-pointer" : "opacity-60 cursor-not-allowed"}`}
						disabled={!isAllFieldsFilled}>
						{isLogingIn ? <Loader className="size-6 animate-spin" /> : "Login"}
					</button>
				</form>

				<div className="text-center">
					<p className="text-base-content/60 ">
						Don’t have an account?{" "}
						<Link to="/signup" className="link link-primary">Create Account</Link>
					</p>
				</div>
			</AuthLayout >

		</>

	)
}

export default Login