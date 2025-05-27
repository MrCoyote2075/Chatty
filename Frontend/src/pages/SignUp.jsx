import { Eye, EyeOff, Lock, Mail, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [userData, setUserData] = useState({
		fullname: "",
		email: "",
		password: ""
	});

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const allFieldsFilled = (userData.fullname && userData.email && userData.password);

	return (
		<div className="min-h-screen grid lg:grid-cols-2">
			<div className="flex flex-col justify-center items-center p-6 sm:p-12">
				<div className="w-full max-w-md space-y-8">

					<div className="text-center mb-8">
						<div className="flex flex-col items-center gap-2 group">
							<div className="size-12 rounded-xl bg-primary/10 
								flex items-center justify-center 
								group-hover:bg-primary/20 transition-colors">
								<MessageSquare className="w-6 h-6 text-primary" />
							</div>
							<h1 className="text-2xl font-bold mt-2">Create Account</h1>
						</div>
					</div>

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
									className="input w-full pl-10 text-sm focus:outline-none focus:border-white border border-white/30 bg-transparent"
									placeholder="eg: John Wick"
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
									className="input w-full pl-10 text-sm focus:outline-none focus:border-white border border-white/30 bg-transparent"
									placeholder="babayaga@gmail.com"
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
									className="input w-full pl-10 pr-10 text-sm focus:outline-none focus:border-white border border-white/30 bg-transparent"
									placeholder="••••••••"
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

						<button
							type="submit"
							className={`my-btn btn btn-primary w-full transition-opacity ${allFieldsFilled ? "opacity-100 cursor-pointer" : "opacity-60 cursor-not-allowed"
								}`}
							disabled={!allFieldsFilled}
						>
							Create Account
						</button>

					</form>

					<div className="text-center">
						<p className="text-base-content/60">
							Already have an account?{" "}
							<Link to="/login" className="link link-primary">
								Sign in
							</Link>
						</p>
					</div>
				</div>
				
			</div>
		</div>
	);
};

export default SignUp;
