import { useParams } from "react-router";

export function level() {
    let params = useParams();
    return <h1>Level {params.levelNum}</h1>;
}