import User from "@/app/models/user.model";
import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest){

try {
const reqBody = await req.json();
const {email, password} = reqBody;

const user = await User.findOne({email});

if(!user){
return NextResponse.json({ error: "No user found"},{status:409});
}

const comparePassword = await bcryptjs.compare(password, user.password);

if(!comparePassword){
return NextResponse.json({ error: "Invalid credentials"},{status:401});
}

const tokenData = {
    id: user._id,
    username: user.username,
    email: user.email,
}

const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,
    {expiresIn: '1d'}
)

const response = NextResponse.json({
    message: "User login successful",
    success: true,
})

response.cookies.set('token', token,
    {httpOnly: true}                            //user can't manipulate cookies
)

return response;

} catch (error:any) {
return NextResponse.json({ error: error.message},{status:500})
}
}