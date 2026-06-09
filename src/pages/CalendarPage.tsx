import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CalendarGrid from '../components/CalendarGrid'
import useTasks from '../hooks/useTasks'

function CalendarPage() {
  const navigate = useNavigate()
  const { tasks } = useTasks()

  // 表示中の年月を管理する（初期値は今日の年月）
  const [currentYear, setCurrentYear] = useState(
    new Date().getFullYear()
  )
  const [currentMonth, setCurrentMonth] = useState(
    new Date().getMonth() 
  )

  // 前の月に移動する
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1)
      setCurrentMonth(11)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  // 次の月に移動する
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1)
      setCurrentMonth(0)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // 今日の月に戻る
  const handleToday = () => {
    setCurrentYear(new Date().getFullYear())
    setCurrentMonth(new Date().getMonth())
  }

  // 日付をクリックしたらタスクリスト画面に遷移する
  const handleSelectDate = (date: string) => {
    navigate(`/tasks/${date}`)
  }

  return (
    <div className="page">

      {/* ヘッダー (JSX構文ルール)*/}
      <div className="calendar-header">
        <h1 className="app-title">タスク</h1>
        <button
          className="stats-button"
          onClick={() => navigate('/study-stats')}
        >
          集計
        </button>
      </div>

      {/* 月ナビゲーション */}
      <div className="month-nav">
        <button onClick={handlePrevMonth}>◀</button>
        <div className="month-nav-center">
          <span className="month-label">
            {currentYear}年{currentMonth + 1}月
          </span>
          <button
            className="today-button"
            onClick={handleToday}
          >
            今日
          </button>
        </div>
        <button onClick={handleNextMonth}>▶</button>
      </div>

      {/* カレンダーグリッド */}
      <CalendarGrid
        year={currentYear}
        month={currentMonth}
        tasks={tasks}
        onSelectDate={handleSelectDate}
      />

    </div>
  )
}

export default CalendarPage