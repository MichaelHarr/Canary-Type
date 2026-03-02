import { useParams } from "react-router";
import type { Route } from "./+types/level";

export async function loader({ params } : Route.LoaderArgs) {
    
    const response = await fetch(
        `http://backend:8080/levels/byNum/${params.levelNum}`
    );

    if (!response.ok) {
        throw new Response("Failed to fetch level data", { status: 500 });
    }

    const data = await response.json();
    console.log("Response data:", data);

    return data;
}

export default function level({
    loaderData,
}: Route.ComponentProps) {
    let params = useParams()
    console.log(loaderData);
    return (
    <>
        <h1>Level {params.levelNum}</h1>
        <h2>Hello</h2>
    </>
    );
}