import { NextResponse } from 'next/server'
import prismadb from '../../../lib/prismadb'
import bcrypt from "bcrypt";


// const bcrypt = require('bcrypt')

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json()

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    const existing = await prismadb.user.findUnique({
      where: { email },
    })
    if (existing) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      )
    }

    // 3) Hash & create
    const hashedPassword = await bcrypt.hash(password, 10)
    await prismadb.user.create({
      data: {
        firstName,
        lastName,
        email,
        hashedPassword,
        emailVerified: new Date(),
      },
    })

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    )
  } catch (err: any) {
    if (err.code === 'P2002') {
      return NextResponse.json(
        { message: 'That email is already in use' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { message: err.message || "Unknown error" },
      { status: 500 }
    )
  }
}
