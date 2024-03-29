import { useState } from "react";

const ChangePassword = ({ userId, handlePasswordChange, currentPassword, setCurrentPassword, newPassword, setNewPassword, setChangePassword, theme}) => {
	

	console.log(userId);

	// const handlePasswordChange = async () => {
	// 	try {
	// 		let response = await fetch(
	// 			`https://scouttestserver.onrender.com/api/changePassword`,
	// 			{
	// 				method: "PATCH",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify({
	// 					user_id: userId,
	// 					oldPassword: currentPassword,
	// 					newPassword: newPassword,
	// 				}),
	// 			}
	// 		);

	// 		if (response.ok) {
	// 			let resData = await response.json();
	// 			console.log("password was changed", resData);
	// 		} else {
	// 			console.log("failed to change password");
	// 		}
	// 	} catch (error) {
	// 		console.log(error.stack);
	// 	}
	// };

	return (
		<>
			<div className="flex flex-col justify-center items-center h-screen w-absolute" data-theme={theme}>
				<div className="flex flex-col items-center h-[530px] w-[600px] absolute bg-[rgba(13,15,74,255)] rounded-xl">
					<div className="flex flex-col justify-center items-center bg-[rgba(239,110,71,255)] h-[120px] w-[600px] rounded-t-xl">
						<span className="text-[40px] font-bold text-white">
							Change Password
						</span>
					</div>

					<div className="flex flex-col justify-center items-center h-[300px] w-[600px] bg-[rgba(13,15,74,255)] mt-[40px]">
						<div className="flex flex-col bg-[rgba(13,15,74,255)] h-[100px] w-[500px]">
							<span className="text-white">Current Password</span>
							<input
								id="current password"
								value={currentPassword}
								onChange={(e) =>
									setCurrentPassword(e.target.value)
								}
								className="placeholder-gray-500 border border-gray-300 p-2 mb-2 rounded-xl mt-[3px] bg-[rgba(22,26,40,255)]"
								type="text"
								placeholder="Enter current password"
							/>
						</div>
						<div className="flex flex-col justify-center items-center h-[300px] w-[600px] bg-[rgba(13,15,74,255)] mt-[40px]">
							<div className="flex flex-col bg-[rgba(13,15,74,255)] h-[100px] w-[500px]">
								<span className="text-white">
									{" "}
									New Password
								</span>
								<input
									id="new password"
									value={newPassword}
									onChange={(e) =>
										setNewPassword(e.target.value)
									}
									className="placeholder-gray-500 border border-gray-300 p-2 rounded-xl mt-[3px] bg-[rgba(22,26,40,255)]"
									type="password"
									placeholder="Enter new password"
								/>
							</div>

							<div className="mt-3">
								<button
									onClick={() => {
                                        handlePasswordChange();
                                        setChangePassword(false);
                                    }}
									className="h-[50px] w-[500px] bg-[rgba(239,110,71,255)] rounded-xl"
								>
									<span className="text-white ">Submit</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChangePassword;
