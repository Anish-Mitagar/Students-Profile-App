import { Navigate } from 'react-router-dom'

// const PrivateRoute = ({ children }) => {
//   return (
//     <Route
//       {...rest}
//       render={
//         (props) => localStorage.getItem("authToken") ? (<Element {...props} />) : (<Navigate to="/login" />)
//       }
//     />
//   )
// }

const PrivateRoute = ({ children }) => {

    return localStorage.getItem("authToken") ? children : (<Navigate to="/login" />)

}

export default PrivateRoute;