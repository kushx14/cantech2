import './App.css';
import  Home from './screens/Home.jsx'
import Login from './screens/Login.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup.jsx';
import {CartProvider} from './components/ContextReducer.jsx';

function App() {
  return (
    <CartProvider>
<Router>
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/creatuser" element={<Signup />} />
    </Routes>
  </div>
</Router>
</CartProvider>
  );
}

export default App;
