import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to Sam's home page!</h1>
      <p>
        See my recipes <Link href="/recipes">here</Link>.
      </p>
    </main>
  );
}
