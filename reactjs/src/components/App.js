import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageNotFound from "./common/PageNotFound";
import Home from "./landing/Home";
import CourseListContainer from "./course/CourseListContainer"; // eslint-disable-line import/no-named-as-default
import AddOrEditCourseContainer from "./course/AddOrEditCourseContainer"; // eslint-disable-line import/no-named-as-default
import About from "./About";
import HeaderNavContainer from "./landing/HeaderNavContainer"; // eslint-disable-line import/no-named-as-default
import MenuContainer from "./landing/MenuContainer";
import Footer from "./landing/Footer";

const App = () => {
  return (
    <Router>
      <div>
        <HeaderNavContainer />
        <MenuContainer />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/courses" component={CourseListContainer} />
          <Route exact path="/course" component={AddOrEditCourseContainer} />
          <Route path="/course/:id" component={AddOrEditCourseContainer} />
          <Route path="/about" component={About} />
          <Route component={PageNotFound} />
        </Switch>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
