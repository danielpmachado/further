import "./App.css";

import InvestmentTable from "./components/InvestmentsTable/InvestmentsTable";
import { INVESTMENTS } from "./components/InvestmentsTable/data";

function App() {
  return (
    <>
      <h1>Further</h1>
      <InvestmentTable data={INVESTMENTS}></InvestmentTable>
    </>
  );
}

export default App;
