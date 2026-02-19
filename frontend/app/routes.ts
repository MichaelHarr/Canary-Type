import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("level/:levelNum", "routes/level.tsx"),
] satisfies RouteConfig;
