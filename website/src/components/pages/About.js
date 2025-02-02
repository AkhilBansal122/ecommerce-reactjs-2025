import React from 'react';
import Layout from '../Layout';

const About = () => {
  return (
    <Layout>
      <main className="main about">
        <div className="page-header page-header-bg text-left" style={{ background: '50%/cover #D4E1EA url("assets/images/page-header-bg.jpg")' }}>
          <div className="container">
            <h1><span>ABOUT US</span>
              OUR COMPANY</h1>
            <a href="contact.html" className="btn btn-dark">Contact</a>
          </div>{/* End .container */}
        </div>{/* End .page-header */}
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="demo4.html"><i className="icon-home" /></a></li>
              <li className="breadcrumb-item active" aria-current="page">About Us</li>
            </ol>
          </div>{/* End .container */}
        </nav>
        <div className="about-section">
          <div className="container">
            <h2 className="subtitle">OUR STORY</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
              the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has survived not only five centuries,
              but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
              the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.</p>
            <p className="lead">“ Many desktop publishing packages and web page editors now use Lorem Ipsum as their
              default model search for evolved over sometimes by accident, sometimes on purpose ”</p>
          </div>{/* End .container */}
        </div>{/* End .about-section */}
        <div className="features-section bg-gray">
          <div className="container">
            <h2 className="subtitle">WHY CHOOSE US</h2>
            <div className="row">
              <div className="col-lg-4">
                <div className="feature-box bg-white">
                  <i className="icon-shipped" />
                  <div className="feature-box-content p-0">
                    <h3>Free Shipping</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                      Ipsum has been the industr.</p>
                  </div>{/* End .feature-box-content */}
                </div>{/* End .feature-box */}
              </div>{/* End .col-lg-4 */}
              <div className="col-lg-4">
                <div className="feature-box bg-white">
                  <i className="icon-us-dollar" />
                  <div className="feature-box-content p-0">
                    <h3>100% Money Back Guarantee</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                      Ipsum has been the industr.</p>
                  </div>{/* End .feature-box-content */}
                </div>{/* End .feature-box */}
              </div>{/* End .col-lg-4 */}
              <div className="col-lg-4">
                <div className="feature-box bg-white">
                  <i className="icon-online-support" />
                  <div className="feature-box-content p-0">
                    <h3>Online Support 24/7</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                      Ipsum has been the industr.</p>
                  </div>{/* End .feature-box-content */}
                </div>{/* End .feature-box */}
              </div>{/* End .col-lg-4 */}
            </div>{/* End .row */}
          </div>{/* End .container */}
        </div>{/* End .features-section */}
        <div className="testimonials-section">
          <div className="container">
            <h2 className="subtitle text-center">HAPPY CLIENTS</h2>
            <div className="testimonials-carousel owl-carousel owl-theme images-left" data-owl-options="{
						'margin': 20,
                  'lazyLoad': true,
                  'autoHeight': true,
                  'dots': false,
                  'responsive': {
                      '0': {
                          'items': 1
                      },
                      '992': {
                          'items': 2
                      }
                  }
              }">
              <div className="testimonial">
                <div className="testimonial-owner">
                  <figure>
                    <img src="assets/images/clients/client1.png" alt="client" />
                  </figure>
                  <div>
                    <strong className="testimonial-title">John Smith</strong>
                    <span>SMARTWAVE CEO</span>
                  </div>
                </div>{/* End .testimonial-owner */}
                <blockquote>
                  <p>Lorem ipsum dolor sit amet, consectetur elitad adipiscing Cras non placerat mipsum
                    dolor sit amet, consectetur elitad adipiscing cas non placerat mi.</p>
                </blockquote>
              </div>{/* End .testimonial */}
              <div className="testimonial">
                <div className="testimonial-owner">
                  <figure>
                    <img src="assets/images/clients/client2.png" alt="client" />
                  </figure>
                  <div>
                    <strong className="testimonial-title">Bob Smith</strong>
                    <span>SMARTWAVE CEO</span>
                  </div>
                </div>{/* End .testimonial-owner */}
                <blockquote>
                  <p>Lorem ipsum dolor sit amet, consectetur elitad adipiscing Cras non placerat mipsum
                    dolor sit amet, consectetur elitad adipiscing cas non placerat mi.</p>
                </blockquote>
              </div>{/* End .testimonial */}
              <div className="testimonial">
                <div className="testimonial-owner">
                  <figure>
                    <img src="assets/images/clients/client1.png" alt="client" />
                  </figure>
                  <div>
                    <strong className="testimonial-title">John Smith</strong>
                    <span>SMARTWAVE CEO</span>
                  </div>
                </div>{/* End .testimonial-owner */}
                <blockquote>
                  <p>Lorem ipsum dolor sit amet, consectetur elitad adipiscing Cras non placerat mipsum
                    dolor sit amet, consectetur elitad adipiscing cas non placerat mi.</p>
                </blockquote>
              </div>{/* End .testimonial */}
            </div>{/* End .testimonials-slider */}
          </div>{/* End .container */}
        </div>{/* End .testimonials-section */}
        <div className="counters-section bg-gray">
          <div className="container">
            <div className="row">
              <div className="col-6 col-md-4 count-container">
                <div className="count-wrapper">
                  <span className="count-to" data-from={0} data-to={200} data-speed={2000} data-refresh-interval={50}>200</span>+
                </div>{/* End .count-wrapper */}
                <h4 className="count-title">MILLION CUSTOMERS</h4>
              </div>{/* End .col-md-4 */}
              <div className="col-6 col-md-4 count-container">
                <div className="count-wrapper">
                  <span className="count-to" data-from={0} data-to={1800} data-speed={2000} data-refresh-interval={50}>1800</span>+
                </div>{/* End .count-wrapper */}
                <h4 className="count-title">TEAM MEMBERS</h4>
              </div>{/* End .col-md-4 */}
              <div className="col-6 col-md-4 count-container">
                <div className="count-wrapper line-height-1">
                  <span className="count-to" data-from={0} data-to={24} data-speed={2000} data-refresh-interval={50}>24</span><span>HR</span>
                </div>{/* End .count-wrapper */}
                <h4 className="count-title">SUPPORT AVAILABLE</h4>
              </div>{/* End .col-md-4 */}
              <div className="col-6 col-md-4 count-container">
                <div className="count-wrapper">
                  <span className="count-to" data-from={0} data-to={265} data-speed={2000} data-refresh-interval={50}>265</span>+
                </div>{/* End .count-wrapper */}
                <h4 className="count-title">SUPPORT AVAILABLE</h4>
              </div>{/* End .col-md-4 */}
              <div className="col-6 col-md-4 count-container">
                <div className="count-wrapper line-height-1">
                  <span className="count-to" data-from={0} data-to={99} data-speed={2000} data-refresh-interval={50}>99</span><span>%</span>
                </div>{/* End .count-wrapper */}
                <h4 className="count-title">SUPPORT AVAILABLE</h4>
              </div>{/* End .col-md-4 */}
            </div>{/* End .row */}
          </div>{/* End .container */}
        </div>{/* End .counters-section */}
      </main>{/* End .main */}

    </Layout>
  );
};

export default About;
