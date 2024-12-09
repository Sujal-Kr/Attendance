import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { server } from "../constants/config";
import { userExists } from "../redux/slices/auth";
function Login() {
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formdata = new FormData(e.target);
		const credentials = {
			email: formdata.get("email"),
			password: formdata.get("password"),
		};
		try {
			const { data } = await axios.post(
				`${server}/api/auth/login`,
				credentials,
				{ withCredentials: true }
			);
			if (data.success) {
				dispatch(userExists(data.user));
				toast.success(data.message);
			}
		} catch (err) {
			toast.error(err.response?.data?.message || err.message);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-signup-background">
			<div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-lg">
				<div>
					<h2 className="text-center text-4xl font-bold text-gray-800">
						Sign in to your account
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<input
								name="email"
								type="email"
								required
								className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
								placeholder="Email address"
							/>
						</div>
						<div>
							<input
								name="password"
								type="password"
								required
								className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
								placeholder="Password"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
						>
							Sign in
						</button>
					</div>
				</form>
				<div className="text-center">
					<Link
						to="/signup"
						className="text-blue-600 hover:text-blue-500 text-sm"
					>
						Don't have an account? Sign up
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
