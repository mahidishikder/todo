import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardInfo from "../components/DashboardInfo/DashboardInfo";
import Todo from "../components/Todo/Todo";
import InProgress from "../components/InProgress/InProgress";
import Compleate from "../components/Compleate/Compleate";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SingUp/SignUp";
import Task from "../components/Task/Task";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard></Dashboard> ,
    errorElement:<Error></Error>,
    children:[
     
    {
      path:'/',
      element:<DashboardInfo></DashboardInfo>
    },
    {
      path:'/task',
      element:<Task></Task>
    },
    {
      path:'/todo',
      element:<Todo></Todo>
    },
    {
      path:'/inProgress',
      element:<InProgress></InProgress>
    },
    {
      path:'/completed',
      element:<Compleate></Compleate>
    },
    {
      path:'/signIn',
      element:<SignIn></SignIn>
    },
    {
      path:'/signUp',
      element:<SignUp></SignUp>
    },

  ]
  },
]);