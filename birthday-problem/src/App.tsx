import { Game } from "./components/Game/Game";
import { LayoutRoot } from "./layouts/LayoutRoot";

function App() {
  return (
    <LayoutRoot title="Birthday Problem" className="">
      <section>
        <Game />
      </section>
    </LayoutRoot>
  );
}

export default App;
