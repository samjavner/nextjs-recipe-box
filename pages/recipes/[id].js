import { promises as fs } from "fs";
import path from "path";
import styles from "../../styles/recipes.module.css";

export default function Recipe({ recipe }) {
  return (
    <main>
      <h1 className={styles.title}>{recipe.title}</h1>
      <ul className={styles.ingredients}>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <ol className={styles.directions}>
        {recipe.directions.map((direction, index) => (
          <li key={index}>{direction}</li>
        ))}
      </ol>
    </main>
  );
}

export async function getStaticPaths() {
  const dataDir = path.join(process.cwd(), "data");
  const filenames = await fs.readdir(dataDir);
  const paths = filenames.map((filename) => ({
    params: {
      id: filename.slice(0, -5),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const dataDir = path.join(process.cwd(), "data");
  const filename = params.id + ".json";
  const filePath = path.join(dataDir, filename);
  const data = await fs.readFile(filePath, "utf8");
  const recipe = JSON.parse(data);

  return {
    props: {
      recipe,
    },
  };
}
