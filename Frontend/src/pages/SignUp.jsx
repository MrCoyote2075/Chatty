import { useState } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader, Lock, Mail, User } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";

const SignUp = () => {
	const { signUp, isSigningIn } = useAuthStore();
	const [showPassword, setShowPassword] = useState(false);
	const [userData, setUserData] = useState({
		fullname: "",
		email: "",
		password: ""
	});
	const isAllFieldsFilled = (userData.fullname && userData.email && userData.password);

	const isValid = (userData) => {
		if (!(userData.fullname.trim()))
			return toast.error("Invalid Fullname...");

		if (!(/\S+@\S+.\S/.test(userData.email)))
			return toast.error("Invalid Email...");

		if (userData.password.length < 8)
			return toast.error("Password: Minimum 8 Characters");

		let strengthCount = 0;

		if (/[a-z]/.test(userData.password)) strengthCount++;
		if (/[0-9]/.test(userData.password)) strengthCount++;
		if (/[!@#$%^&*()<>?;:"',|{}]/.test(userData.password)) strengthCount++;

		if (strengthCount < 2)
			return toast.error("Password is Weak...");

		return true;
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		if (isValid(userData) === true)
			signUp(userData);
	};

	return (
		<>
			<AuthLayout
				title="Create Account"
				subtitle="Chatty Wants You to Create An Account"
				animationTitle="Welcome,"
			>
				<form onSubmit={handleSubmit} className="space-y-6">

					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Full Name</span>
						</label>
						<div className="relative group focus-within:border-white">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<User className="w-5 h-5 text-base-content/40" />
							</div>
							<input
								type="text"
								className="input w-full pl-10 text-sm placeholder-gray-500 focus:outline-none focus:border-white border border-white/30 bg-transparent"
								placeholder="eg: Dhanu Dhanush"
								value={userData.fullname}
								onChange={(e) => setUserData({ ...userData, fullname: e.target.value })}
							/>
						</div>
					</div>

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
								className="input w-full pl-10 pr-10 placeholder-gray-500 text-sm focus:outline-none focus:border-white border border-white/30 bg-transparent"
								placeholder={showPassword ? "eg: dhanu@7421" : "••••••••"}
								value={userData.password}
								onChange={(e) => setUserData({ ...userData, password: e.target.value })}
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 cursor-pointer group-focus-within:opacity-100 opacity-50 transition-opacity"
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
						{isSigningIn ? <Loader className="size-6 animate-spin" /> : "Create Account "}
					</button>
				</form>

				<div className="text-center">
					<p className="text-base-content/60">
						Already have an account?{" "}
						<Link to="/login" className="link link-primary">Sign in</Link>
					</p>
				</div>
			</AuthLayout>

		</>
	);
};

export default SignUp;
