#レビュー質問への回答

## 質問① as const とは何か

### 行ったこと

useLocalStorage.ts の return から as const を外して useTasks.ts の setTasks の型を確認した。
(AIから指示)

### 結果

**as const あり**

```ts
const setTasks: (value: Task[]) => void;
```

→ 「setTasksは関数である」と正確に決まっている

**as const なし**

```ts
const setTasks: Task[] | ((value: Task[]) => void);
```

→ 「Task[]（配列）か関数のどちらかかもしれない」という曖昧な型になった

### 解答

as const をつけることで、返り値が「配列」ではなく「順番と型が決まったタプル」として認識される。
結果として使う側が setTasks を関数として確実に扱えるようになり、`型の安全性が上がる`。
