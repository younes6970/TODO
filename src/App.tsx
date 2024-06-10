import { Fragment } from "react/jsx-runtime";
import Todo from "./components/TODO";
import { FormEvent, useEffect, useState } from "react";
import styles from "./app.module.css";

function App() {
  const [list, setList] = useState<
    {
      title: string;
      description: string;
      id: number;
      isDone: boolean;
    }[]
  >([]);
  const getList = async () => {
    const response = await fetch("http://localhost:3000/list");
    const data = await response.json();
    setList(data);
  };
  const onSubmit = async (
    event: FormEvent<HTMLFormElement>,
    data,
    id?: number
  ) => {
    event.preventDefault();
    if (id) {
      const response = await fetch("http://localhost:3000/list/" + id, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data }),
      });
      return response.ok;
    }
    const response = await fetch("http://localhost:3000/list", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, isDone: false }),
    });
    getList()
    return response.ok;
  };

  const onRemove = async (id: number) => {
    await fetch("http://localhost:3000/list/" + id, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    });
    getList();
  };

  const onDone = async (id: number) => {
    const value = list.find((item) => item.id === id);
    await fetch("http://localhost:3000/list/" + id, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...value, isDone: true }),
    });

    getList();
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <div className={styles.box}>
      <Todo onSubmit={onSubmit} onRemove={onRemove} onDone={onDone} />
      {!!list.length && <h1>To-do list</h1>}
      <div className={styles.boxList}>
        {list.map((item) => (
          <Fragment key={item.id}>
            <Todo
              title={item.title}
              description={item.description}
              isDone={item.isDone}
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
