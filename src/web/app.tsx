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
import { ScrollToTop } from "./components/ScrollToTop";

function App() {
  return (
    <Provider>
      <ScrollToTop />
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
    </Provider>
  );
}

export default App;
