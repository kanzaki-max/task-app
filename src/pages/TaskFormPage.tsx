import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTasks from "../hooks/useTasks";
import type { Task } from "../types";

function TaskFormPage() {
  const { date, id } = useParams();
  const navigate = useNavigate();
  const { tasks, categories, addTask, updateTask } = useTasks();

  // 編集の場合は既存タスクを取得する
  const editingTask = id ? tasks.find((task) => task.id === id) : null;

  // フォームの状態管理
  // 編集の場合は既存の値・作成の場合は初期値をセット
  const [title, setTitle] = useState(editingTask?.title ?? "");
  const [categoryId, setCategoryId] = useState(
    editingTask?.categoryId ?? categories[0]?.id ?? ""
  );
  const [time, setTime] = useState(editingTask?.time ?? "");
  const [endTime, setEndTime] = useState(editingTask?.endTime ?? "");

  // バリデーションエラーの状態管理
  const [titleError, setTitleError] = useState("");

  // 保存ボタンを押したときの処理
  const handleSubmit = () => {
    // バリデーション
    if (title.trim() === "") {
      setTitleError("タイトルを入力してください");
      return;
    }

    if (editingTask) {
      // 編集の場合の処理
      const updatedTask: Task = {
        ...editingTask,
        title: title.trim(),
        categoryId,
        time: time || null,
        endTime: endTime || null,
      };
      updateTask(updatedTask);
    } else {
      // 新規作成の場合の処理
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: title.trim(),
        completed: false,
        categoryId,
        date: date ?? "",
        time: time || null,
        endTime: endTime || null,
        createdAt: new Date().toISOString(),
      };
      addTask(newTask);
    }

    // 保存後はタスク一覧に戻る
    navigate(`/tasks/${date}`);
  };

  // キャンセルボタンを押したときの処理
  const handleCancel = () => {
    navigate(`/tasks/${date}`);
  };

  return (
    <div>
      <h1>{editingTask ? "タスクを編集" : "タスクを追加"}</h1>

      {/* タイトル */}
      <div>
        <label>
          タイトル
          <span>※必須</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            // 入力したらエラーを消す
            if (e.target.value.trim() !== "") setTitleError("");
          }}
          placeholder="タイトルを入力"
        />
        {/* エラーメッセージ */}
        {titleError && <p>{titleError}</p>}
      </div>

      {/* カテゴリ */}
      <div>
        <label>カテゴリ</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* 開始時間 */}
      <div>
        <label>開始時間</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      {/* 終了時間 */}
      <div>
        <label>終了時間</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      {/* ボタン */}
      <div>
        <button onClick={handleCancel}>キャンセル</button>
        <button onClick={handleSubmit}>
          {editingTask ? "更新する" : "追加する"}
        </button>
      </div>
    </div>
  );
}

export default TaskFormPage;
