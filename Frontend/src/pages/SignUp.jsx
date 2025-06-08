import { useState } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader, Lock, Mail, User } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";

const SignUp = () => {
	const { signUp, isSigningIn, googleAuth, isGoogleAuthenticating } = useAuthStore();
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

		if (!(/\S+@\S+\.\S+/.test(userData.email)))
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
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isValid(userData) === true)
			signUp(userData);
	};

	return (
		<AuthLayout
			title="Create Account"
			subtitle="Chatty Wants You to Create An Account"
			animationTitle="Welcome,"
		>
			<form onSubmit={handleSubmit} className="space-y-4">

				<div className="form-control">
					<label className="label">
						<span className="label-text font-medium">Full Name</span>
					</label>

					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
							<User className="w-5 h-5 text-base-content/40" />
						</div>

						<input
							type="text"
							className="input input-bordered w-full pl-10 text-sm placeholder:text-base-content/50 bg-base-100"
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

					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10 pointer-events-none">
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

					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10 pointer-events-none">
							<Lock className="w-5 h-5 text-base-content/40" />
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
							className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
							onClick={() => setShowPassword(!showPassword)}
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							{showPassword ? (
								<EyeOff className="w-5 h-5 text-base-content/40" />
							) : (
								<Eye className="w-5 h-5 text-base-content/40" />
							)}
						</button>
					</div>
				</div>

				<button
					type="submit"
					className={`btn btn-primary w-full transition-opacity cursor-pointer
						${isAllFieldsFilled ? "opacity-100 cursor-pointer" : "opacity-60 cursor-not-allowed"}`}
					disabled={!isAllFieldsFilled || isSigningIn}
				>
					{isSigningIn ? <Loader className="size-6 text-neutral-50 animate-spin" /> : "Create Account"}
				</button>

				<div className="text-center space-y-3">
					<p className="text-base-content/60 text-sm">
						Already have an account?{" "}
						<Link to="/login" className="link link-primary">Sign in</Link>
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
							<span className="font-medium">Sign in with Google</span>
						</div>
					</button>


				</div>

			</form>
		</AuthLayout>
	);
};

export default SignUp;
