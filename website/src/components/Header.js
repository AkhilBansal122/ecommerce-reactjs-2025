import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCategories, setError, setLoading } from '../store/slices/CategorySlice';
import config from '../config';
import axios from 'axios';

const Header = () => {

  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.categories);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.baseURL}web/active-category`); // API call to fetch categories
        if (response.data.status === true) {
          dispatch(setCategories(response.data.data));
        } else {
          console.log("Failed to fetch categories: ", response.data.message);
        }
      } catch (err) {
        console.log("Failed to fetch categories: ", err);
      }
    };

    fetchCategories();
  }, [dispatch]);

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-left d-none d-sm-block">
            <p className="top-message text-uppercase">FREE Returns. Standard Shipping Orders $99+</p>
          </div>
          {/* End .header-left */}
          <div className="header-right header-dropdowns ml-0 ml-sm-auto w-sm-100">
            <div className="header-dropdown dropdown-expanded d-none d-lg-block">
              <a href="#">Links</a>
              <div className="header-menu">
                <ul>
                  <li><a href="dashboard.html">My Account</a></li>
                  <li><a href="about.html">About Us</a></li>
                  <li><a href="blog.html">Blog</a></li>
                  <li><a href="wishlist.html">My Wishlist</a></li>
                  <li><a href="cart.html">Cart</a></li>
                  <li><a href="login.html" className="login-link">Log In</a></li>
                </ul>
              </div>
              {/* End .header-menu */}
            </div>
            {/* End .header-dropdown */}
            <span className="separator" />
            <div className="header-dropdown">
              <a href="#"><i className="flag-us flag" />ENG</a>
              <div className="header-menu">
                <ul>
                  <li><a href="#"><i className="flag-us flag mr-2" />ENG</a></li>
                  <li><a href="#"><i className="flag-fr flag mr-2" />FRA</a></li>
                </ul>
              </div>
              {/* End .header-menu */}
            </div>
            {/* End .header-dropdown */}
            <div className="header-dropdown mr-auto mr-sm-3 mr-md-0">
              <a href="#">USD</a>
              <div className="header-menu">
                <ul>
                  <li><a href="#">EUR</a></li>
                  <li><a href="#">USD</a></li>
                </ul>
              </div>
              {/* End .header-menu */}
            </div>
            {/* End .header-dropdown */}
            <span className="separator" />
            <div className="social-icons">
              <a href="#" className="social-icon social-facebook icon-facebook" target="_blank" rel="noopener noreferrer" />
              <a href="#" className="social-icon social-twitter icon-twitter" target="_blank" rel="noopener noreferrer" />
              <a href="#" className="social-icon social-instagram icon-instagram" target="_blank" rel="noopener noreferrer" />
            </div>
            {/* End .social-icons */}
          </div>
          {/* End .header-right */}
        </div>
        {/* End .container */}
      </div>
      {/* End .header-top */}
      <div className="header-middle sticky-header" data-sticky-options="{'mobile': true}">
        <div className="container">
          <div className="header-left col-lg-2 w-auto pl-0">
            <button className="mobile-menu-toggler text-primary mr-2" type="button">
              <i className="fas fa-bars" />
            </button>
            <a href="demo4.html" className="logo">
              <img src="/assets/images/logo.png" width={111} height={44} alt="Porto Logo" />
            </a>
          </div>
          {/* End .header-left */}
          <div className="header-right w-lg-max">
            <div className="header-icon header-search header-search-inline header-search-category w-lg-max text-right mt-0">
              <a href="#" className="search-toggle" role="button"><i className="icon-search-3" /></a>
              <form action="#" method="get">
                <div className="header-search-wrapper">
                  <input type="search" className="form-control" name="q" id="q" placeholder="Search..." required />
                  <div className="select-custom">
                    <select id="cat" name="cat">
                      <option value="all">All Categories</option>
                      {categoryList.map((category) => (
                        <option value={category.id} key={category.id || `cat-${category.name}`}>
                          {category.name}
                        </option>
                      ))}
                    </select>

                  </div>
                  {/* End .select-custom */}
                  <button className="btn icon-magnifier p-0" title="search" type="submit" />
                </div>
                {/* End .header-search-wrapper */}
              </form>
            </div>
            {/* End .header-search */}
            <div className="header-contact d-none d-lg-flex pl-4 pr-4">
              <img alt="phone" src="assets/images/phone.png" width={30} height={30} className="pb-1" />
              <h6><span>Call us now</span><a href="tel:#" className="text-dark font1">+123 5678 890</a></h6>
            </div>
            <a href="login.html" className="header-icon" title="login"><i className="icon-user-2" /></a>
            <a href="wishlist.html" className="header-icon" title="wishlist"><i className="icon-wishlist-2" /></a>
            <div className="dropdown cart-dropdown">
              <a href="#" title="Cart" className="dropdown-toggle dropdown-arrow cart-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                <i className="minicart-icon" />
                <span className="cart-count badge-circle">3</span>
              </a>
              <div className="cart-overlay" />
              <div className="dropdown-menu mobile-cart">
                <a href="#" title="Close (Esc)" className="btn-close">×</a>
                <div className="dropdownmenu-wrapper custom-scrollbar">
                  <div className="dropdown-cart-header">Shopping Cart</div>
                  {/* End .dropdown-cart-header */}
                  <div className="dropdown-cart-products">
                    <div className="product">
                      <div className="product-details">
                        <h4 className="product-title">
                          <a href="product.html">Ultimate 3D Bluetooth Speaker</a>
                        </h4>
                        <span className="cart-product-info">
                          <span className="cart-product-qty">1</span> × $99.00
                        </span>
                      </div>
                      {/* End .product-details */}
                      <figure className="product-image-container">
                        <a href="product.html" className="product-image">
                          <img src="assets/images/products/product-1.jpg" alt="product" width={80} height={80} />
                        </a>
                        <a href="#" className="btn-remove" title="Remove Product"><span>×</span></a>
                      </figure>
                    </div>
                    {/* End .product */}
                    <div className="product">
                      <div className="product-details">
                        <h4 className="product-title">
                          <a href="product.html">Brown Women Casual HandBag</a>
                        </h4>
                        <span className="cart-product-info">
                          <span className="cart-product-qty">1</span> × $35.00
                        </span>
                      </div>
                      {/* End .product-details */}
                      <figure className="product-image-container">
                        <a href="product.html" className="product-image">
                          <img src="assets/images/products/product-2.jpg" alt="product" width={80} height={80} />
                        </a>
                        <a href="#" className="btn-remove" title="Remove Product"><span>×</span></a>
                      </figure>
                    </div>
                    {/* End .product */}
                    <div className="product">
                      <div className="product-details">
                        <h4 className="product-title">
                          <a href="product.html">Circled Ultimate 3D Speaker</a>
                        </h4>
                        <span className="cart-product-info">
                          <span className="cart-product-qty">1</span> × $35.00
                        </span>
                      </div>
                      {/* End .product-details */}
                      <figure className="product-image-container">
                        <a href="product.html" className="product-image">
                          <img src="assets/images/products/product-3.jpg" alt="product" width={80} height={80} />
                        </a>
                        <a href="#" className="btn-remove" title="Remove Product"><span>×</span></a>
                      </figure>
                    </div>
                    {/* End .product */}
                  </div>
                  {/* End .cart-product */}
                  <div className="dropdown-cart-total">
                    <span>SUBTOTAL:</span>
                    <span className="cart-total-price float-right">$134.00</span>
                  </div>
                  {/* End .dropdown-cart-total */}
                  <div className="dropdown-cart-action">
                    <a href="cart.html" className="btn btn-gray btn-block">View Cart</a>
                    <a href="checkout.html" className="btn btn-dark btn-block">Checkout</a>
                  </div>
                  {/* End .dropdown-cart-action */}
                </div>
                {/* End .dropdownmenu-wrapper */}
              </div>
              {/* End .dropdown-menu */}
            </div>
            {/* End .dropdown */}
          </div>
          {/* End .header-right */}
        </div>
        {/* End .container */}
      </div>
      {/* End .header-middle */}
      <div className="header-bottom sticky-header d-none d-lg-block" data-sticky-options="{'mobile': false}">
        <div className="container">
          <nav className="main-nav w-100">
            <ul className="menu sf-arrows">
              <li className="active">
                <a href="demo4.html">Home</a>
              </li>
              <li>
                <a href="category.html">Categories</a>
                <div className="megamenu megamenu-fixed-width">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="row">
                        <div className="col-lg-6">
                          <a href="#" className="nolink">Variations 1</a>
                          <ul className="submenu">
                            {categoryList.map((category) => (
                              <li key={category.id || `cat-${category.name}`}>
                                <a href={`/${category.slug}`}>{category.name}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-lg-6">
                          <a href="#" className="nolink">Variations 2</a>
                          <ul className="submenu">
                            <li><a href="category-list.html">List Types</a></li>
                            <li><a href="category-infinite-scroll.html">Ajax Infinite Scroll</a></li>
                            <li><a href="category.html">3 Columns Products</a></li>
                            <li><a href="category-4col.html">4 Columns Products</a></li>
                            <li><a href="category-5col.html">5 Columns Products</a></li>
                            <li><a href="category-6col.html">6 Columns Products</a></li>
                            <li><a href="category-7col.html">7 Columns Products</a></li>
                            <li><a href="category-8col.html">8 Columns Products</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="banner">
                        <a href="#">
                          <img src="assets/images/demoes/demo4/banners/menu-banner.jpg" alt="Menu banner" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <a href="product.html">Products</a>
                <ul>
                  <li><a href="product.html">Product</a></li>
                  <li><a href="product-centered.html">Product Centered</a></li>
                  <li><a href="product-extended.html">Product Extended</a></li>
                  <li><a href="product-gallery.html">Product Gallery</a></li>
                  <li><a href="product-sticky.html">Product Sticky Info</a></li>
                  <li><a href="product-sidebar.html">Product Sidebar</a></li>
                  <li><a href="product-fullwidth.html">Product Full Width</a></li>
                  <li><a href="product-masonry.html">Product Masonry</a></li>
                </ul>
              </li>
              <li>
                <a href="#">Pages</a>
                <ul>
                  <li><a href="wishlist.html">Wishlist</a></li>
                  <li><a href="cart.html">Shopping Cart</a></li>
                  <li><a href="checkout.html">Checkout</a></li>
                  <li><a href="dashboard.html">Dashboard</a></li>
                  <li><a href="login.html">Login</a></li>
                  <li><a href="forgot-password.html">Forgot Password</a></li>
                </ul>
              </li>
              <li>
                <a href="blog.html">Blog</a>
              </li>
              <li>
                <a href="#">Elements</a>
                <ul className="custom-scrollbar">
                  <li><a href="element-accordions.html">Accordion</a></li>
                  <li><a href="element-alerts.html">Alerts</a></li>
                  <li><a href="element-animations.html">Animations</a></li>
                  <li><a href="element-banners.html">Banners</a></li>
                  <li><a href="element-buttons.html">Buttons</a></li>
                  <li><a href="element-call-to-action.html">Call to Action</a></li>
                  <li><a href="element-countdown.html">Count Down</a></li>
                  <li><a href="element-counters.html">Counters</a></li>
                  <li><a href="element-headings.html">Headings</a></li>
                  <li><a href="element-icons.html">Icons</a></li>
                  <li><a href="element-info-box.html">Info box</a></li>
                  <li><a href="element-posts.html">Posts</a></li>
                  <li><a href="element-products.html">Products</a></li>
                  <li><a href="element-product-categories.html">Product Categories</a></li>
                  <li><a href="element-tabs.html">Tabs</a></li>
                  <li><a href="element-testimonial.html">Testimonials</a></li>
                </ul>
              </li>
              <li><Link to="/ContactUs">Contact Us</Link></li>
              <li className="float-right"><a href="https://1.envato.market/DdLk5" rel="noopener" className="pl-5" target="_blank">Buy Porto!</a></li>
              <li className="float-right"><a href="#" className="pl-5">Special Offer!</a></li>
            </ul>
          </nav>
        </div>
      </div>
      {/* End .header-bottom */}
    </header>
  );
};

export default Header;
