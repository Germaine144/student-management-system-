"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  Edit,
  Camera,
} from "lucide-react";
import { getMyProfile, updateMyProfile } from "@/lib/api";
import { UserProfile } from "@/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import toast from "react-hot-toast";
import ProfileForm from "./profileForm";

export default function StudentDashboardPage() {
  const { data: session, update: updateSession } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login?callbackUrl=/profile");
    },
  });

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (session?.user?.accessToken) {
      try {
        setIsLoading(true);
        const profileData = await getMyProfile(session.user.accessToken);
        setProfile(profileData);
        setPreviewUrl(profileData.profilePicture || "/default-avatar.png");
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch profile data.");
      } finally {
        setIsLoading(false);
      }
    }
  }, [session]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /**
   * This function handles the ENTIRE update process. It is passed to the ProfileForm
   * and is triggered when the user clicks "Save Changes".
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
      setProfile((prev) =>
        prev ? { ...prev, profilePicture: reader.result as string } : null
      );
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = async (formData: Partial<UserProfile>) => {
    if (!session?.user?.accessToken) return;

    setIsLoading(true);
    try {
      const updatedProfile = await updateMyProfile(
        {
          ...formData,
          profilePicture: previewUrl || undefined,
        },
        session.user.accessToken
      );

      setProfile(updatedProfile);

      if (formData.name && formData.name !== session.user.name) {
        await updateSession({ name: formData.name });
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="text-center mt-10 animate-pulse">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {isEditing ? "Edit Your Profile" : "My Dashboard"}
        </h1>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="w-auto flex items-center gap-2"
          >
            <Edit size={16} />
            Update Profile
          </Button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border">
            <Image
              src={previewUrl || "/default-avatar.png"}
              alt="Profile"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
            {isEditing && (
              <label
                htmlFor="profile-upload"
                className="absolute bottom-1 right-1 bg-white p-1 rounded-full cursor-pointer flex items-center justify-center"
              >
                <Camera size={18} />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  aria-label="Upload profile picture"
                />
              </label>
            )}
          </div>
        </div>

        {isEditing ? (
          <ProfileForm
            initialData={profile}
            onSubmit={handleUpdateProfile}
            onCancel={() => setIsEditing(false)}
            isLoading={isLoading}
          />
        ) : (
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold mb-4">{profile.name}</h2>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail size={20} />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone size={20} />
              <span>
                {profile.phone || <i className="text-gray-400">Not provided</i>}
              </span>
            </div>
            <hr className="my-4" />
            <div className="flex items-center gap-3 text-gray-700">
              <BookOpen size={20} />
              <span>
                <strong>Course:</strong>{" "}
                {profile.course || (
                  <i className="text-gray-400">Not specified</i>
                )}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Calendar size={20} />
              <span>
                <strong>Enrollment Year:</strong>{" "}
                {profile.enrollmentYear || (
                  <i className="text-gray-400">Not specified</i>
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
