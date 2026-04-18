function ComponentsAccordionPage() {
  return (
    <div>
      <div className="main-content page-components-accordion">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Accordion</h1>
          <nav className="breadcrumb">
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Home</a>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Components</a>
            <span className="breadcrumb-item active">Accordion</span>
          </nav>
        </div>
        {/* Basic Accordion */}
        <section className="section">
          <div className="row g-4">
            {/* Default Accordion */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Default Accordion</h5>
                  <p className="card-subtitle">Basic collapsible accordion panels</p>
                </div>
                <div className="card-body">
                  <div className="accordion" id="accordionDefault">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          Accordion Item #1
                        </button>
                      </h2>
                      <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionDefault">
                        <div className="accordion-body">
                          <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          Accordion Item #2
                        </button>
                      </h2>
                      <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionDefault">
                        <div className="accordion-body">
                          <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          Accordion Item #3
                        </button>
                      </h2>
                      <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionDefault">
                        <div className="accordion-body">
                          <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Flush Accordion */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Flush Accordion</h5>
                  <p className="card-subtitle">Accordion without borders and rounded corners</p>
                </div>
                <div className="card-body">
                  <div className="accordion accordion-flush" id="accordionFlush">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                          Accordion Item #1
                        </button>
                      </h2>
                      <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlush">
                        <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                          Accordion Item #2
                        </button>
                      </h2>
                      <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlush">
                        <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                          Accordion Item #3
                        </button>
                      </h2>
                      <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlush">
                        <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Always Open & Bordered */}
        <section className="section">
          <h5 className="section-title mb-3">Accordion Variations</h5>
          <div className="row g-4">
            {/* Always Open */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Always Open</h5>
                  <p className="card-subtitle">Multiple items can be open at once</p>
                </div>
                <div className="card-body">
                  <div className="accordion" id="accordionAlwaysOpen">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#alwaysOpenOne" aria-expanded="true" aria-controls="alwaysOpenOne">
                          Accordion Item #1
                        </button>
                      </h2>
                      <div id="alwaysOpenOne" className="accordion-collapse collapse show">
                        <div className="accordion-body">
                          <strong>This accordion has no parent constraint.</strong> Each item can be opened independently without closing others. This is useful for FAQ sections where users might want to compare multiple answers.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#alwaysOpenTwo" aria-expanded="true" aria-controls="alwaysOpenTwo">
                          Accordion Item #2
                        </button>
                      </h2>
                      <div id="alwaysOpenTwo" className="accordion-collapse collapse show">
                        <div className="accordion-body">
                          <strong>Both items are open by default.</strong> Notice that there's no <code>data-bs-parent</code> attribute on the collapse elements, allowing them to stay open independently.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#alwaysOpenThree" aria-expanded="false" aria-controls="alwaysOpenThree">
                          Accordion Item #3
                        </button>
                      </h2>
                      <div id="alwaysOpenThree" className="accordion-collapse collapse">
                        <div className="accordion-body">
                          <strong>This item starts collapsed.</strong> But you can open it without affecting the other items above.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* With Icons */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">With Icons</h5>
                  <p className="card-subtitle">Accordion items with leading icons</p>
                </div>
                <div className="card-body">
                  <div className="accordion" id="accordionIcons">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#iconCollapseOne" aria-expanded="true" aria-controls="iconCollapseOne">
                          <i className="bi bi-person-circle me-2 text-primary" />
                          Account Settings
                        </button>
                      </h2>
                      <div id="iconCollapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionIcons">
                        <div className="accordion-body">
                          Manage your account settings including your profile information, email preferences, and security options. You can update your display name, avatar, and contact information here.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#iconCollapseTwo" aria-expanded="false" aria-controls="iconCollapseTwo">
                          <i className="bi bi-shield-lock me-2 text-success" />
                          Privacy &amp; Security
                        </button>
                      </h2>
                      <div id="iconCollapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionIcons">
                        <div className="accordion-body">
                          Control your privacy settings and security preferences. Enable two-factor authentication, manage connected devices, and review your login history.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#iconCollapseThree" aria-expanded="false" aria-controls="iconCollapseThree">
                          <i className="bi bi-bell me-2 text-warning" />
                          Notifications
                        </button>
                      </h2>
                      <div id="iconCollapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionIcons">
                        <div className="accordion-body">
                          Configure how and when you receive notifications. Choose between email, push notifications, or SMS for different types of alerts and updates.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#iconCollapseFour" aria-expanded="false" aria-controls="iconCollapseFour">
                          <i className="bi bi-credit-card me-2 text-danger" />
                          Billing &amp; Payments
                        </button>
                      </h2>
                      <div id="iconCollapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionIcons">
                        <div className="accordion-body">
                          Manage your billing information, view invoices, and update payment methods. You can also change your subscription plan or cancel at any time.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Colored Accordions */}
        <section className="section">
          <h5 className="section-title mb-3">Colored Accordions</h5>
          <div className="row g-4">
            {/* Primary */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Primary Accordion</h5>
                  <p className="card-subtitle">Custom styled with primary color</p>
                </div>
                <div className="card-body">
                  <div className="accordion accordion-primary" id="accordionPrimary">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#primaryOne" aria-expanded="true" aria-controls="primaryOne">
                          Getting Started
                        </button>
                      </h2>
                      <div id="primaryOne" className="accordion-collapse collapse show" data-bs-parent="#accordionPrimary">
                        <div className="accordion-body">
                          Welcome to our platform! This guide will help you get started with the basics. Follow the steps below to set up your account and begin using our features.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#primaryTwo" aria-expanded="false" aria-controls="primaryTwo">
                          Installation Guide
                        </button>
                      </h2>
                      <div id="primaryTwo" className="accordion-collapse collapse" data-bs-parent="#accordionPrimary">
                        <div className="accordion-body">
                          Follow our step-by-step installation guide to set up the software on your system. We support Windows, macOS, and Linux platforms.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#primaryThree" aria-expanded="false" aria-controls="primaryThree">
                          Configuration Options
                        </button>
                      </h2>
                      <div id="primaryThree" className="accordion-collapse collapse" data-bs-parent="#accordionPrimary">
                        <div className="accordion-body">
                          Customize the application to suit your needs with our extensive configuration options. You can adjust settings for performance, appearance, and behavior.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Success */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Success Accordion</h5>
                  <p className="card-subtitle">Custom styled with success color</p>
                </div>
                <div className="card-body">
                  <div className="accordion accordion-success" id="accordionSuccess">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#successOne" aria-expanded="true" aria-controls="successOne">
                          Order Confirmed
                        </button>
                      </h2>
                      <div id="successOne" className="accordion-collapse collapse show" data-bs-parent="#accordionSuccess">
                        <div className="accordion-body">
                          Your order has been confirmed and is being processed. You will receive an email confirmation shortly with your order details.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#successTwo" aria-expanded="false" aria-controls="successTwo">
                          Payment Received
                        </button>
                      </h2>
                      <div id="successTwo" className="accordion-collapse collapse" data-bs-parent="#accordionSuccess">
                        <div className="accordion-body">
                          We have successfully received your payment. Thank you for your purchase! Your transaction ID is #TXN-2024-001234.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#successThree" aria-expanded="false" aria-controls="successThree">
                          Shipping Details
                        </button>
                      </h2>
                      <div id="successThree" className="accordion-collapse collapse" data-bs-parent="#accordionSuccess">
                        <div className="accordion-body">
                          Your order will be shipped within 1-2 business days. You can track your shipment using the tracking number that will be sent to your email.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Accordion with Content Types */}
        <section className="section">
          <h5 className="section-title mb-3">Accordion with Rich Content</h5>
          <div className="row g-4">
            {/* With Lists */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">With Lists &amp; Tables</h5>
                  <p className="card-subtitle">Accordion containing various content types</p>
                </div>
                <div className="card-body">
                  <div className="accordion" id="accordionContent">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#contentOne" aria-expanded="true" aria-controls="contentOne">
                          Features List
                        </button>
                      </h2>
                      <div id="contentOne" className="accordion-collapse collapse show" data-bs-parent="#accordionContent">
                        <div className="accordion-body">
                          <ul className="list-unstyled mb-0">
                            <li className="d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle text-success me-2" />
                              Unlimited storage space
                            </li>
                            <li className="d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle text-success me-2" />
                              Priority customer support
                            </li>
                            <li className="d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle text-success me-2" />
                              Advanced analytics dashboard
                            </li>
                            <li className="d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle text-success me-2" />
                              Custom integrations
                            </li>
                            <li className="d-flex align-items-center">
                              <i className="bi bi-check-circle text-success me-2" />
                              API access
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#contentTwo" aria-expanded="false" aria-controls="contentTwo">
                          Pricing Table
                        </button>
                      </h2>
                      <div id="contentTwo" className="accordion-collapse collapse" data-bs-parent="#accordionContent">
                        <div className="accordion-body p-0">
                          <table className="table table-sm mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Plan</th>
                                <th>Users</th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Starter</td>
                                <td>1-5</td>
                                <td>$9/mo</td>
                              </tr>
                              <tr>
                                <td>Professional</td>
                                <td>6-20</td>
                                <td>$29/mo</td>
                              </tr>
                              <tr>
                                <td>Enterprise</td>
                                <td>Unlimited</td>
                                <td>$99/mo</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#contentThree" aria-expanded="false" aria-controls="contentThree">
                          Contact Form
                        </button>
                      </h2>
                      <div id="contentThree" className="accordion-collapse collapse" data-bs-parent="#accordionContent">
                        <div className="accordion-body">
                          <form>
                            <div className="mb-3">
                              <label htmlFor="contactName" className="form-label">Name</label>
                              <input type="text" className="form-control form-control-sm" id="contactName" placeholder="Your name" />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="contactEmail" className="form-label">Email</label>
                              <input type="email" className="form-control form-control-sm" id="contactEmail" placeholder="your@email.com" />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="contactMessage" className="form-label">Message</label>
                              <textarea className="form-control form-control-sm" id="contactMessage" rows={2} placeholder="Your message" defaultValue={""} />
                            </div>
                            <button type="submit" className="btn btn-primary btn-sm">Send Message</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Nested Accordion */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Nested Accordion</h5>
                  <p className="card-subtitle">Accordion within accordion</p>
                </div>
                <div className="card-body">
                  <div className="accordion" id="accordionNested">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#nestedOne" aria-expanded="true" aria-controls="nestedOne">
                          Products
                        </button>
                      </h2>
                      <div id="nestedOne" className="accordion-collapse collapse show" data-bs-parent="#accordionNested">
                        <div className="accordion-body">
                          <div className="accordion" id="nestedInnerOne">
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button className="accordion-button py-2" type="button" data-bs-toggle="collapse" data-bs-target="#innerOneA" aria-expanded="true" aria-controls="innerOneA">
                                  Electronics
                                </button>
                              </h2>
                              <div id="innerOneA" className="accordion-collapse collapse show" data-bs-parent="#nestedInnerOne">
                                <div className="accordion-body py-2">
                                  Smartphones, Laptops, Tablets, Accessories
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button className="accordion-button collapsed py-2" type="button" data-bs-toggle="collapse" data-bs-target="#innerOneB" aria-expanded="false" aria-controls="innerOneB">
                                  Clothing
                                </button>
                              </h2>
                              <div id="innerOneB" className="accordion-collapse collapse" data-bs-parent="#nestedInnerOne">
                                <div className="accordion-body py-2">
                                  Men's, Women's, Kids, Accessories
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nestedTwo" aria-expanded="false" aria-controls="nestedTwo">
                          Services
                        </button>
                      </h2>
                      <div id="nestedTwo" className="accordion-collapse collapse" data-bs-parent="#accordionNested">
                        <div className="accordion-body">
                          <div className="accordion" id="nestedInnerTwo">
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button className="accordion-button py-2" type="button" data-bs-toggle="collapse" data-bs-target="#innerTwoA" aria-expanded="true" aria-controls="innerTwoA">
                                  Consulting
                                </button>
                              </h2>
                              <div id="innerTwoA" className="accordion-collapse collapse show" data-bs-parent="#nestedInnerTwo">
                                <div className="accordion-body py-2">
                                  Business, Technical, Marketing
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button className="accordion-button collapsed py-2" type="button" data-bs-toggle="collapse" data-bs-target="#innerTwoB" aria-expanded="false" aria-controls="innerTwoB">
                                  Development
                                </button>
                              </h2>
                              <div id="innerTwoB" className="accordion-collapse collapse" data-bs-parent="#nestedInnerTwo">
                                <div className="accordion-body py-2">
                                  Web, Mobile, Desktop, API
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nestedThree" aria-expanded="false" aria-controls="nestedThree">
                          Support
                        </button>
                      </h2>
                      <div id="nestedThree" className="accordion-collapse collapse" data-bs-parent="#accordionNested">
                        <div className="accordion-body">
                          Our support team is available 24/7 to assist you with any questions or issues.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <section className="section">
          <h5 className="section-title mb-3">Real-World Examples</h5>
          <div className="row g-4">
            {/* FAQ */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">FAQ Section</h5>
                  <p className="card-subtitle">Common frequently asked questions pattern</p>
                </div>
                <div className="card-body">
                  <div className="accordion accordion-flush" id="accordionFAQ">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqOne" aria-expanded="false" aria-controls="faqOne">
                          <i className="bi bi-question-circle me-2 text-primary" />
                          How do I reset my password?
                        </button>
                      </h2>
                      <div id="faqOne" className="accordion-collapse collapse" data-bs-parent="#accordionFAQ">
                        <div className="accordion-body text-muted">
                          Click on the "Forgot Password" link on the login page. Enter your email address, and we'll send you a link to reset your password. The link expires after 24 hours.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqTwo" aria-expanded="false" aria-controls="faqTwo">
                          <i className="bi bi-question-circle me-2 text-primary" />
                          Can I cancel my subscription anytime?
                        </button>
                      </h2>
                      <div id="faqTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFAQ">
                        <div className="accordion-body text-muted">
                          Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqThree" aria-expanded="false" aria-controls="faqThree">
                          <i className="bi bi-question-circle me-2 text-primary" />
                          Is my data secure?
                        </button>
                      </h2>
                      <div id="faqThree" className="accordion-collapse collapse" data-bs-parent="#accordionFAQ">
                        <div className="accordion-body text-muted">
                          Absolutely! We use industry-standard encryption (AES-256) for all data at rest and in transit. We also perform regular security audits and penetration testing.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqFour" aria-expanded="false" aria-controls="faqFour">
                          <i className="bi bi-question-circle me-2 text-primary" />
                          Do you offer a free trial?
                        </button>
                      </h2>
                      <div id="faqFour" className="accordion-collapse collapse" data-bs-parent="#accordionFAQ">
                        <div className="accordion-body text-muted">
                          Yes, we offer a 14-day free trial with full access to all features. No credit card required to start your trial.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Order Details */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Order Summary</h5>
                  <p className="card-subtitle">E-commerce checkout pattern</p>
                </div>
                <div className="card-body">
                  <div className="accordion" id="accordionOrder">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#orderItems" aria-expanded="true" aria-controls="orderItems">
                          <span className="d-flex justify-content-between w-100 me-3">
                            <span>Order Items (3)</span>
                            <span className="text-muted">$147.00</span>
                          </span>
                        </button>
                      </h2>
                      <div id="orderItems" className="accordion-collapse collapse show" data-bs-parent="#accordionOrder">
                        <div className="accordion-body">
                          <div className="d-flex justify-content-between mb-2">
                            <span>Product A × 2</span>
                            <span>$58.00</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Product B × 1</span>
                            <span>$89.00</span>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between fw-bold">
                            <span>Subtotal</span>
                            <span>$147.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#orderShipping" aria-expanded="false" aria-controls="orderShipping">
                          <span className="d-flex justify-content-between w-100 me-3">
                            <span>Shipping</span>
                            <span className="text-muted">$9.99</span>
                          </span>
                        </button>
                      </h2>
                      <div id="orderShipping" className="accordion-collapse collapse" data-bs-parent="#accordionOrder">
                        <div className="accordion-body">
                          <div className="form-check mb-2">
                            <input className="form-check-input" type="radio" name="shipping" id="shippingStandard" defaultChecked />
                            <label className="form-check-label d-flex justify-content-between" htmlFor="shippingStandard">
                              <span>Standard (5-7 days)</span>
                              <span>$9.99</span>
                            </label>
                          </div>
                          <div className="form-check mb-2">
                            <input className="form-check-input" type="radio" name="shipping" id="shippingExpress" />
                            <label className="form-check-label d-flex justify-content-between" htmlFor="shippingExpress">
                              <span>Express (2-3 days)</span>
                              <span>$19.99</span>
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="shipping" id="shippingOvernight" />
                            <label className="form-check-label d-flex justify-content-between" htmlFor="shippingOvernight">
                              <span>Overnight</span>
                              <span>$29.99</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#orderPromo" aria-expanded="false" aria-controls="orderPromo">
                          <span className="d-flex justify-content-between w-100 me-3">
                            <span>Promo Code</span>
                            <span className="text-success small">SAVE10 applied</span>
                          </span>
                        </button>
                      </h2>
                      <div id="orderPromo" className="accordion-collapse collapse" data-bs-parent="#accordionOrder">
                        <div className="accordion-body">
                          <div className="input-group">
                            <input type="text" className="form-control form-control-sm" placeholder="Enter promo code" defaultValue="SAVE10" />
                            <button className="btn btn-outline-secondary btn-sm" type="button">Apply</button>
                          </div>
                          <div className="text-success small mt-2">
                            <i className="bi bi-check-circle me-1" /> 10% discount applied (-$14.70)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-light rounded">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal</span>
                      <span>$147.00</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping</span>
                      <span>$9.99</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2 text-success">
                      <span>Discount</span>
                      <span>-$14.70</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold fs-5">
                      <span>Total</span>
                      <span>$142.29</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#" onClick={(event) => event.preventDefault()}>Docs</a>
            <a href="#" onClick={(event) => event.preventDefault()}>Privacy</a>
            <a href="#" onClick={(event) => event.preventDefault()}>Security</a>
            <a href="#" onClick={(event) => event.preventDefault()}>Support</a>
          </div>
          <div className="footer-credits">
            <div className="footer-copyright">
              © 2026 <a href="#" onClick={(event) => event.preventDefault()}>FlexAdmin</a>
            </div>
            <div className="footer-copyright">
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ComponentsAccordionPage
