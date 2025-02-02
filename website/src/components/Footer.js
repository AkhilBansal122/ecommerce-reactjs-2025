import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-dark">
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="widget">
                <h4 className="widget-title">Contact Info</h4>
                <ul className="contact-info">
                  <li>
                    <span className="contact-info-label">Address:</span>123 Street Name, City, England
                  </li>
                  <li>
                    <span className="contact-info-label">Phone:</span><a href="tel:">(123)
                      456-7890</a>
                  </li>
                  <li>
                    <span className="contact-info-label">Email:</span> <a href="https://portotheme.com/cdn-cgi/l/email-protection#7518141c1935100d14180519105b161a18"><span className="__cf_email__" data-cfemail="5c313d35301c39243d312c3039723f3331">[email&nbsp;protected]</span></a>
                  </li>
                  <li>
                    <span className="contact-info-label">Working Days/Hours:</span> Mon - Sun / 9:00 AM - 8:00 PM
                  </li>
                </ul>
                <div className="social-icons">
                  <a href="#" className="social-icon social-facebook icon-facebook" target="_blank" title="Facebook" />
                  <a href="#" className="social-icon social-twitter icon-twitter" target="_blank" title="Twitter" />
                  <a href="#" className="social-icon social-instagram icon-instagram" target="_blank" title="Instagram" />
                </div>
                {/* End .social-icons */}
              </div>
              {/* End .widget */}
            </div>
            {/* End .col-lg-3 */}
            <div className="col-lg-3 col-sm-6">
              <div className="widget">
                <h4 className="widget-title">Customer Service</h4>
                <ul className="links">
                  <li><a href="#">Help &amp; FAQs</a></li>
                  <li><a href="#">Order Tracking</a></li>
                  <li><a href="#">Shipping &amp; Delivery</a></li>
                  <li><a href="#">Orders History</a></li>
                  <li><a href="#">Advanced Search</a></li>
                  <li><a href="dashboard.html">My Account</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="about.html">About Us</a></li>
                  <li><a href="#">Corporate Sales</a></li>
                  <li><a href="#">Privacy</a></li>
                </ul>
              </div>
              {/* End .widget */}
            </div>
            {/* End .col-lg-3 */}
            <div className="col-lg-3 col-sm-6">
              <div className="widget">
                <h4 className="widget-title">Popular Tags</h4>
                <div className="tagcloud">
                  <a href="#">Bag</a>
                  <a href="#">Black</a>
                  <a href="#">Blue</a>
                  <a href="#">Clothes</a>
                  <a href="#">Fashion</a>
                  <a href="#">Hub</a>
                  <a href="#">Shirt</a>
                  <a href="#">Shoes</a>
                  <a href="#">Skirt</a>
                  <a href="#">Sports</a>
                  <a href="#">Sweater</a>
                </div>
              </div>
              {/* End .widget */}
            </div>
            {/* End .col-lg-3 */}
            <div className="col-lg-3 col-sm-6">
              <div className="widget widget-newsletter">
                <h4 className="widget-title">Subscribe newsletter</h4>
                <p>Get all the latest information on events, sales and offers. Sign up for newsletter:
                </p>
                <form action="#" className="mb-0">
                  <input type="email" className="form-control m-b-3" placeholder="Email address" required />
                  <input type="submit" className="btn btn-primary shadow-none" defaultValue="Subscribe" />
                </form>
              </div>
              {/* End .widget */}
            </div>
            {/* End .col-lg-3 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </div>
      {/* End .footer-middle */}
      <div className="container">
        <div className="footer-bottom">
          <div className="container d-sm-flex align-items-center">
            <div className="footer-left">
              <span className="footer-copyright">© Porto eCommerce. 2021. All Rights Reserved</span>
            </div>
            <div className="footer-right ml-auto mt-1 mt-sm-0">
              <div className="payment-icons">
                <span className="payment-icon visa" style={{ backgroundImage: 'url(assets/images/payments/payment-visa.svg)' }} />
                <span className="payment-icon paypal" style={{ backgroundImage: 'url(assets/images/payments/payment-paypal.svg)' }} />
                <span className="payment-icon stripe" style={{ backgroundImage: 'url(assets/images/payments/payment-stripe.png)' }} />
                <span className="payment-icon verisign" style={{ backgroundImage: 'url(assets/images/payments/payment-verisign.svg)' }} />
              </div>
            </div>
          </div>
        </div>
        {/* End .footer-bottom */}
      </div>
      {/* End .container */}
    </footer>

  );
};

export default Footer;
