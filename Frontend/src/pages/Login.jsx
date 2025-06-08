import { useState } from 'react';
import { useAuthStore } from '../Store/useAuthStore'
import { Eye, EyeOff, Loader, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthLayout } from "../components/AuthLayout";
import toast from 'react-hot-toast';

const Login = () => {
	const { login, isLogingIn, isGoogleAuthenticating, googleAuth } = useAuthStore();
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

						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
								<Mail className="w-5 h-5 text-base-content/40" />
							</div>

							<input
								type="email"
								className="input input-bordered w-full pl-10 text-sm placeholder:text-base-content/50 bg-base-100"
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
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10 pointer-events-none">
								<Lock className="w-5 h-5 text-base-content/70" />
							</div>

							<input
								type={showPassword ? "text" : "password"}
								className="input input-bordered w-full pl-10 pr-10 text-sm placeholder:text-base-content/50 bg-base-100"
								placeholder={showPassword ? "eg: dhanu@7421" : "••••••••"}
								value={userData.password}
								onChange={(e) => setUserData({ ...userData, password: e.target.value })}
							/>

							<button
								type="button"
								className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 cursor-pointer
        									group-focus-within:opacity-100 opacity-60 transition-opacity"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? (
									<EyeOff className="w-5 h-5 text-base-content/70" />
								) : (
									<Eye className="w-5 h-5 text-base-content/70" />
								)}
							</button>
						</div>
					</div>

					<button
						type="submit"
						className={`btn btn-primary w-full transition-opacity 
						${isAllFieldsFilled ? "opacity-100 cursor-pointer" : "opacity-60 cursor-not-allowed"}`}
						disabled={!isAllFieldsFilled || isLogingIn}
					>
						{isLogingIn ? <Loader className="size-6 text-neutral-50 animate-spin" /> : "Login"}
					</button>

					<div className="text-center space-y-3">
						<p className="text-base-content/60 text-sm">
							Don’t have an account?{" "}
							<Link to="/signup" className="link link-primary">Create Account</Link>
						</p>

						<div className="divider text-sm text-base-content/60">or</div>

						<button
							type="button"
							onClick={googleAuth}
							disabled={isGoogleAuthenticating}
							className={`group flex items-center justify-center gap-3 w-full px-4 py-3 rounded-full border border-base-content/30 hover:border-base-content/60
    									transition-all duration-200 bg-base-100 hover:bg-base-200 text-sm text-base-content cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
						>
							<div className="flex gap-3 items-center">
								{isGoogleAuthenticating ? (
									<Loader className="size-5 text-base-content animate-spin" />
								) : (
									<img
										src="/googleLogo.svg"
										width={20}
										alt="Google Logo"
										className="group-hover:animate-bounce transition-all duration-300"
									/>
								)}
								<span className="font-medium">Login with Google</span>
							</div>
						</button>

					</div>
					
				</form>
			</AuthLayout >

		</>

	)
}

export default Login