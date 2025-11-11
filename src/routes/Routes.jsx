import { createBrowserRouter } from "react-router";
import Root from "../components/layouts/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivetRoute from "../context/PrivetRoute";
import UpcomingEvents from "../pages/UpcomingEvents/UpcomingEvents";
import EventDetails from "../pages/EventDetails/EventDetails";
import JoinedEvents from "../pages/JoinedEvents/JoinedEvents";
import CreateEvent from "../pages/CreateEvent/CreateEvent";
import ManageEvents from "../pages/ManageEvents/ManageEvents";
import ManageEventsUpdate from "../pages/ManageEvents/ManageEventsUpdate";


export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/upcoming-events',
                Component: UpcomingEvents,
            },
            {
                path: '/create-event',
                element: <PrivetRoute><CreateEvent></CreateEvent></PrivetRoute>
            },
            {
                path: '/manage-events',
                element: <PrivetRoute><ManageEvents></ManageEvents></PrivetRoute>
            },
            {
                path: '/joined-events',
                element: <PrivetRoute><JoinedEvents></JoinedEvents></PrivetRoute>
            },
            {
                path: 'login',
                Component: Login,
            },
            {
                path: '/register',
                Component: Register,
            },
            {
                path: '/event-details/:id',
                loader: ({params}) => fetch(`http://localhost:3000/events/${params.id}`),
                Component: EventDetails,
            },
            {
                path: '/manage-events-update/:id',
                loader: ({ params }) => fetch(`http://localhost:3000/events/${params.id}`),
                element: <PrivetRoute><ManageEventsUpdate></ManageEventsUpdate></PrivetRoute>
            }
        ]
    }
]);