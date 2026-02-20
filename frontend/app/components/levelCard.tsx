export function LevelCard({
  title,
  levelNum,
  description,
}: {
    title: string;
    levelNum: number;
    description: string;
}) {
  return (
    <a href={`/level/${levelNum}`} key={levelNum} className="block mt-4 group">
      <div className="border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">{`Level ${levelNum}: ${title}`}</h2>
          <p>{description}</p>
      </div>
    </a>
  );
}