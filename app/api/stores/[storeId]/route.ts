import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

interface Data {
    params: {
        storeId: string
    }
}
export async function PATCH(req: Request, { params: { storeId} }:Data) {
    try {
        const { userId } = auth()
        const body = await req.json()

        const { name } = body
        
        if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

        if (!name) return new NextResponse('Name is required', { status: 400 })

        if (!storeId) return new NextResponse('StoreId is required', { status: 400 })

        const store = await prismadb.store.updateMany({
            where: { id: storeId, userId },
            data: { name }
        })

        return NextResponse.json(store)
    }
    catch (error) {
        console.error('[STORE_PATCH]', error)
        return new NextResponse('Internal Error', {status:500})
    }
}
export async function DELETE(req: Request, { params: { storeId} }:Data) {
    try {
        const { userId } = auth()

        
        if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

        if (!storeId) return new NextResponse('StoreId is required', { status: 400 })

        const store = await prismadb.store.deleteMany({
            where: { id: storeId, userId },
        })

        return new NextResponse('Store deleted', {status: 201})
    }

    catch (error) {
        console.error('[STORE_DELETE]', error)
        return new NextResponse('Internal Error', {status:500})
    }
}