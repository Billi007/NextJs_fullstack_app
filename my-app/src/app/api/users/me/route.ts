import User from "@/app/models/user.model";
import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest){
 const userId = await getDataFromToken(request);

 const user = await User.findOne({_id: userId}).select("-password");

  if(!user){
    return NextResponse.json({
    message: "Unauthorized",},{status :401})
}
  return NextResponse.json({
  message: "Successfully fetched user data",  data: user}
  ,{status: 200})
}