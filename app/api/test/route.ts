import { addCategoriesToDB } from "@/lib/db/addData"
import { NextResponse } from "next/server"

export const GET = async ()=>{
    await addCategoriesToDB()
    return NextResponse.json({
        message: "everything worked fine"
    })
}