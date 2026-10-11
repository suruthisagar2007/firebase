
import React, { useEffect, useState } from "react";
import { auth, provider, db } from "./firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      loadTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  const loadTasks = async () => {
    if (!auth.currentUser) return;

    const tasksRef = collection(db, "tasks");
    const taskQuery = query(
      tasksRef,
      where("userId", "==", auth.currentUser.uid)
    );

    const snapshot = await getDocs(taskQuery);
    setTasks(
      snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data()
      }))
    );
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
      alert("Google login failed: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const addTask = async () => {
    if (!title.trim() || !summary.trim()) {
      alert("Enter both title and description.");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        title: title.trim(),
        summary: summary.trim(),
        userId: user.uid
      });

      setTitle("");
      setSummary("");
      await loadTasks();
    } catch (error) {
      console.error(error);
      alert("Could not add task: " + error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      await loadTasks();
    } catch (error) {
      console.error(error);
      alert("Could not delete task: " + error.message);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <h1>Welcome to To-Do List</h1>
        <button onClick={handleLogin}>
          Continue with Google
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1>To-Do List</h1>
      <p>Welcome, {user.displayName}</p>
      <button onClick={handleLogout}>Sign Out</button>

      <hr />

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Task description"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <br /><br />

      <button onClick={addTask}>Add Task</button>

      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.summary}</p>
          <button onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
