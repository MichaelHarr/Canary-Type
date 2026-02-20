import { useParams } from "react-router";
import type { Route } from "./+types/level";

export async function loader({ params } : Route.LoaderArgs) {
    return {}
}

export default function level({
    loaderData,
}: Route.ComponentProps) {
    let params = useParams()
    console.log(params)
    return <h1>Level {params.levelNum}</h1>;
}