import { requireUser } from "@/app/lib/hooks";
import { nylas, nylasConfig } from "@/app/lib/nylas";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const session = await requireUser();

    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if(!code){
        return Response.json("Hey we did not get the code", {
            status: 400,
        });
    }
    try {
        const response = await nylas.auth.exchangeCodeForToken({
            clientSecret: nylasConfig.apiKey,
            clientId: nylasConfig.clientId,
            redirectUri: nylasConfig.redirectUri,
            code:code,
        });
        const {grantId, email} = response;

        await prisma
    } catch (error) {
        console.log("Error something went wrong", error);
        
    }
}