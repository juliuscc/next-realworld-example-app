import Login from "plutt-login";
import Router from "next/router";

export default () => <Login routeTo={(route) => Router.push(route, route)} />;
