import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { useParams } from "next/navigation"
import { NextResponse } from "next/server"

interface Data {
    params:{storeId: string}
}

export async function GET(req: Request, { params:{storeId} }: Data) {
    try {

        if (!storeId) return new NextResponse("Store ID is required", { status: 400 })

        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId
            }
        })

        return NextResponse.json(billboards)
    }
    catch (error) {
        console.log('[BILLBOARDS_GET]:', error)
        return new NextResponse("Internal_error", {status:500})
    }
}
export async function POST(req: Request, { params:{storeId}}: Data) {
    try {
        const  userId  = auth().userId as string
        const body = await req.json()
        const { label, imageUrl,  } = body

        if (!userId) new NextResponse("Unauthenticated", { status: 401 })
        
        if (!label) return new NextResponse("Label is required", { status: 400 })
        if (!imageUrl) return new NextResponse("Image URL is required", { status: 400 })

        if (!storeId) return new NextResponse("Store ID is required", { status: 400 })
        
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId
            }
        })

        if(!storeByUserId) return new NextResponse("Unauthorized", {status: 403})

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId
            }
        })

        return NextResponse.json(billboard)
    }
    catch (error) {
        console.log('[BILLBOARDS_POST]:', error)
        return new NextResponse("Internal_error", {status:500})
    }
}