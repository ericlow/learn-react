import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TasksScenario from './scenarios/tasks/TasksScenario'
import UsersScenario from './scenarios/users/UsersScenario'
import CartScenario from './scenarios/cart/CartScenario'
import FormScenario from './scenarios/form/FormScenario'
import FeedScenario from './scenarios/feed/FeedScenario'
import DebugScenario from './scenarios/debug/DebugScenario'
import SessionScenario from './scenarios/active/SessionScenario'
import PhaseTimer from './components/PhaseTimer'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scenarios/tasks" element={<TasksScenario />} />
        <Route path="/scenarios/users" element={<UsersScenario />} />
        <Route path="/scenarios/cart" element={<CartScenario />} />
        <Route path="/scenarios/form" element={<FormScenario />} />
        <Route path="/scenarios/feed" element={<FeedScenario />} />
        <Route path="/scenarios/debug" element={<DebugScenario />} />
        <Route path="/session" element={<SessionScenario />} />
      </Routes>
      <PhaseTimer />
    </>
  )
}
