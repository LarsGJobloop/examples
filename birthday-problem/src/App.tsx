import { Game } from "./components/Game/Game";
import { LayoutRoot } from "./layouts/LayoutRoot";

function App() {
  return (
    <LayoutRoot>
      <section>
        <header>Example Board</header>
        <Game />
      </section>
    </LayoutRoot>
  );
}

export default App;
