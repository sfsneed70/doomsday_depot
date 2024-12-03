import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { useLoggedIn } from "../App";

const LoginForm = () => {
    const [_loggedIn, setLoggedIn] = useLoggedIn();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [login, { error, loading }] = useMutation(LOGIN_USER);
    const navigate = useNavigate();

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const { data } = await login({ variables: { ...formData } });
            Auth.login(data.login.token);
            setLoggedIn(true);
            navigate("/");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="space-y-6">
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

            <button
                type="submit"
                className="w-full flex justify-center mx-0 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Loading..." : "Log in"}
            </button>
            {error && <div className="text-red-500 text-sm mt-2">{error.message}</div>}
        </form>
    );
};

export default LoginForm;