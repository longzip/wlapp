import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageNotFound from "./common/PageNotFound";
import Home from "./landing/Home";
import ProductListContainer from "./product/ProductListContainer";
import AddOrEditProductContainer from "./product/AddOrEditProductContainer";
import CourseListContainer from "./course/CourseListContainer";
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
          <Route path="/products" component={ProductListContainer} />
          <Route exact path="/product" component={AddOrEditProductContainer} />
          <Route path="/product/:id" component={AddOrEditProductContainer} />

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
