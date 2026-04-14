export default function PhaseTable({ tasks }) {
  return (
    <div className="task-list">
      {tasks.map((t) => (
        <div key={t.id} className="task-item">
          <span className="task-id">{t.id}</span>
          <span className="task-text">{t.task}</span>
          <span className="task-dur">{t.duration}</span>
        </div>
      ))}
    </div>
  );
}
