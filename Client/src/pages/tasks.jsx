import  { useState, useEffect } from 'react';
import TasksTable from '../Components/TasksTable'
import TaskForm from '../Components/TaskForm'
import useAxios from '../hooks/useAxios';

const TaskPage = () => {
  const api = useAxios();

  const [tasks, setTasks] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
    const [error, setError] = useState('');
  
    const [selectedTask, setSelectedTask] = useState({
      taskName: '',
      id:''
    });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    if (api) {
      try {
        const response = await api.get('/tasks/all');
        const data =  response?.data?.tasks ?? [];
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
  };
  



  const deleteTask =async (taskId) => {
    onHide()
    await api.delete(`tasks/${taskId}`,).then((response)=>{
      if(response?.status === 200){
        alert('Task Deleted')
      fetchTasks()
      }
    })
    .catch(({response})=>{
      setError(response?.data?.message ?? 'Something went wrong');

    })
  }


  const onTaskSelected = (data) => {
    setShowCreateForm(true) 
    setSelectedTask({ ...selectedTask, taskName:data?.taskName,id: data?.id});

  }

  const onHide = () => {
    setShowCreateForm()
    setSelectedTask({taskName:'',id:''})
  }

  return (
    <div style={styles.container}>
      <h2>Tasks</h2>
      {error}
      <button onClick={() => setShowCreateForm(!showCreateForm)} style={styles.button}>
        {showCreateForm ? 'Hide Create Form' : 'Create New Task'}
      </button>
      

      {showCreateForm && (
        <TaskForm fetchTasks={fetchTasks} selectedTask={selectedTask} onHide={onHide} />
       
      )}

      <TasksTable tasks={tasks}  deleteTask={deleteTask} 
      onTaskSelected={onTaskSelected}
      
      />
    </div>
  );
};

const styles = {
  container: {
    padding: '20px'
  },
  button: {
    margin: '10px',
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  },
};

export default TaskPage;
