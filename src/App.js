import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Views from "./components/views";

function App() {
  const gotoTaken = (e) => {
    e.preventDefault();
    window.location.href = '/talent';
  }

  const gotoFan = (e) => {
    e.preventDefault();
    window.location.href = '/fan';
  }

  const anchorStyle = {
    cursor: 'pointer'
  }
  return (
    <div className="App">
      <div className="navigation">
        <ul class="nav">
          <li class="nav-item">
            <a style={anchorStyle} class="nav-link active" onClick={(e) => gotoTaken(e)}>
              Talent SignUp
            </a>
          </li>
          <li class="nav-item">
            <a style={anchorStyle} class="nav-link" onClick={(e) => gotoFan(e)}>
              Fan SignUp
            </a>
          </li>
        </ul>
      </div>
      <div className="outer-container">
        <div className="inner-container">
          <div className="header">
            <p></p>
          </div>
          <Router>
            <Switch>
              <Route path="/" component={Views} />
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
