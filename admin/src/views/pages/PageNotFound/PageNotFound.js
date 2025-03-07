import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PageNotFound.scss";

function PageNotFound() {
  return (
    <section className="page-not-found">
      <Container>
        <div class="justify-content-center row">
          <div class="text-center page_not_found_section col-md-12">
            <h1>
              <span class="primary-color">4</span>0
              <span class="secondary-color">4</span>
            </h1>
            <h2>Look like you're lost</h2>
            <h3>The page you are looking for not available!</h3>
            <a class="themeBtn" href="/">
              Back to home
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PageNotFound;
