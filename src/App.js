import {Switch} from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { authOperations, authSelectors } from 'redux/auth';

import AppBar from 'components/AppBar/AppBar';
import Wrapper from 'components/Wrapper/Wrapper';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
  const HomeView = lazy(() => import('./views/HomeView/HomeView.js' /* webpackChunkName: "HomeView" */));
  const ContactsView = lazy(() => import('./views/ContactsView.js' /* webpackChunkName: "ContactsView" */));
  const LoginView = lazy(() => import('./views/LoginView/LoginView.js' /* webpackChunkName: "LoginView" */));
  const RegisterView = lazy(() => import('./views/RegisterView/RegisterView.js' /* webpackChunkName: "RegisterView" */));

export default function App() {

  const dispatch = useDispatch();

  const isRefreshingUser = useSelector(authSelectors.getIsRefreshingUser);


  useEffect(() => {
    dispatch(authOperations.refresh());
  }, [dispatch]);

  return (
    <>
      {isRefreshingUser ? <p>App is loading...</p> :
      <>
        <AppBar />  

        <Wrapper>
          <Suspense fallback={<p>Loading ...</p>}>
            <Switch>
              <PrivateRoute path="/contacts" redirectTo="/login">
                <ContactsView/>
              </PrivateRoute>

              <PublicRoute path="/login" redirectTo='/contacts' restricted>
                  <LoginView/>
              </PublicRoute>

              <PublicRoute path="/register" redirectTo='/' restricted>
                <RegisterView/>
              </PublicRoute>

              <PublicRoute>
                <HomeView/>
              </PublicRoute>

            </Switch>
          </Suspense>
        </Wrapper>

        </>}
        <ToastContainer />
    </>        
    )




    // <Container>
    //   <AppBar />

    //   <Switch>
    //     <Route exact path="/" component={HomeView} />
    //     <Route path="/register" component={RegisterView} />
    //     <Route path="/login" component={LoginView} />
    //     <Route path="/todos" component={TodosView} />
    //   </Switch>
    // </Container>

 

} 