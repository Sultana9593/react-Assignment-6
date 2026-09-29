import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      header: 'Complete React Assignment',
      description: 'Finish the routing, dynamic parameters and task management features.',
      priority: 'High',
      category: 'Academic',
      raisedDate: '28 Aug 2026, 10:00 AM',
      dueDate: '2026-08-30',
      status: 'Pending'
    },
    {
      id: 2,
      header: 'Grocery Shopping',
      description: 'Buy vegetables, fruits, and daily essential household items.',
      priority: 'Medium',
      category: 'Personal',
      raisedDate: '28 Aug 2026, 11:30 AM',
      dueDate: '2026-08-29',
      status: 'Raised'
    }
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <BrowserRouter>
      <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f8fafc', minHeight: '100vh', margin: 0, paddingBottom: '50px', color: '#334155' }}>
        
        {/* Modern Navigation Bar */}
        <nav style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: '#fff', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700', letterSpacing: '0.5px' }}> Taskify Pro</h2>
          <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
            <Link to="/" style={navLinkStyle}>Dashboard</Link>
            <Link to="/tasks" style={navLinkStyle}>Tasks</Link>
            <Link to="/add-task" style={navLinkStyle}>Add Task</Link>
            <Link to="/completed" style={navLinkStyle}>Completed</Link>
            <button 
              onClick={() => setIsAuthenticated(!isAuthenticated)}
              style={{ background: isAuthenticated ? '#ef4444' : '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem', transition: '0.2s' }}
            >
              {isAuthenticated ? 'Logout' : 'Login'}
            </button>
          </div>
        </nav>

        {/* Main Container */}
        <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard tasks={tasks} />} />
            <Route path="/tasks" element={<TasksList tasks={tasks} updateStatus={updateStatus} deleteTask={deleteTask} />} />
            <Route path="/tasks/:id" element={<TaskDetails tasks={tasks} />} />
            <Route path="/add-task" element={<AddTask addTask={addTask} isAuthenticated={isAuthenticated} />} />
            <Route path="/completed" element={<CompletedTasks tasks={tasks} />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

const navLinkStyle = {
  color: '#cbd5e1',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '0.95rem'
};

// 1. Dashboard Page
function Dashboard({ tasks }) {
  const total = tasks.length;
  const pending = tasks.filter(t => t.status === 'Pending' || t.status === 'Raised').length;
  const closed = tasks.filter(t => t.status === 'Closed').length;

  return (
    <div>
      <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>Dashboard Overview</h2>
      <p style={{ color: '#64748b', marginBottom: '30px' }}>Welcome back! Here is the summary of your daily tasks.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <Card title="Total Tasks" count={total} color="#3b82f6" bg="#eff6ff" />
        <Card title="Active / Pending" count={pending} color="#f59e0b" bg="#fffbeb" />
        <Card title="Completed Tasks" count={closed} color="#10b981" bg="#ecfdf5" />
      </div>
    </div>
  );
}

function Card({ title, count, color, bg }) {
  return (
    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderLeft: `6px solid ${color}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</h4>
        <p style={{ fontSize: '2.2rem', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>{count}</p>
      </div>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color, fontSize: '1.2rem', fontWeight: 'bold' }}>

      </div>
    </div>
  );
}

// 2. Tasks List Page
function TasksList({ tasks, updateStatus, deleteTask }) {
  const [filter, setFilter] = useState('All');
  const filteredTasks = filter === 'All' ? tasks : tasks.filter(t => t.category === filter || t.priority === filter);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>All Tasks</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All', 'Academic', 'Personal', 'High', 'Medium', 'Low'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', background: filter === cat ? '#0f172a' : '#fff', color: filter === cat ? '#fff' : '#475569', cursor: 'pointer', fontWeight: '500', fontSize: '0.85rem', transition: '0.2s' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {filteredTasks.length === 0 ? <p style={{ background: '#fff', padding: '30px', textAlign: 'center', borderRadius: '12px', color: '#64748b' }}>No tasks found.</p> : filteredTasks.map(task => (
          <div key={task.id} style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', border: '1px solid #f1f5f9' }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '1.15rem' }}>{task.header}</h3>
              <p style={{ margin: '0 0 14px 0', color: '#64748b', fontSize: '0.92rem', lineHeight: '1.5' }}>{task.description}</p>
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', flexWrap: 'wrap' }}>
                <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '6px', fontWeight: '600' }}>{task.category}</span>
                <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '4px 10px', borderRadius: '6px', fontWeight: '600' }}>Priority: {task.priority}</span>
                <span style={{ background: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '6px', fontWeight: '600' }}>Status: {task.status}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Link to={`/tasks/${task.id}`} style={{ textDecoration: 'none', background: '#f1f5f9', color: '#334155', padding: '8px 14px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600' }}>View Details</Link>
              <select 
                value={task.status} 
                onChange={(e) => updateStatus(task.id, e.target.value)}
                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', fontWeight: '500', cursor: 'pointer' }}
              >
                <option value="Raised">Raised</option>
                <option value="Pending">Pending</option>
                <option value="Closed">Closed</option>
              </select>
              <button onClick={() => deleteTask(task.id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. Add Task Page
function AddTask({ addTask, isAuthenticated }) {
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Academic');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div style={{ background: '#fff', padding: '50px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <h3 style={{ color: '#dc2626', fontSize: '1.5rem', marginBottom: '10px' }}>Protected Route!</h3>
        <p style={{ color: '#64748b' }}>You must be logged in to add a new task. Please click the Login button on top.</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!header || !dueDate) {
      alert('Please fill in required fields!');
      return;
    }

    const newTask = {
      id: Date.now(),
      header,
      description,
      priority,
      category,
      raisedDate: new Date().toLocaleString(),
      dueDate,
      status: 'Raised'
    };

    addTask(newTask);
    navigate('/tasks');
  };

  return (
    <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', maxWidth: '650px', margin: '0 auto', border: '1px solid #f1f5f9' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#0f172a', marginBottom: '5px' }}>Add New Task</h2>
      <p style={{ color: '#64748b', marginBottom: '25px' }}>Fill up the details below to create a new task.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e293b' }}>Task Header</label>
          <input type="text" placeholder="Enter task title..." value={header} onChange={e => setHeader(e.target.value)} style={inputStyle} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e293b' }}>Task Description</label>
          <textarea placeholder="Write details here..." value={description} onChange={e => setDescription(e.target.value)} style={{ ...inputStyle, height: '100px', resize: 'vertical' }} />
        </div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e293b' }}>Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} style={inputStyle}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e293b' }}>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
              <option value="Academic">Academic</option>
              <option value="Personal">Personal</option>
            </select>
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e293b' }}>Due Date</label>
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={inputStyle} required />
        </div>
        <button type="submit" style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', marginTop: '10px', transition: '0.2s' }}>Create Task</button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box'
};

function TaskDetails({ tasks }) {
  const { id } = useParams();
  const task = tasks.find(t => t.id.toString() === id);

  if (!task) {
    return <p style={{ background: '#fff', padding: '30px', textAlign: 'center', borderRadius: '12px' }}>Task not found!</p>;
  }

  return (
    <div style={{ background: '#fff', padding: '45px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', maxWidth: '700px', margin: '0 auto', border: '1px solid #f1f5f9' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#0f172a', margin: '0 0 10px 0' }}>{task.header}</h2>
      <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '6px', fontWeight: '600', fontSize: '0.85rem' }}>ID: {id}</span>
      <hr style={{ border: '0', borderTop: '1px solid #f1f5f9', margin: '20px 0' }} />
      <div style={{ display: 'grid', gap: '15px', color: '#475569', fontSize: '1rem' }}>
        <p style={{ margin: 0 }}><strong>Description:</strong> {task.description}</p>
        <p style={{ margin: 0 }}><strong>Priority:</strong> <span style={{ color: '#dc2626', fontWeight: '600' }}>{task.priority}</span></p>
        <p style={{ margin: 0 }}><strong>Category:</strong> {task.category}</p>
        <p style={{ margin: 0 }}><strong>Raised Date & Time:</strong> {task.raisedDate}</p>
        <p style={{ margin: 0 }}><strong>Due Date:</strong> {task.dueDate}</p>
        <p style={{ margin: 0 }}><strong>Status:</strong> <span style={{ color: '#10b981', fontWeight: '600' }}>{task.status}</span></p>
      </div>
      <Link to="/tasks" style={{ display: 'inline-block', marginTop: '25px', color: '#3b82f6', textDecoration: 'none', fontWeight: '600' }}>&larr; Back to Tasks</Link>
    </div>
  );
}

// 5. Completed Tasks Page
function CompletedTasks({ tasks }) {
  const completedTasks = tasks.filter(t => t.status === 'Closed');

  return (
    <div>
      <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#0f172a', marginBottom: '20px' }}>Completed / Closed Tasks</h2>
      <div style={{ display: 'grid', gap: '16px' }}>
        {completedTasks.length === 0 ? <p style={{ background: '#fff', padding: '30px', textAlign: 'center', borderRadius: '12px', color: '#64748b' }}>No completed tasks yet.</p> : completedTasks.map(task => (
          <div key={task.id} style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderLeft: '6px solid #10b981', border: '1px solid #f1f5f9' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '1.15rem' }}>{task.header}</h3>
            <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '0.92rem' }}>{task.description}</p>
            <span style={{ background: '#ecfdf5', color: '#047857', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600' }}>Status: Closed</span>
          </div>
        ))}
      </div>
    </div>
  );
}

