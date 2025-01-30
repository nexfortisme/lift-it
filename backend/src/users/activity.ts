import type { Context } from "hono";
import { Jwt } from "hono/utils/jwt";
import GetDBConnection from "../database/database";
export default async function GetUserActivity(c: Context) {

    let auth = c.req.header()['authorization'];
    auth = auth.replace('Bearer ', '');
  
    let decodedToken = Jwt.decode(auth);
    let userId = decodedToken?.payload?.user;

    let dbConnection = await GetDBConnection();

    if (!userId) {
        return c.json({ error: "No user id provided" }, 400);
    }


    return c.text('Hello World');
    // let resp = await dbConnection.query('SELECT * FROM events WHERE eventUser = $userId',
    // {
    //     userId: userId,
    // });
    
    // if (resp.error) {
    //     return c.json({ error: "Error in query" }, 400);
    // }

    // console.log('resp', resp)

    // return c.json(resp[0], 200);
}