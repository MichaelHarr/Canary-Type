import { Route, Routes } from "react-router";
import { LevelCard } from "~/components/levelCard";

const levels = [
  {
    title: "Welcome to Canary Type",
    levelNum: 1,
    description: "This level provides basic introduction to Canary Type"
  },
  {
    title: "asdf and jkl;",
    levelNum: 2,
    description: "This level teaches the basic finger positions for the asdf and jkl; keys."
  },
  {
    title: "Home Row Drills",
    levelNum: 3,
    description: "This level provides drills to improve your speed and accuracy on the home row keys."
  },
]

export function Welcome() {
  return (
    <>
      <main className="text-2xl font-bold text-center">Canary Type</main>
      <h2 className="text-lg text-center">The typing gauntlet</h2>
      {levels.map(level => {
        return (
          <LevelCard title={level.title} levelNum={level.levelNum} description={level.description} />
        )
      })}
    </>
  );
}