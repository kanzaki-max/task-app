import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CalendarPage from './pages/CalendarPage'
import TaskListPage from './pages/TaskListPage'
import TaskFormPage from './pages/TaskFormPage'
import StudyStatsPage from './pages/StudyStatsPage'

function App() {
  return (
    //BrowserRouterは、React Routerのコンポーネントで、ルーティング機能を提供するためのもの
    <BrowserRouter>
      <Routes>
        {/* カレンダー画面（TOP） */}
        <Route path="/" element={<CalendarPage />} />

        {/* タスクリスト画面 */}
        <Route path="/tasks/:date" element={<TaskListPage />} />

        {/* タスク追加画面 */}
        <Route path="/tasks/:date/new" element={<TaskFormPage />} />

        {/* タスク編集画面 */}
        <Route path="/tasks/:date/edit/:id" element={<TaskFormPage />} />

        {/* 学習集計画面 */}
        <Route path="/study-stats" element={<StudyStatsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App