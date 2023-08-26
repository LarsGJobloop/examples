import { useUniqueId } from "../../hooks/useUniqueId";
import type { CSSClasses } from "../../types";
import style from "./style.module.css";

interface LinkExternalProps {
  href: string;
  className?: CSSClasses;
  children: React.ReactNode;
}

/**
 * Component for linking to external sites.
 * The interface is just a narrowed down variation of the anchor element
 *
 * @example
 * <LinkExternal
 *  href="https://github.com"
 *  className="link class"
 * >
 *  GitHub Profile
 * </LinkExternal>
 *
 * There are accessibility concerns when opening links in a new tab.
 * Advice is to provide some forewarning that content is opened in
 * a new tab.
 *
 * See here for full breakdown
 * @link [Digitala11y](https://www.digitala11y.com/external-links-in-or-out/)
 */
export function LinkExternal({ href, className, children }: LinkExternalProps) {
  const uid = useUniqueId();

  return (
    <>
      <a
        href={href}
        target="_blank"
        aria-describedby={uid}
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
      <span id={uid} className={style["sr-only"]}>
        (opens in new tab)
      </span>
    </>
  );
}
