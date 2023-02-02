import adminProvider from "@data-access/admin-provider";
import useJavaServiceInstance from "../useJavaServiceModel";
const model = "admin";
const provider = adminProvider;
const admin = useJavaServiceInstance({ model, provider });
export default admin;
