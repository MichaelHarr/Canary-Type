import { useParams } from "react-router";
import type { Route } from "./+types/level";

export async function loader({ params } : Route.LoaderArgs) {
    
    const response = await fetch(
        `https://localhost:8080/levels/byNum/${params.levelNum}`
    );

    if (!response.ok) {
        throw new Response("Failed to fetch level data", { status: 500 });
    }

    console.log("Response data:", response.json());

    return response.json();
}

export default function level({
    loaderData,
}: Route.ComponentProps) {
    let params = useParams()
    console.log(params)
    return <h1>Level {params.levelNum}</h1>;
}