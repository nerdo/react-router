# @nerdo/react-routing
A React adapter for @nerdo/js-routing.

## URL Routing
The `makeReactUrlRouter(...)` function returns a new router object with the following properties:

* `useUrlRouting`: A hook that encapsulates routing behavior. It takes potential routes as an input and returns an array with...
  * `[0]`: the result of the routing operation.
  * `[1]`: a `navigation(...)` function that should be used to navigate to routes.
