import { useSelector } from "react-redux";

export default function useAuth() {
    const auth = useSelector((state:any) => state.auth);
    if (auth.accessToken && auth.user && auth.isAuthintication) {
        return true;
    } else {
        return false;
    }
}