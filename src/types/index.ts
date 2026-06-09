//exportは、このファイルの外からも使用できるようにするためのもの
//typeは、型を定義するためのもの

//カテゴリ
export type Category = {
    id: string
    name: string
    color: string
    isStudy: boolean
}

//タスク
export type Task = {
    id: string
    title: string
    completed: boolean
    categoryId: string
    date: string
    time: string | null
    endTime: string | null
    createdAt: string
}