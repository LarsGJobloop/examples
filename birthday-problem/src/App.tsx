import { BirthdayProblem } from "./components/BirthdayProblem/BirthdayProblem";
import { LayoutRoot } from "./layouts/LayoutRoot";

function App() {
  return (
    <LayoutRoot title="Birthday Problem" className="">
      <section>
        <BirthdayProblem />
      </section>
    </LayoutRoot>
  );
}

export default App;
