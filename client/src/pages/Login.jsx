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
			<div className="max-w-xs w-full rounded-xl space-y-8 p-8 shadow-lg border border-gray-300">
				<div>
					<h2 className="text-center  custom-gradient  text-2xl">
						Welcome To SmartRoll
					</h2>
				</div>
				<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm flex flex-col gap-3 text-xs">
					<input
								name="email"
								type="email"
								required
								className="appearance-none rounded-md relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
								placeholder="Email address"
							/>
						<input
								name="password"
								type="password"
								required
								className="appearance-none rounded-md relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
								placeholder="Password"
							/>
					</div>

					<div>
						<button
							type="submit"
							className="btn w-full"
						>
							Login
						</button>
					</div>
				</form>
				<div className="text-center text-xs text-gray-500">
				Don't have an account?
					<Link
						to="/signup"
						className="text-primary hover:text-primary/80 "
					>
						 Sign up
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
