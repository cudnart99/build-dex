import notificationProvider from "@data-access/notification-provider";
import useJavaServiceInstance from "../useJavaServiceModel";
const model = "notification";
const provider = notificationProvider;
const notification = useJavaServiceInstance({ model, provider });
export default notification;
