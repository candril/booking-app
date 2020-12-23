import React, { useEffect } from "react";
import { parse } from "query-string";

function App() {
  useEffect(() => {
    const search = parse<{ sheetUrl: string }>(window.location.search);
    console.log(search);
  }, []);

  return (
    <div>
      <BookingDetailsForm />
    </div>
  );
}

function BookingDetailsForm() {
  return (
    <form>
      <input type="hidden" name="SQF_START" />
      <input type="hidden" name="SQF_END" />
    </form>
  );
}

export default App;
