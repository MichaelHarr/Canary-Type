import { useParams, useLoaderData, useNavigate } from "react-router";
import type { Route } from "./+types/level";
import { useEffect, useState, useRef } from "react";

type LevelData = {
    name: string;
    num: number;
    text: string;
}

export async function loader({ params } : Route.LoaderArgs): Promise<LevelData> {
    
    const response = await fetch(
        `http://localhost:8080/levels/${params.levelNum}`
    );

    if (!response.ok) {
        throw new Response("Failed to fetch level data", { status: 500 });
    }

    const raw = await response.json();
    console.log("Response data:", raw);

    const data: LevelData = {
        name: raw.name,
        num: raw.number ?? raw.num,
        text: raw.text,
    };

    return data;
}

export default function Level() {
    const loaderData = useLoaderData() as LevelData;
    const navigate = useNavigate();
    const characters = loaderData.text.split("") ?? [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentChar, setCurrentChar] = useState(characters[0] ?? "");
    const [lastKey, setLastKey] = useState("");
    const [seconds, setSeconds] = useState(10);
    const intervalRef = useRef<number | null>(null);
    const [status, setStatus] = useState<"playing" | "success" | "failed">("playing");

    useEffect(() => {
        setCurrentIndex(0);
        setCurrentChar(characters[0] ?? "");
        setStatus("playing");
    }, [loaderData.text]);

    useEffect(() => {
        setSeconds(10);
        setStatus("playing");
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        intervalRef.current = window.setInterval(() => {
            setSeconds((s) => {
                if (s <= 1) {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                    return 0;
                }
                return s - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [loaderData.text]);

    useEffect(() => {
        if (seconds === 0) {
            if (currentIndex >= characters.length) {
                setStatus("success");
            } else {
                setStatus("failed");
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
    }, [seconds, currentIndex, characters.length]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (status !== "playing") return;
            setLastKey(event.key);
            if (!currentChar) return;
            if (event.key === currentChar) {
                const nextIndex = currentIndex + 1;
                setCurrentIndex(nextIndex);
                if (nextIndex < characters.length) {
                    setCurrentChar(characters[nextIndex]);
                } else {
                    setCurrentChar("");
                    setStatus("success");
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentChar, currentIndex, characters]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="fixed top-20 md:top-24 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
                <span className="text-2xl md:text-8xl font-bold text-gray-900">{seconds}</span>
            </div>
            <div className="w-full max-w-4xl text-center">
                <h1 className="text-lg text-gray-500 mb-6">Level {loaderData.num}</h1>
                <div className="mb-4">
                    <button
                        onClick={() => navigate('/')}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Back
                    </button>
                </div>
                <p className="text-4xl md:text-6xl font-semibold leading-tight whitespace-nowrap max-w-full">
                    {characters.map((char, index) => {
                        const distance = index - currentIndex;
                        const isTyped = index < currentIndex;
                        const isCurrent = index === currentIndex;

                        const lookahead = 8;
                        const lookaheadOpacities = [0.9, 0.8, 0.7, 0.55, 0.4, 0.25, 0.12, 0.06];

                        let opacity = 0;
                        if (isTyped || isCurrent) {
                            opacity = 1;
                        } else if (distance > 0 && distance <= lookahead) {
                            opacity = lookaheadOpacities[distance - 1] ?? 0;
                        } else {
                            opacity = 0.06;
                        }

                        const colorClass = isCurrent ? "text-blue-500" : isTyped ? "text-gray-900" : "text-gray-700";

                        return (
                            <span
                                key={index}
                                style={{ opacity }}
                                className={`inline-block transition-opacity duration-200 ease-out ${colorClass}`}
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                        );
                    })}
                </p>
                {status !== "playing" && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                        <div className="bg-white rounded-lg p-8 shadow-lg text-center max-w-md mx-4">
                            {status === "success" ? (
                                <>
                                    <h2 className="text-2xl font-bold text-green-600 mb-2">Success!</h2>
                                    <p className="mb-4">You finished the level.</p>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-red-600 mb-2">Time's up</h2>
                                    <p className="mb-4">You failed to finish typing in time.</p>
                                </>
                            )}
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => navigate('/')}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Back to Home
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}