import { useRouteError } from "react-router-dom"
const ErrorHome = () => {
    const err = useRouteError();
    return (
        <div>
        <h1>Oops</h1>
        <h2>Something Went Wrong on Home</h2>
        <h3>{ err.status + err.statusText }</h3>
        </div>
    )
}
export default ErrorHome;