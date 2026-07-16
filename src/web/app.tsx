import { Route, Switch } from "wouter";
import Index from "./pages/index";
import ToursPage from "./pages/tours";
import TourDetailPage from "./pages/tour-detail";
import AboutPage from "./pages/about";
import FaqPage from "./pages/faq";
import ContactPage from "./pages/contact";
import PrivacyPolicyPage from "./pages/privacy-policy";
import TermsOfServicePage from "./pages/terms-of-service";
import { Provider } from "./components/provider";
import { AgentFeedback } from "@runablehq/website-runtime";

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/tours" component={ToursPage} />
        <Route path="/tours/:slug" component={TourDetailPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/faq" component={FaqPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/terms-of-service" component={TermsOfServicePage} />
      </Switch>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
    </Provider>
  );
}

export default App;
