/*
  NotFoundPage.js
*/

import { Link } from "react-router-dom";

import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="NotFoundPage">
      <h1>404</h1>
      <h3>Sorry this page does not exist.</h3>
      <p>
        <Link to="/">Return to Home Page</Link>
      </p>
    </div>
  );
}
