import React from "react";

const AttendanceSheet = ({ sheet }) => {
	return (
		<div className="w-full p-5 bg-gray-100 rounded-lg shadow-md">
			<h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
				Attendance Sheet
			</h2>
			<form>
				<table className="min-w-full border-collapse border border-gray-300 mb-4">
					<thead>
						<tr className="bg-gray-200">
							<th className="border border-gray-300 p-3 text-left">Name</th>
							<th className="border border-gray-300 p-3 text-left">Email</th>
							<th className="border border-gray-300 p-3 text-left">Status</th>
						</tr>
					</thead>
					<tbody>
						{sheet?.map((student, index) => (
							<tr
								key={index}
								className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
							>
								<td className="border border-gray-300 p-3 text-gray-700">
									{student?.details?.name}
								</td>
								<td className="border border-gray-300 p-3 text-gray-700">
									{student?.details?.email}
								</td>
								<td className="border border-gray-300 p-3">
									{student?.status}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</form>
		</div>
	);
};

export default AttendanceSheet;
