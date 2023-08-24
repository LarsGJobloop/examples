interface LayoutRootProps {
  children: React.ReactNode;
}

export function LayoutRoot({ children }: LayoutRootProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="mx-auto">
        <h1>Birthday Problem</h1>
      </header>

      <main className="px-4 grow">{children}</main>

      <footer className="mx-auto">
        <p>&copy; Lars Gunnar</p>
      </footer>
    </div>
  );
}
