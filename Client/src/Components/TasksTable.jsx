const TasksTable = ({ tasks, deleteTask, onTaskSelected }) => {
  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.th}>Task Name</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.length ? tasks?.map((task, index) => (
            <tr key={task?.id ?? index} style={styles.tableRow}>
              <td style={styles.td}>{task.taskName}</td>
              <td style={styles.td}>
                <button 
                  style={styles.button} 
                  onClick={() => onTaskSelected(task)}>
                  Edit
                </button>
                <button 
                  style={styles.button} 
                  onClick={() => deleteTask(task?.id)}>
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="2" style={styles.noDataCell}>No Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    width:'400px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',  // Rounded corners for the table
  },
  tableHeader: {
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  td: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  tableRow: {
    transition: 'background-color 0.3s ease',  // Add smooth hover effect
  },
  button: {
    margin: '0 5px',
    padding: '8px 16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  noDataCell: {
    textAlign: 'center',
    padding: '20px',
    color: '#888',
    fontStyle: 'italic',
  }
};

export default TasksTable;
