import React, { useState } from "react";
import styled from "styled-components";
import { parse } from "query-string";

function App() {
  const { displayName, mail } = parse<{ displayName: string; mail: string }>(
    window.location.search
  );

  return (
    <div>
      <BookingDetailsForm
        displayName={displayName}
        mail={mail}
        onSave={handleSave}
      />
    </div>
  );

  async function handleSave(data: { description: string }) {
    await fetch({
      url: "/api",
      method: "POST",
      // @ts-ignore
      body: JSON.stringify(data),
      // @ts-ignore
      headers: { "content-type": "application/json" },
    });
  }
}

function BookingDetailsForm({
  displayName,
  mail,
  onSave,
}: {
  displayName: string;
  mail: string;
  onSave: (data: { description: string }) => void;
}) {
  const [description, setDescription] = useState("");
  return (
    <>
      <Form>
        <input type="hidden" name="SQF_START" />
        <input type="hidden" name="SQF_END" />

        <label htmlFor="mail">E-Mailaddresse:</label>
        <TextField type="email" name="mail" disabled={true} value={mail} />

        <label htmlFor="displayName">Name:</label>
        <TextField
          type="text"
          name="displayName"
          disabled={true}
          value={displayName}
        />

        <label htmlFor="description">Bemerkungen:</label>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          rows={3}
          name="description"
        />
        <button onClick={() => onSave({ description })}>
          Reservierung abschicken
        </button>
      </Form>
    </>
  );
}

export default App;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  max-width: 900px;
`;

const TextField = styled.input`
  flex: 1 0 auto;
`;

const TextArea = styled.textarea`
  flex: 1 0 auto;
  resize: none;
`;
