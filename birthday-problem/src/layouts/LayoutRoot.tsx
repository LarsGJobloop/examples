import { LinkExternal } from "../components/LinkExternal/LinkExternal";
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

      <footer className="flex flex-col items-center py-2 text-amber-100 bg-rose-950">
        <p>By Lars Gunnar</p>
        <ul>
          <li>
            <LinkExternal href="https://github.com/larsgjobloop">
              GitHub
            </LinkExternal>
          </li>
          <li>
            <LinkExternal href="https://no.linkedin.com/in/lars-gunnar-solheim-99818b249?trk=people-guest_people_search-card">
              LinkedIn
            </LinkExternal>
          </li>
        </ul>
      </footer>
    </div>
  );
}
