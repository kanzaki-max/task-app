import useLocalStorage from "./useLocalStorage"
import { DEFAULT_CATEGORIES } from '../constants'
import type { Task, Category } from '../types'

function useTasks() {
    const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])

    const [categories, setCategories] = useLocalStorage<Category[]>('categories', DEFAULT_CATEGORIES)

    //スプレッド構文(...)は、配列やオブジェクトを展開するためのもの
    //mapは、配列の各要素に対して処理を行い、新しい配列を返すメソッド
    //タスクを追加する関数
    const addTask = (task: Task) => {
        setTasks([...tasks, task])
    }

    //タスクを更新する関数
    const updateTask = (updatedTask: Task) => {
        setTasks(tasks.map((task) => task.id === updatedTask.id ? updatedTask : task))
    }

    //タスクを削除する関数
    const deleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    //タスクの完了状態を切り替える関数
    const toggleTask = (id: string) => {
        setTasks(tasks.map((task) => task.id ===id ? {...task, completed: !task.completed} :task))
    }

    // ── 学習時間の計算 ────────────────────────────
    const calcStudyMinutes = (
        time: string | null,
        endTime: string | null
    ): number => {
        if (!time || !endTime) return 0

        const [startHour, startMin] = time.split(':').map(Number)
        const [endHour, endMin] = endTime.split(':').map(Number)

        const startTotal = startHour * 60 + startMin
        const endTotal = endHour * 60 + endMin

        return endTotal - startTotal
    }

    return {
        tasks,
        categories,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        calcStudyMinutes,
    }
}

export default useTasks