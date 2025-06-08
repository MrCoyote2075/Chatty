import { useState } from 'react'
import { useAuthStore } from '../Store/useAuthStore'
import { Camera, Mail, User, Loader } from 'lucide-react';

const Profile = () => {
   const { isUpdatingProfile, userData, updateProfile } = useAuthStore();
   const [imageUrl, setImageUrl] = useState(null);

   const handleProfile = (e) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);

      fileReader.onload = async () => {
         const base64ImageString = fileReader.result;
         setImageUrl(base64ImageString);
         await updateProfile(base64ImageString);
      }
   }

   return (
      <>
         <div className="h-screen w-full bg-base-100 flex justify-center items-start px-4 pt-20">

            <div className="w-full max-w-lg bg-base-300 rounded-xl p-5 space-y-6 shadow-lg overflow-y-auto max-h-[calc(100vh-5rem)]">

               <div className="text-center">
                  <h1 className="flex justify-center items-center text-2xl font-semibold gap-2">
                     <User className="size-7" />
                     Profile
                  </h1>
                  <p className="mt-1 text-sm">Your Profile Information</p>
               </div>

               <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                     <img
                        src={userData.profilePicture || imageUrl || "/avatar.svg"}
                        alt="Profile"
                        className={`size-32 rounded-full object-cover border-4 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                           }`}
                     />
                     <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200"
                     >
                        {isUpdatingProfile ? (
                           <Loader className="w-5 h-5 text-base-200 animate-spin" />
                        ) : (
                           <Camera className="w-5 h-5 text-base-200" />
                        )}
                        <input
                           type="file"
                           id="avatar-upload"
                           className="hidden"
                           accept="image/*"
                           onChange={handleProfile}
                           disabled={isUpdatingProfile}
                        />
                     </label>
                  </div>
                  <p className="text-sm text-zinc-400 ">
                     {isUpdatingProfile
                        ? "Uploading Please Wait..."
                        : `Click the Camera to Update Your Profile Picture`}
                  </p>
               </div>

               <div className="space-y-4">
                  <div className="space-y-1.5">
                     <div className="text-sm text-zinc-400 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                     </div>
                     <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                        {userData?.fullname}
                     </p>
                  </div>

                  <div className="space-y-1.5">
                     <div className="text-sm text-zinc-400 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                     </div>
                     <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                        {userData?.email}
                     </p>
                  </div>
               </div>

               <div className="bg-base-300 rounded-xl p-4">
                  <h2 className="text-lg font-medium mb-3">Account Information</h2>
                  <div className="space-y-2 text-sm">
                     <div className="flex items-center justify-between border-b border-zinc-700 py-2">
                        <span>Member Since</span>
                        <span>{userData.createdAt?.split("T")[0]}</span>
                     </div>
                     <div className="flex items-center justify-between py-2">
                        <span>Account Status</span>
                        <span className="text-green-500">Active</span>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </>
   );


}

export default Profile