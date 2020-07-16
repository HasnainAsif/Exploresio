import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./Flex.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/home/index/Home";
import Register from "./components/home/auth/Register";
import Login from "./components/home/auth/Login";
import Verify from "./components/home/auth/Verify";
import about from "./components/home/about/about";
import DestinationDetail from "./components/home/destination_detail/DestinationDetail";
import FlexExample from "./components/home/Custom_Layout/FlexExample";

import Admin from "./components/admin/index/Admin";
import AllUsers from "./components/admin/users/AllUsers";
import Newsletter from "./components/admin/users/Newsletter";
import AllTours from "./components/admin/tours/AllTours";
import CreateTour from "./components/admin/tours/CreateTour";
import SingleTour from "./components/admin/tours/SingleTour";
import CreateCustomTour from "./components/admin/custom_tours/CreateCustomTour";
import AllCustomTours from "./components/admin/custom_tours/AllCustomTours";
import CreateDestination from "./components/admin/custom_tours/CreateDestination";
import AllDestinations from "./components/admin/custom_tours/AllDestinations";
import SingleDestination from "./components/admin/custom_tours/SingleDestination";

//Redux
import store from "./store";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

import HomeRoute from "./components/home/routing/HomeRoute";
import AdminRoute from "./components/admin/routing/AdminRoute";
import Charting from "./components/home/Custom_Layout/Charting";
import TravelDestination from "./components/home/travel_destination/TravelDestination";
import CustomDestinationDetail from "./components/home/travel_destination/destination_detail/CustomDestinationDetail";
import Contact from "./components/home/contact/Contact";

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <HomeRoute exact path="/" component={Home} />
            <HomeRoute path="/about" component={about} />
            <HomeRoute path="/contact-us" component={Contact} />
            <HomeRoute path="/register" component={Register} />
            <HomeRoute path="/verify" component={Verify} />
            <HomeRoute path="/login" component={Login} />
            <HomeRoute
              path="/destination_details/:id"
              component={DestinationDetail}
            />
            <HomeRoute
              path="/travel_destination/:id"
              component={TravelDestination}
            />
            <HomeRoute
              path="/destination_details$:tourId$:destId"
              component={CustomDestinationDetail}
            />
            <HomeRoute path="/flex_layout" component={FlexExample} />
            <HomeRoute path="/charting" component={Charting} />

            <AdminRoute path="/admin" component={Admin} />
            <AdminRoute path="/admin$users" component={AllUsers} />
            <AdminRoute path="/admin$newsletter" component={Newsletter} />
            <AdminRoute path="/admin$tours" component={AllTours} />
            <AdminRoute path="/admin$tours$create" component={CreateTour} />
            <AdminRoute path="/admin$tours$:id" component={SingleTour} />
            <AdminRoute path="/admin$custom_tours" component={AllCustomTours} />
            <AdminRoute
              path="/admin$custom_tours$create"
              component={CreateCustomTour}
            />
            <AdminRoute
              path="/admin$custom_tours$create_destination$:id"
              component={CreateDestination}
            />
            <AdminRoute
              path="/admin$custom_tours$destinations$:id"
              component={AllDestinations}
            />
            <AdminRoute
              path="/admin$custom_tours$destination$:tourId$:destId"
              component={SingleDestination}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
