import Link from "next/link";
import css from "./Home.module.css"; 

export default function Home() {
  return (
    <div className={css.page}>
      <main className={css.main}>
        <section className={css.intro}>
          <h1>Welcome to NoteHub</h1>
          <p>NoteHub is a simple and efficient application for managing personal notes.</p>
        </section>
        <div className={css.ctas}>
          <Link href="/notes/filter/all" className={css.primary}>
            View My Notes
          </Link>
        </div>
      </main>
    </div>
  );
}