import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenFormServer = async () => {
    const jwttoken = await auth.api.getToken({
        headers: await headers()
    })
    //    console.log(jwttoken?.token)
    const token = jwttoken?.token;
    return token
}