import { NextResponse } from "next/server";
import ImageKit from "imagekit";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request): Promise<Response> {
    const buffer = await request.arrayBuffer();

    const imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string
    });

    const response = await imagekit.upload({
        file: Buffer.from(buffer),
        fileName: `${uuidv4()}.png`,
        folder: "temp"
    });

    const responseData = { url: response.url };

    const cookies = request.headers.get("cookie");
    const recentImages = cookies ? cookies.split("; ").find(cookie => cookie.startsWith("recent-images=")) : null;
    let recentImagesArray = [];
    if (recentImages) {
        const cookieValue = decodeURIComponent(recentImages.split("=")[1]);
        recentImagesArray = JSON.parse(cookieValue);
    }

    recentImagesArray.push(response.url);

    const cookieValue = JSON.stringify(recentImagesArray);
    const cookieOptions = {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        sameSite: "strict",
    };
    const cookie = `recent-images=${encodeURIComponent(cookieValue)}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join("; ")}`;

    return NextResponse.json(responseData, {
        headers: {
            "Set-Cookie": cookie
        }
    });
}
