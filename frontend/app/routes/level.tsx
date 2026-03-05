import { useParams, useLoaderData } from "react-router";
import type { Route } from "./+types/level";

type LevelData = {
    levelNum: number;
    name: string;
    typingText: string;
}

export async function loader({ params } : Route.LoaderArgs): Promise<LevelData> {
    
    const response = await fetch(
        `http://backend:8080/levels/byNum/${params.levelNum}`
    );

    if (!response.ok) {
        throw new Response("Failed to fetch level data", { status: 500 });
    }

    const data: LevelData = await response.json();
    console.log("Response data:", data);

    return data;
}

export default function Level() {
    const params = useParams();
    const loaderData = useLoaderData() as LevelData | undefined;

    return (
        <div className="min-h-screen flex items-center j-ustify-center px-4">
            <div className="w-full max-w-4xl text-center">
                <h1 className="text-lg text-gray-500 mb-6">Level {loaderData?.levelNum}</h1>
                <p className="text-4xl md:text-6xl font-semibold leading-tight">
                    {loaderData?.typingText ?? "Loading..."}
                </p>
            </div>
        </div>
    );
}