import React, { Fragment } from "react";
// import { Link } from 'react-router-dom'

const AdminFooter = () => {
  return (
    <Fragment>
      <footer className="sticky-footer">
        <div className="container">
          <div className="text-center">
            <small>
              Copyright &copy; All rights reserved | From Exploresio Team
            </small>
          </div>
        </div>
      </footer>
      {/* Scroll to Top Button */}
      {/* <Link className="scroll-to-top rounded" to="#page-top">
            <i className="fa fa-angle-up"></i>
            </Link> */}
    </Fragment>
  );
};

export default AdminFooter;
