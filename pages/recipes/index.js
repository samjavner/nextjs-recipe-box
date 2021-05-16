import { promises as fs } from "fs";
import Link from "next/link";
import path from "path";

const ids = [1, 2, 3];

export default function Recipes({ recipes }) {
  return (
    <div>
      <h1>My Recipe Box</h1>
      <ul>
        {recipes.map(({ path, title }) => (
          <li key={path}>
            <Link href={`/recipes/${path}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const dataDir = path.join(process.cwd(), "data");
  const filenames = await fs.readdir(dataDir);

  const recipes = filenames.map(async (filename) => {
    const filePath = path.join(dataDir, filename);
    const data = await fs.readFile(filePath, "utf8");
    const recipe = JSON.parse(data);

    return {
      path: filename.slice(0, -5),
      title: recipe.title,
    };
  });

  return {
    props: {
      recipes: await Promise.all(recipes),
    },
  };
}
