import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from 'uuid';

import prisma from "@/lib/db"

var bcrypt = require('bcrypt')

export async function POST(req: NextRequest) {
    const { name, email, password } = await req.json()
    try {
        const bcryptPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                id: uuidv4(),
                name,
                email,
                password: bcryptPassword
            }
        })
        return Response.json({ message: "OK", user })
    } catch (err) {
        return NextResponse.json(
            {
                message: `${err}`,
                err
            },
            {
                status: 500
            }
        )
    }
}
