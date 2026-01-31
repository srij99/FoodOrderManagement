import { NextRequest, NextResponse } from "next/server"
import { menuItems } from "@/lib/menuStore"

export async function GET(_request: NextRequest) {
  return NextResponse.json(menuItems, { status: 200 })
}
