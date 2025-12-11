import './App.css';
import { Todo } from './pages/Todo';
import ChatAI from './pages/ChatAI';
import Navbar from './components/Navbar';
import Notes from './pages/Notes';
import NotesDashboard from './pages/NotesDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TypographyExample from './Examples/typography';

function App() {
  return (
    <div className="App w-full h-full min-h-screen flex flex-col">
      <Navbar />
        <Routes>
          <Route path="/chat/:id" element={<ChatAI/>} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/notes/:chapterID/:id" element={<Notes />} />
          <Route path="/notes/:id" element={<NotesDashboard />} />
        </Routes>
    </div>

  );
}

export default App;
