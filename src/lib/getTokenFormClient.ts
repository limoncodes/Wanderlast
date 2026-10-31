import { authClient } from "./auth-client";

export const gettokenformserverClient = async ()=>{
     const { data: tokenData } = await authClient.token();
        const token = tokenData?.token
        return token
}