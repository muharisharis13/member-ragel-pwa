import { Fragment } from "react";
import { Banner } from "./component/banner/Banner";
import { IndexContent } from "./component/content";
import { Navbar } from "./component/header/navbar";
import { Hero } from "./component/hero/hero";
import { Route, Redirect, Switch } from 'react-router-dom'
import { DetailProduct } from "./pages/detailProduct/DetailProduct";
import { Home } from "./pages/home/Home";
import { Cart } from "./pages/cart/Cart";
import { Checkout } from "./pages/checkout/Checkout";
import { ListBooking } from './pages/booking/listBooking/listBooking'
import { DetailBooking } from './pages/booking/detailBooking/detailBooking'
import { Event } from './pages/event/Event';
import { Profile } from './pages/profile/profile/Profile'
import { EditProfile } from './pages/profile/editProfile/EditProfile'
import { TopUp } from './pages/profile/topup/TopUp'
import { Profit } from './pages/profile/profit/Profit'
import { Downliner } from './pages/profile/downliner/Downliner'
import { History } from './pages/profile/history/History'
import Cookies from "js-cookie";
import { HistoryTopUp } from "./pages/profile/topup/HistoryTopUp";
import { NotFound } from "./pages/Notfound";

function App() {

  if (!Cookies.get('token-user')) {
    return window.location.href = "/login"
  }
  return (
    <Fragment>
      <section id="header">
        <Navbar />
      </section>

      <div>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Home} />
          <Route path="/details/:id_product" component={DetailProduct} />
          <Route path="/event" component={Event} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/listBooking" component={ListBooking} />
          <Route path="/detailBooking/:idBooking" component={DetailBooking} />
          <Route path="/profile/:idUser" component={Profile} />
          <Route path="/edit/profile/:idUser" component={EditProfile} />
          <Route path="/topup" component={TopUp} />
          <Route path="/topups/history" component={HistoryTopUp} />
          <Route path="/profit" component={Profit} />
          <Route path="/downliner" component={Downliner} />
          <Route path="/history" component={History} />
          <Route path="*" component={NotFound} />

        </Switch>


        {/* <Redirect to='/404' /> */}
      </div>
    </Fragment>
  );
}

export default App;
