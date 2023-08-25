import type { CSSClasses } from "../types";

interface LayoutRootProps {
  /**
   * Page title
   */
  title: string;
  children: React.ReactNode;
  /**
   * CSS for the main node
   */
  className?: CSSClasses;
}

/**
 * 3 part layout with header, main and footer
 */
export function LayoutRoot({ title, children, className }: LayoutRootProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-center bg-amber-200">
        <h1>{title}</h1>
      </header>

      <main className={"grow" + className}>{children}</main>

      <footer className="flex justify-center py-2 text-amber-100 bg-rose-950">
        <p>&copy; Lars Gunnar</p>
      </footer>
    </div>
  );
}
