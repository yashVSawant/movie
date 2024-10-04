import React from "react";

import { Spinner ,Container} from "react-bootstrap";

const Loader = ()=>{
    return <Container className="d-flex justify-content-center align-items-center" style={{height:"100vh"}} >
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="light" />
      <Spinner animation="grow" variant="dark" />
    </Container>
}

export default Loader;