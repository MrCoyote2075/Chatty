import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './Store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import './App.css'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

function App() {
	const { userData, isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth()
	}, [checkAuth])

	if (isCheckingAuth && !userData) 
		return 	<div className='flex justify-center items-center h-screen'>
					<Loader className="size-14 animate-spin" />
				</div>

	return (
		<>
			<NavBar />

			<Routes>
				<Route path="/" element={!userData ? <Navigate to={"/login"} /> : <HomePage />} />
				<Route path="/signup" element={userData ? <Navigate to={"/"} /> : <SignUp />} />
				<Route path="/login" element={userData ? <Navigate to={"/"} /> : <Login />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/profile" element={!userData ? <Navigate to={"/login"} /> : <Profile />} />
			</Routes>

			<Toaster />
		</>
	)
}
export default App
