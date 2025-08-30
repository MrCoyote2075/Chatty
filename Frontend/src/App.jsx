import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './Store/useAuthStore'
import { useThemeStore } from './Store/useThemeStore';
import { useEffect } from 'react'
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import './App.css'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ThemesLab from './pages/ThemesLab'
import Profile from './pages/Profile'

function App() {
	const { userData, isCheckingAuth, checkAuth } = useAuthStore();
	const { theme } = useThemeStore();

	useEffect(() => {
		checkAuth()
	}, [checkAuth])

	if (isCheckingAuth && !userData)
		return <div className='flex justify-center items-center h-screen'>
			<Loader className="size-14 animate-spin" />
		</div>

	return (
		<>
			<div data-theme={theme}>
				<NavBar />
				<Routes>
					<Route path="/" element={userData ? <HomePage /> : <Navigate to={"/login"} />} />
					<Route path="/signup" element={userData ? <Navigate to={"/"} /> : <SignUp />} />
					<Route path="/login" element={userData ? <Navigate to={"/"} /> : <Login />} />
					<Route path="/ThemesLab" element={<ThemesLab />} />
					<Route path="/profile" element={userData ? <Profile /> : <Navigate to={"/login"} />} />
				</Routes>

				<Toaster />
			</div>
		</>
	)
}
export default App
