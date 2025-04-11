import React, { useState, useRef, useEffect } from "react";
import { Camera, X, Save, Pencil, AlertCircle } from "lucide-react";
import Navbar from "@/landingPage/NavBar";
import AnimatedBackground from "../Plasma";
import axios from "axios";
import { useUserStore } from "@/stores/useUserStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface UserProfile {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  username: string | null | undefined;
  email: string | null | undefined;
  avatar: string;
}

interface ValidationErrors {
  firstName: string;
  lastName: string;
  username: string;
}

function UserProfileEdit() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    avatar: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ValidationErrors>({
    firstName: "",
    lastName: "",
    username: "",
  });
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    username: false,
  });

  useEffect(() => {
    setProfile({
      firstName: user?.firstName,
      lastName: user?.lastName,
      username: user?.username,
      email: user?.email,
      avatar: user?.avatar || "",
    });
    setTempProfile({
      firstName: user?.firstName,
      lastName: user?.lastName,
      username: user?.username,
      email: user?.email,
      avatar: user?.avatar || "",
    });
  }, [
    user?.firstName,
    user?.lastName,
    user?.username,
    user?.email,
    user?.avatar,
  ]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
        if (!value) return "First name is required";
        if (value.length < 2) return "First name must be at least 2 characters";
        if (value.length > 12) return "First name must be less than 12 characters";
        if (!/^[a-zA-Z\s]*$/.test(value)) return "First name can only contain letters";
        return "";

      case "lastName":
        if (!value) return "Last name is required";
        if (value.length < 2) return "Last name must be at least 2 characters";
        if (value.length > 12) return "Last name must be less than 12 characters";
        if (!/^[a-zA-Z\s]*$/.test(value)) return "Last name can only contain letters";
        return "";

      case "username":
        if (!value) return "Username is required";
        if (!/^[a-z]+-\d{3}$/.test(value)) {
          return "Username must be in lowercase, contain one hyphen and end with 3 numbers";
        }
        return "";

      default:
        return "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    setTempProfile({ ...tempProfile, [field]: value });
    
    if (touched[field as keyof typeof touched]) {
      setErrors({
        ...errors,
        [field]: validateField(field, value),
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    setErrors({
      ...errors,
      [field]: validateField(field, tempProfile[field as keyof UserProfile] as string || ""),
    });
  };

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
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempProfile({ ...tempProfile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "blog_avatar_preset")
  
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/diysvyrv6/image/upload",
          formData
        )
        const imageUrl = res.data.secure_url
        setTempProfile({ ...tempProfile, avatar: imageUrl })
        
      } catch (err) {
        console.error("Image upload failed", err)
        toast.error("Image upload failed", {
          style: {
            border: "1px solid red",
            backgroundColor: "red",
            padding: "16px",
            color: "white",
          },
          iconTheme: {
            primary: "red",
            secondary: "white",
          },
        });
      }
    }
  }

  const handleSave = () => {
    // Validate all fields before saving
    const newErrors = {
      firstName: validateField("firstName", tempProfile.firstName || ""),
      lastName: validateField("lastName", tempProfile.lastName || ""),
      username: validateField("username", tempProfile.username || ""),
    };

    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      username: true,
    });

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== "")) {
      toast.error("Please fix the validation errors", {
        style: {
          border: "1px solid red",
          backgroundColor: "red",
          padding: "16px",
          color: "white",
        },
        iconTheme: {
          primary: "red",
          secondary: "white",
        },
      });
      return;
    }

    const updateProfile = async () => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/user/update-user`,
          {
            firstName: tempProfile.firstName,
            lastName: tempProfile.lastName,
            username: tempProfile.username,
            email: tempProfile.email,
            avatar: tempProfile.avatar,
          },
          {
            headers: {
              ContentType: "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(response.data);
        if (response.status === 200) {
          setProfile(tempProfile);
          navigate("/");
          toast.success("Profile updated successfully!", {
            style: {
              border: "1px solid blue",
              backgroundColor: "blue",
              padding: "16px",
              color: "white",
            },
            iconTheme: {
              primary: "blue",
              secondary: "white",
            },
          });
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile", {
          style: {
            border: "1px solid red",
            backgroundColor: "red",
            padding: "16px",
            color: "white",
          },
          iconTheme: {
            primary: "red",
            secondary: "white",
          },
        });
      }
    };
    updateProfile();
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
    setErrors({
      firstName: "",
      lastName: "",
      username: "",
    });
    setTouched({
      firstName: false,
      lastName: false,
      username: false,
    });
  };

  const getInputClassName = (field: string) => `
    w-full bg-white/10 border rounded-lg py-2 px-3 text-white placeholder-gray-400 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${touched[field as keyof typeof touched] && errors[field as keyof ValidationErrors] 
      ? "border-red-500 focus:ring-red-500" 
      : "border-white/20"}
  `;

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
                    isEditing ? "cursor-pointer" : ""
                  } ${isDragging ? "ring-2 ring-blue-400" : ""}`}
                  onDragOver={isEditing ? handleDragOver : undefined}
                  onDragLeave={isEditing ? handleDragLeave : undefined}
                  onDrop={isEditing ? handleDrop : undefined}
                  onClick={() => isEditing && fileInputRef.current?.click()}
                >
                  {tempProfile.avatar ? (
                    <div className="flex justify-center items-center md:relative">
                      <img
                        src={tempProfile.avatar}
                        alt="Profile"
                        className="w-44 h-44 rounded-full border-2 border-blue-500 object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-44 h-44 bg-gray-800 flex items-center justify-center rounded-full border-2 border-blue-500 text-white">
                      <span className="text-5xl">
                        {tempProfile?.firstName?.charAt(0).toUpperCase()}
                      </span>
                      <span className="text-5xl">
                        {tempProfile?.lastName?.charAt(0).toUpperCase()}
                      </span>
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
                      {isEditing ? "Edit Profile" : "Profile"}
                    </h1>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 flex items-center bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-lg transition-colors"
                      >
                        <Pencil className="w-5 h-5 text-white inline-block mr-1" />
                        <span className="hidden md:block">Edit Profile</span>
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
                        <div>
                          <input
                            type="text"
                            value={tempProfile?.firstName || ""}
                            onChange={(e) => handleInputChange(e, "firstName")}
                            onBlur={() => handleBlur("firstName")}
                            className={getInputClassName("firstName")}
                            placeholder="Enter your first name"
                          />
                          {touched.firstName && errors.firstName && (
                            <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              <span>{errors.firstName}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-white/90">{profile.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Last Name
                      </label>
                      {isEditing ? (
                        <div>
                          <input
                            type="text"
                            value={tempProfile?.lastName || ""}
                            onChange={(e) => handleInputChange(e, "lastName")}
                            onBlur={() => handleBlur("lastName")}
                            className={getInputClassName("lastName")}
                            placeholder="Enter your last name"
                          />
                          {touched.lastName && errors.lastName && (
                            <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              <span>{errors.lastName}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-white/90">{profile.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Username
                      </label>
                      {isEditing ? (
                        <div>
                          <input
                            type="text"
                            value={tempProfile?.username || ""}
                            onChange={(e) => handleInputChange(e, "username")}
                            onBlur={() => handleBlur("username")}
                            className={getInputClassName("username")}
                            placeholder="e.g., john-123"
                          />
                          {touched.username && errors.username && (
                            <div className="flex items-center gap-1 mt-1 text-red-400 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              <span>{errors.username}</span>
                            </div>
                          )}
                        </div>
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