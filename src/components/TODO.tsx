import { ChangeEvent, useState } from "react";
import styles from "./todo.module.css";
enum DATA_ENUM {
  TITLE = "title",
  DESCRIPTION = "description",
}

type DataType = {
  [DATA_ENUM.TITLE]: string;
  [DATA_ENUM.DESCRIPTION]: string;
};

type PropsType = {
  title?: DataType[DATA_ENUM.TITLE];
  description?: DataType[DATA_ENUM.DESCRIPTION];
  isDone?: boolean;
  onSubmit: (event: never, data: never) => void;
  onRemove: (id: number) => void;
  onDone: (id: number) => void;
  id?: number;
};

const Todo = ({
  title = "",
  description = "",
  onSubmit,
  onRemove,
  onDone,
  id,
  isDone,
}: PropsType) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [data, setData] = useState<DataType>({
    [DATA_ENUM.TITLE]: title,
    [DATA_ENUM.DESCRIPTION]: description,
  });

  const onEdit = () => {
    setIsEdit(true);
  };

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: DATA_ENUM
  ) => {
    setData((prevState) => ({
      ...prevState,
      [key]: event.target?.value,
    }));
  };

  const onReset = () => {
    if (isEdit) {
      setData({ title, description });
      setIsEdit(false);
    } else {
      setData({ title: "", description: "" });
    }
  };

  return (
    <form
      onSubmit={(event) => onSubmit(event, data)}
      className={styles.boxForm}
    >
      {title && (
        <div className={styles.boxAction}>
          <button
            type="button"
            className={styles.btnAction}
            onClick={() => onDone(id)}
          >
            Done
          </button>
          {!isDone && (
            <button type="button" className={styles.btnAction} onClick={onEdit}>
              Edit
            </button>
          )}
          <button
            type="button"
            className={styles.btnAction}
            onClick={() => onRemove(id as number)}
          >
            Remove
          </button>
        </div>
      )}

      <input
        tabIndex={1}
        type="text"
        name="title"
        placeholder="Title :"
        value={data.title}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event, DATA_ENUM.TITLE)
        }
        disabled={!!title && !isEdit}
        className={styles.title}
      />
      <hr className={styles.line} />
      <textarea
        tabIndex={2}
        name="description"
        placeholder="description :"
        value={data.description}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          onChange(event, DATA_ENUM.DESCRIPTION)
        }
        disabled={!!title && !isEdit}
        className={styles.textarea}
      />

      {(!title || isEdit) && (
        <div className={styles.boxBtnForm}>
          <button
            tabIndex={4}
            type="reset"
            onClick={onReset}
            className={styles.btnCancel}
          >
            Cancel
          </button>
          <button tabIndex={3} type="submit" className={styles.btnSave}>
            Save
          </button>
        </div>
      )}
    </form>
  );
};
export default Todo;
