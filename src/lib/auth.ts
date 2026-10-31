import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"
const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.4dwew1j.mongodb.net/`);
const db = client.db("wanderlust");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins:[
        jwt(),
    ],
    session:{
        cookieCache:{
            enabled:true,
            strategy:"jwt",
            maxAge:7*24*60*60

        }

    }
});