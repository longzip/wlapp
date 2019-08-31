import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageNotFound from './common/PageNotFound';
import Home from './landing/Home';
import CourseListContainer from './course/CourseListContainer'; // eslint-disable-line import/no-named-as-default
import AddOrEditCourseContainer from './course/AddOrEditCourseContainer'; // eslint-disable-line import/no-named-as-default
import About from './About';
import createBrowserHistory from 'history/createBrowserHistory';
import HeaderNavContainer from './landing/HeaderNavContainer'; // eslint-disable-line import/no-named-as-default
import MenuContainer from './landing/MenuContainer';



const history = createBrowserHistory();


const App = () => {
    return (
        <Router history={history}>
            <div>

                <HeaderNavContainer />
                <MenuContainer />
                <div class="content-wrapper">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/courses" component={CourseListContainer} />
                        <Route exact path="/course" component={AddOrEditCourseContainer} />
                        <Route path="/course/:id" component={AddOrEditCourseContainer} />
                        <Route path="/about" component={About} />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
                <footer class="main-footer">
                    <div class="float-right d-none d-sm-block">
                        <b>Version</b> 3.0.0-beta.2
    </div>
                    <strong>Copyright &copy; 2014-2019 <a href="http://adminlte.io">AdminLTE.io</a>.</strong> All rights
                    reserved.
  </footer>
            </div>

        </Router>
    );
};


export default App;