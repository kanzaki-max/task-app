import type { Task } from "../types";

// このコンポーネントが受け取るPropsの型定義
type Props = {
  year: number;
  month: number;
  tasks: Task[];
  onSelectDate: (date: string) => void;
};

function CalendarGrid({ year, month, tasks, onSelectDate }: Props) {
  // 今日の日付
  const today = new Date();

  // 表示する月の1日
  const firstDay = new Date(year, month, 1);

  // 表示する月の最終日
  const lastDay = new Date(year, month + 1, 0);

  // 1日が何曜日か（0=日曜, 1=月曜 ... 6=土曜）
  const startDayOfWeek = firstDay.getDay();

  // カレンダーのマス目を作る
  // 最初は空マス（前月の分）で埋める
  const cells: (number | null)[] = [
    ...Array(startDayOfWeek).fill(null),
    ...Array.from({ length: lastDay.getDate() }, (_, i) => i + 1),
  ];

  // 日付文字列を作る関数 例: 2026-04-29
  const toDateString = (day: number): string => {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };

  // その日付にタスクがあるか確認する
  const getTasksForDate = (day: number): Task[] => {
    const dateStr = toDateString(day);
    return tasks.filter((task) => task.date === dateStr);
  };

  // 今日かどうか確認する
  const isToday = (day: number): boolean => {
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  return (
    <div className="calendar-grid">
      {/* 曜日ヘッダー */}
      <div className="calendar-days-header">
        {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
          <div key={day} className="calendar-day-label">
            {day}
          </div>
        ))}
      </div>

      {/* 日付マス目 */}
      <div className="calendar-cells">
        {cells.map((day, index) => (
          <div
            key={index}
            className={[
              "calendar-cell",
              day === null ? "calendar-cell--empty" : "",
              day !== null && isToday(day) ? "calendar-cell--today" : "",
            ].join(" ")}
            onClick={() => {
              if (day !== null) {
                onSelectDate(toDateString(day));
              }
            }}
          >
            {day !== null && (
              <>
                {/* 日付の数字 */}
                <span className="calendar-cell-day">{day}</span>

                {/* タスクドット */}
                <div className="calendar-cell-dots">
                  {getTasksForDate(day)
                    .slice(0, 3)
                    .map((task) => (
                      <span
                        key={task.id}
                        className="calendar-dot"
                        style={{ backgroundColor: "#888" }}
                      />
                    ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarGrid;
