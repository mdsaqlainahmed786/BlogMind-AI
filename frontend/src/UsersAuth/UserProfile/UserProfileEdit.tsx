import React, { useState, useRef } from 'react';
import { Camera, X, Save, Pencil } from 'lucide-react';
import Navbar from '@/landingPage/NavBar';
import AnimatedBackground from '../Plasma';

interface UserProfile{
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string;
}

function UserProfileEdit() {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Sarah',
    lastName: 'Connors',
    username: 'sarah-831',
    email: 'sarahconnors@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempProfile({ ...tempProfile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempProfile({ ...tempProfile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar Section */}
              <div className="md:w-1/3">
                <div
                  className={`relative rounded-full overflow-hidden ${
                    isEditing ? 'cursor-pointer' : ''
                  } ${isDragging ? 'ring-2 ring-blue-400' : ''}`}
                  onDragOver={isEditing ? handleDragOver : undefined}
                  onDragLeave={isEditing ? handleDragLeave : undefined}
                  onDrop={isEditing ? handleDrop : undefined}
                  onClick={() => isEditing && fileInputRef.current?.click()}
                >
                  {tempProfile.avatar ? (
                    <div className='flex justify-center items-center md:relative'>
                        <img
                          src={tempProfile.avatar}
                          alt="Profile"
                          className="w-44 h-44 rounded-full border-2 border-blue-500 object-cover"
                        />
                    </div>
                  ) : (
                    <div className="w-44 h-44 bg-gray-800 flex items-center justify-center rounded-full border-2 border-blue-500 text-white">
                    <span className='text-5xl'>{tempProfile.firstName.charAt(0).toUpperCase()}</span>
                      <span className='text-5xl'>{tempProfile.lastName.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Camera className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                )}
              </div>

              {/* Profile Info Section */}
              <div className="flex-1 w-full">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                      {isEditing ? 'Edit Profile' : 'Profile'}
                    </h1>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 flex items-center bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-lg transition-colors"
                      >
                        <Pencil className="w-5 h-5 text-white inline-block mr-1" />
                       <span className='hidden md:block'>Edit Profile</span> 
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleCancel}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-white" />
                        </button>
                        <button
                          onClick={handleSave}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Save className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        First Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.firstName}
                          onChange={(e) =>
                            setTempProfile({
                              ...tempProfile,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-white/90">{profile.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Last Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.lastName}
                          onChange={(e) =>
                            setTempProfile({
                              ...tempProfile,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-white/90">{profile.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Username
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.username}
                          onChange={(e) =>
                            setTempProfile({
                              ...tempProfile,
                              username: e.target.value,
                            })
                          }
                          className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-white/90">@{profile.username}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Email
                      </label>
                      <p className="text-white/90">{profile.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileEdit;