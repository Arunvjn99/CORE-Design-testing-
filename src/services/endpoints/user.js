export const userManagement = {
  getUserDetailsAndRole: "/api/v1/UserManagement/GetUserDetailsAndRole",
  getAllUserDetailsAndRole: "/api/v1/UserRegistration/GetAllUserDetailsAndRole",
  getUserDetailsById: "/api/v1/UserManagement/GetUserDetailsById",
  //getHomePage: "/api/v1/UserRegistration/GetHomePage",
  userProfileImageUpload: "/api/v1/UserManagement/UserProfileImageUpload",
  uploadUserProfile: "/api/v1/UserManagement/UploadUserProfile",
  registerUser: "/api/v1/UserRegistration/RegisterUser",
  resendEmail: "/api/v1/AccountActivation/generate-activation-link",
  expireActivationLink: "/api/v1/AccountActivation/expire-activation-link",
  updateUserStatus: "/api/v1/UserRegistration/UpdateStatusAspNetUsers",
  getUserAddedPlans: "/api/v1/UserManagement/GetAddedPlansForUserManagement",
  getUserPlans: "/api/v1/UserManagement/GetPlansForUser",
  getPlansWithAppliedFilter: "/api/v1/UserManagement/GetUserPlanList",
  updateUser: "/api/v1/UserRegistration/UpdateUser",
  getCompanyClassification: "/api/v1/UserManagement/getCompanyClassification",
  forgotpassword: "/api/v1/UserRegistration/forgot-password-link",
  getActivationLinkHistory: "/api/v1/AccountActivation/activation-link-history",

  getTenantProductList: "/api/v1/UserManagement/GetTenantProducts",
  saveUserDefaultProduct: "/api/v1/UserManagement/SaveUserDefaultProduct",
};

export const UserRegistration = {
  getRoles: "/api/UserRegistration/GetRoles",
  getPlans: "/api/UserRegistration/GetPlans",
  // registerUser: "/api/UserRegistration/RegisterUser",
  // userProfileImageUpload: "/api/UserRegistration/UserProfileImageUpload",
  // uploadUserProfile: "/api/UserRegistration/UploadUserProfile",
  updateAspNetUserRoles: "/api/UserRegistration/UpdateAspNetUserRoles",
  getHomePage: "/api/UserRegistration/GetHomePage",
};
