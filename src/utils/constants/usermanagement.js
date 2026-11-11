export const manageUserManagementFormNames = {
  USER_MANAGEMENT: `USER_MANAGEMENT`,
  CREATE_USER: `CREATE_USER`,
};

export const userManagementFormFields = {
  [manageUserManagementFormNames.USER_MANAGEMENT]: {
    search: "search",
    searchStatus: "searchStatus",
    plan: "plan",
    plans: "plans",
    normalizedUserName: "normalizedUserName",
    email: "email",
    roleName: "roleName",
    PlanStatus: "PlanStatus",
    planName: "planName",
    reporties: "reporties",
    profileImageName: "profileImageName",
    userStatus: "isActive",
  },
  [manageUserManagementFormNames.CREATE_USER]: {
    plans: "plans",
    firstName: "firstName",
    lastName: "lastName",
    email: "email",
    roleName: "roleName",
    planName: "planName",
    profileImageName: "profileImageName",
    userStatus: "userStatus",
    product: "product",
    productList: "productList",
    defaultProduct: "defaultProduct",
  },
};

export const MANAGE_USER_MANAGEMENT_ROUTES = {
  ADMIN_GROUPS: `admin-groups`,
  ADD_ADMIN_GROUPS: `add-admin-groups`,
  ADD_ADMIN_GROUPS_LINK: `/usermanagement/add-admin-groups`,
  MANAGE_USERS: `manage-users`,
  PLAN_DETAILS: `admin-groups`,
  CREATE_ADMIN_GROUP: `create-admin`,
  CREATE_USERS: `create-users`,
};

export const MANAGE_USER_MANAGEMENT_MENU = [
  {
    id: "adminGroups",
    label: "Admin Groups",
    path: MANAGE_USER_MANAGEMENT_ROUTES.ADMIN_GROUPS,
    contentHeader: "Admin Groups",
    breadCrumbs: [],
    childRoutes: [],
    sideTick: "admin-groups",
  },
  {
    id: "manageUsers",
    label: "Manage Users",
    path: MANAGE_USER_MANAGEMENT_ROUTES.MANAGE_USERS,
    contentHeader: "Manage Users",
    breadCrumbs: [],
    childRoutes: [],
    sideTick: "manage-users",
  },
];
