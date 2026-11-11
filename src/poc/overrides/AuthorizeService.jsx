// POC override: replaces the OIDC AuthorizeService (redirected via vite.config.mjs).
// Returns a fixed signed-in user so production components render without a login.
const POC_USER = {
  name: "POC User",
  given_name: "POC",
  family_name: "User",
  role: "ADMINISTRATOR",
  defaultTenantProduct: "",
  sub: "poc-user",
};

export class AuthorizeService {
  async isAuthenticated() { return true; }
  async getUser() { return POC_USER; }
  async getAccessToken() { return "poc-token"; }
  async signIn() { return { status: "success" }; }
  async completeSignIn() { return { status: "success" }; }
  async signOut() { return { status: "success" }; }
  async completeSignOut() { return { status: "success" }; }
  updateState() {}
  subscribe() { return 0; }
  unsubscribe() {}
  notifySubscribers() {}
  async ensureUserManagerInitialized() {}
}

const authService = new AuthorizeService();
export default authService;
export const AuthenticationResultStatus = { Redirect: "redirect", Success: "success", Fail: "fail" };
