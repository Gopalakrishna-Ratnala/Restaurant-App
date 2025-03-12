// import {
//   loginStart,
//   loginSuccess,
//   loginFailure,
//   logout,
// } from '../reducers/authReducer'
// import { AppDispatch } from '../store'

// // Modified login action to accept mutateLogin function
// export const login = (
//   userData: UserDetails,
//   mutateLogin: (userDetails: UserDetails) => void
// ) => {
//   // **1. Accept mutateLogin function as argument**
//   return (dispatch: AppDispatch) => {
//     dispatch(loginStart())
//     mutateLogin(userData) // **2. Trigger the React Query mutation by calling mutateLogin**
//     // **3. No API call logic (fetch) in authActions anymore - React Query handles it in LoginForm**
//   }
// }

// export const userLogout = () => (dispatch: AppDispatch) => {
//   dispatch(logout())
// }
export {}
