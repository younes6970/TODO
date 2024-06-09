import { Fragment } from "react/jsx-runtime";
import Todo from "./components/TODO";
import { FormEvent, useEffect, useState } from "react";

function App() {
  const [list, setList] = useState<
    {
      title: string;
      description: string;
      id: number;
    }[]
  >([]);
  const getList = async () => {
    const response = await fetch("http://localhost:3000/list");
    const data = await response.json();
    setList(data);
  };
  const onSubmit = async (event: FormEvent<HTMLFormElement>, data) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/list", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, isDone: false }),
    });
  };

  const onRemove = async (id) => {
    // const value = list.filter((item) => item.id !== id);
    const response = await fetch("http://localhost:3000/list/" + id, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    });
  };

  const onDone = async (id) => {
    const value = list.find((item) => item.id === id);
    const response = await fetch("http://localhost:3000/list/" + id, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...value, isDone: true }),
    });
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <div>
      <Todo onSubmit={onSubmit} onRemove={onRemove} onDone={onDone} />
      {!!list.length && <h1>To-do list</h1>}
      <div>
        {list.map((item) => (
          <Fragment key={item.id}>
            <Todo
              title={item.title}
              description={item.description}
              onSubmit={onSubmit}
              onRemove={onRemove}
              id={item.id}
              onDone={onDone}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default App;
