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
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">{`Level ${levelNum}: ${title}`}</h2>
      <p>{description}</p>
    </div>
  );
}