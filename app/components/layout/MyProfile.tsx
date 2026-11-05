import { useEffect, useState } from "react";
import { API_URL, getAccessToken } from "~/lib/api";
import { useLocation } from 'react-router';

type UserProfile = {
    name: string;
    email: string;
    id: number;
    phone_number: string;
    first_name: string;
    last_name: string;
}

export const MyProfile = () => {
    const { pathname } = useLocation();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isLoading, setLoading] = useState(true);
    const canAuthenticate = pathname === "/chatbot";

    const getUserProfile = async() => {
        try{
            const userDetails = await fetch(`${API_URL}/auth/user-profile`, {
                headers: { Authorization: `Bearer ${getAccessToken()}`, "Content-Type": "application/json" },
            });
            const userData = await userDetails.json();
            setUserProfile(userData);
            setLoading(false)
        } catch(error) {
            console.error("Failed to fetch user profile:", error);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        canAuthenticate && getUserProfile();
    }, [canAuthenticate])

    return (
        <>  
            {canAuthenticate ?
            (isLoading && <p className="text-base font-semibold text-gray-950 dark:text-white sm:text-sm">Loading...</p>) ||
            (userProfile && (
                <div className="flex text-base font-semibold text-gray-950 dark:text-white sm:text-sm items-center justify-center">
                    <div className="text-sm text-white w-8 h-8 rounded-2xl bg-gradient-to-br from-violet-700 to-indigo-700 flex items-center justify-center">
                        <span>
                            {userProfile.first_name.charAt(0).toUpperCase()}{userProfile.last_name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <h2 className="text-gray-950 dark:text-white pl-2">{userProfile.first_name} {userProfile.last_name}</h2>
                </div>
            )) : null}
        </>
    );
};