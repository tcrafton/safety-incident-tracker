import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from './components';
import {
  HazardConditionPage,
  InjuryPage,
  NearMissPage,
  PropertyDamagePage,
  ReportsPage,
} from './pages';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main">
        <Switch>
          <Route exact path="/SafetyIncidentTracker/injuryEntry">
            <InjuryPage />
          </Route>
          <Route exact path="/SafetyIncidentTracker/nearMissEntry">
            <NearMissPage />
          </Route>
          <Route exact path="/SafetyIncidentTracker/propertyDamageEntry">
            <PropertyDamagePage />
          </Route>
          <Route exact path="/SafetyIncidentTracker/hazardConditionEntry">
            <HazardConditionPage />
          </Route>
          <Route exact path="/SafetyIncidentTracker/reports">
            <ReportsPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
