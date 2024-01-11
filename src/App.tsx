import "./App.css";

import RefundsTable from "./components/RefundsTable";
import { INVESTMENTS } from "./components/RefundsTable/data";

function App() {
  return (
    <>
      <h1>Further</h1>
      <RefundsTable data={INVESTMENTS}></RefundsTable>
    </>
  );
}

export default App;
