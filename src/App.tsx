import React, { useEffect } from "react";
import { parse } from "query-string";

function App() {
  useEffect(() => {
    const cal = document.getElementById("calendar");
    const search = parse<{ sheetUrl: string }>(window.location.search);

    cal?.setAttribute("data-spreadsheet-url", search.sheetUrl);
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
