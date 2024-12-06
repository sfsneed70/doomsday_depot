import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import validator from "validator";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
    onSuccess: () => void;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm = ({ onSuccess, setLoggedIn }: RegisterFormProps) => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [addUser, { loading, error }] = useMutation(ADD_USER);
    const navigate = useNavigate();

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setErrorMessage(null);

        // Validation
        if (!validator.isEmail(formData.email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        if (!validator.isLength(formData.password, { min: 8 })) {
            setErrorMessage("Password must be at least 8 characters long.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const { data } = await addUser({ variables: { ...formData } });
            Auth.login(data.addUser.token);
            setLoggedIn(true);
            onSuccess();
            navigate("/");
        } catch (e: unknown) {
            if (e instanceof Error) {
                if (e.message.includes("duplicate key error")) {
                    setErrorMessage("Email is already registered.");
                } else {
                    console.error(e);
                    setErrorMessage("An error occurred. Please try again.");
                }
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        }
    };

    const combinedErrorMessage = errorMessage || (error && error.message);

    return (
        <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                    Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        id="username"
                        type="text"
                        required
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="text-white block w-full px-3 py-2 m-0 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm !important"
                        placeholder="Enter your username"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        placeholder="you@example.com"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        id="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                    Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                        id="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full flex justify-center mx-0 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Loading..." : "Sign Up"}
            </button>

            {combinedErrorMessage && <div className="text-red-500 text-sm mt-2">{combinedErrorMessage}</div>}
        </form>
    );
};

export default RegisterForm;