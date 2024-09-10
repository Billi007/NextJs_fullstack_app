import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest){
try {
const reponse = NextResponse.json({
    message: "User logged out successfully",
    success: false,
 })
 reponse.cookies.set("token", "", {
    httpOnly: true, 
    expires: new Date(0)
 },)

 return reponse;
} catch (error:any) {
 return NextResponse.json({ error: error.message},{status:500}) 
}
}