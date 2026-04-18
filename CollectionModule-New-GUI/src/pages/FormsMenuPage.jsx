import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const formPages = {
  elements: {
    title: "Form Elements",
    description: "Inputs, checks, radios, switches, and utility controls.",
  },
  layouts: {
    title: "Form Layouts",
    description: "Stacked, horizontal, and grid-aligned form compositions.",
  },
  validation: {
    title: "Form Validation",
    description: "Live feedback patterns for required and formatted fields.",
  },
  wizard: {
    title: "Form Wizard",
    description: "Multi-step form flow with progress and completion states.",
  },
  editors: {
    title: "Rich Editors",
    description: "Editor style blocks for long-form content workflows.",
  },
  pickers: {
    title: "Date and Time Pickers",
    description: "Date, time, datetime and range input combinations.",
  },
  select: {
    title: "Advanced Select",
    description: "Single, multi, grouped, and tag-style select patterns.",
  },
  upload: {
    title: "File Upload",
    description: "Drag area, file list, and upload status presentation.",
  },
};

function Card({ title, subtitle, children }) {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="card-title mb-0">{title}</h5>
        {subtitle ? <small className="text-muted">{subtitle}</small> : null}
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

function ElementsUI() {
  return (
    <>
      <Card
        title="Basic Inputs"
        subtitle="Text, email, password, and helper text"
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input className="form-control" placeholder="Jane Cooper" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="jane@example.com"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Readonly Input</label>
            <input className="form-control" value="Readonly value" readOnly />
          </div>
          <div className="col-md-6">
            <label className="form-label">Disabled Input</label>
            <input
              className="form-control"
              placeholder="Disabled input"
              disabled
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Plain Text Readonly</label>
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              value="email@example.com"
            />
          </div>
        </div>
      </Card>

      <Card title="Input Sizing" subtitle="Small and large form controls">
        <div className="row g-3 align-items-center">
          <div className="col-md-4">
            <label className="form-label">Large Input</label>
            <input
              className="form-control form-control-lg"
              placeholder="Large control"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Default Input</label>
            <input className="form-control" placeholder="Default control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Small Input</label>
            <input
              className="form-control form-control-sm"
              placeholder="Small control"
            />
          </div>
        </div>
      </Card>

      <Card title="Checks and Radios" subtitle="Common option controls">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="updates"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="updates">
                Email me updates
              </label>
            </div>
            <div className="form-check mt-2">
              <input className="form-check-input" type="checkbox" id="offers" />
              <label className="form-check-label" htmlFor="offers">
                Include promotional offers
              </label>
            </div>
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="disabledCheck"
                disabled
              />
              <label className="form-check-label" htmlFor="disabledCheck">
                Disabled checkbox
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="plan"
                id="starter"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="starter">
                Starter Plan
              </label>
            </div>
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="radio"
                name="plan"
                id="pro"
              />
              <label className="form-check-label" htmlFor="pro">
                Pro Plan
              </label>
            </div>
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="radio"
                name="plan"
                id="disabledRadio"
                disabled
              />
              <label className="form-check-label" htmlFor="disabledRadio">
                Disabled radio
              </label>
            </div>
          </div>
        </div>
      </Card>

      <Card
        title="Selects, Textareas, and Ranges"
        subtitle="Native controls and disabled states"
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Department</label>
            <select className="form-select">
              <option>Operations</option>
              <option>Marketing</option>
              <option>Engineering</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Disabled Select</label>
            <select className="form-select" disabled>
              <option>Disabled select</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Textarea</label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Tell us about your project..."
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Disabled Textarea</label>
            <textarea
              className="form-control"
              rows={3}
              disabled
              defaultValue="This textarea is disabled."
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Range (Default)</label>
            <input type="range" className="form-range" defaultValue={50} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Range with Steps</label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="5"
              step="0.5"
              defaultValue={2.5}
            />
          </div>
        </div>
      </Card>

      <Card title="Floating Labels" subtitle="Inputs with floating labels">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingEmail">Email address</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <select className="form-select" id="floatingSelect">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <label htmlFor="floatingSelect">Works with selects</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea"
                style={{ height: "120px" }}
              />
              <label htmlFor="floatingTextarea">Comments</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingDisabled"
                placeholder="name@example.com"
                disabled
                value="disabled@example.com"
                readOnly
              />
              <label htmlFor="floatingDisabled">Disabled input</label>
            </div>
          </div>
        </div>
      </Card>

      <Card
        title="Readonly and Disabled Forms"
        subtitle="Display and fieldset states"
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Readonly Input</label>
            <input
              type="text"
              className="form-control"
              value="Readonly value"
              readOnly
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Disabled File Input</label>
            <input type="file" className="form-control" disabled />
          </div>
          <div className="col-12">
            <fieldset disabled className="border rounded p-3">
              <legend className="float-none w-auto px-2 mb-0 fs-6">
                Disabled fieldset example
              </legend>
              <div className="row g-3 mt-1">
                <div className="col-md-6">
                  <label className="form-label">Text input</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Disabled input"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Select</label>
                  <select className="form-select">
                    <option>Disabled select</option>
                  </select>
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="disabledFieldsetCheck"
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="disabledFieldsetCheck"
                    >
                      Disabled checkbox
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </Card>
    </>
  );
}

function LayoutsUI() {
  return (
    <>
      <Card
        title="Stacked Layout"
        subtitle="Default stacked layout with labels above inputs"
      >
        <div className="mb-3">
          <label className="form-label">Company</label>
          <input className="form-control" placeholder="Acme Inc." />
        </div>
        <div className="mb-3">
          <label className="form-label">Website</label>
          <input className="form-control" placeholder="https://acme.example" />
        </div>
        <div>
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="Tell us about your project..."
          />
        </div>
      </Card>

      <Card
        title="Vertical Layout with Icons"
        subtitle="Vertical form with input group icons"
      >
        <div className="mb-3">
          <label className="form-label">Username</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-person" />
            </span>
            <input className="form-control" placeholder="john.doe" />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope" />
            </span>
            <input className="form-control" placeholder="john@example.com" />
          </div>
        </div>
        <div>
          <label className="form-label">Phone</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-telephone" />
            </span>
            <input className="form-control" placeholder="(555) 123-4567" />
          </div>
        </div>
      </Card>

      <Card
        title="Horizontal Layout"
        subtitle="Different label widths for horizontal layout"
      >
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">First Name</label>
          <div className="col-sm-9">
            <input className="form-control" placeholder="John" />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Last Name</label>
          <div className="col-sm-9">
            <input className="form-control" placeholder="Doe" />
          </div>
        </div>
        <div className="row">
          <label className="col-sm-3 col-form-label">Department</label>
          <div className="col-sm-9">
            <select className="form-select">
              <option>Operations</option>
              <option>Marketing</option>
              <option>Engineering</option>
            </select>
          </div>
        </div>
      </Card>

      <Card
        title="Grid Form Layouts"
        subtitle="Form with multiple columns using Bootstrap grid"
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input type="tel" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="1234 Main St"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              Address 2 <span className="text-muted">(Optional)</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Apartment, studio, or floor"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">City</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">State</label>
            <select className="form-select">
              <option>Choose...</option>
              <option>California</option>
              <option>Texas</option>
              <option>New York</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Zip</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Check me out
              </label>
            </div>
          </div>
        </div>
      </Card>

      <Card
        title="Complex Grid Layouts"
        subtitle="Nested column arrangements for denser forms"
      >
        <div className="row g-3">
          <div className="col-md-8">
            <label className="form-label">Project Name</label>
            <input className="form-control" placeholder="Enterprise rollout" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Priority</label>
            <select className="form-select">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Budget</label>
            <input className="form-control" placeholder="$25,000" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Due Date</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Owner</label>
            <input className="form-control" placeholder="Team lead" />
          </div>
          <div className="col-12">
            <label className="form-label">Notes</label>
            <textarea
              className="form-control"
              rows={4}
              placeholder="Add supporting details..."
            />
          </div>
        </div>
      </Card>
    </>
  );
}

function ValidationUI() {
  const [submitted, setSubmitted] = useState(false);
  const [tooltipSubmitted, setTooltipSubmitted] = useState(false);
  const [liveSubmitted, setLiveSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    city: "",
    state: "",
    zip: "",
    password: "",
    confirmPassword: "",
    terms: false,
    newsletter: false,
    fileName: "",
  });

  const passwordStrong = form.password.length >= 8;
  const passwordsMatch =
    form.password.length > 0 && form.password === form.confirmPassword;
  const zipValid = /^\d{5}$/.test(form.zip);
  const nameValid =
    form.firstName.trim().length >= 2 && form.lastName.trim().length >= 2;
  const usernameValid = form.username.trim().length >= 4;
  const emailValid = form.email.includes("@") && form.email.includes(".");
  const liveValid =
    nameValid && usernameValid && emailValid && passwordsMatch && form.terms;
  const fileValid =
    form.fileName === "" ||
    form.fileName.endsWith(".pdf") ||
    form.fileName.endsWith(".png") ||
    form.fileName.endsWith(".jpg");
  const bootstrapValid = submitted && nameValid && emailValid && form.terms;
  const tooltipValid = tooltipSubmitted && nameValid && emailValid && zipValid;

  return (
    <>
      <Card
        title="Bootstrap Validation"
        subtitle="Default Bootstrap validation with needs-validation"
      >
        <form
          noValidate
          className="needs-validation"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                className={`form-control ${submitted ? (form.firstName.trim().length >= 2 ? "is-valid" : "is-invalid") : ""}`}
                value={form.firstName}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    firstName: event.target.value,
                  }))
                }
                required
              />
              <div className="invalid-feedback">Please enter a first name.</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                className={`form-control ${submitted ? (form.lastName.trim().length >= 2 ? "is-valid" : "is-invalid") : ""}`}
                value={form.lastName}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, lastName: event.target.value }))
                }
                required
              />
              <div className="invalid-feedback">Please enter a last name.</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                className={`form-control ${submitted ? (usernameValid ? "is-valid" : "is-invalid") : ""}`}
                value={form.username}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, username: event.target.value }))
                }
                required
              />
              <div className="invalid-feedback">
                Username must be at least 4 characters.
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                className={`form-control ${submitted ? (emailValid ? "is-valid" : "is-invalid") : ""}`}
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, email: event.target.value }))
                }
                required
              />
              <div className="invalid-feedback">
                Please enter a valid email address.
              </div>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  className={`form-check-input ${submitted && !form.terms ? "is-invalid" : ""}`}
                  type="checkbox"
                  id="termsValidation"
                  checked={form.terms}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      terms: event.target.checked,
                    }))
                  }
                  required
                />
                <label className="form-check-label" htmlFor="termsValidation">
                  Agree to terms and conditions
                </label>
                <div className="invalid-feedback">
                  You must agree before submitting.
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 d-flex align-items-center gap-3 flex-wrap">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            {bootstrapValid ? (
              <span className="text-success fw-semibold">
                Validation passed successfully.
              </span>
            ) : null}
          </div>
        </form>
      </Card>

      <Card
        title="Validation with Tooltips"
        subtitle="Validation messages displayed like tooltips"
      >
        <form
          noValidate
          className="row g-3 needs-validation-tooltip"
          onSubmit={(event) => {
            event.preventDefault();
            setTooltipSubmitted(true);
          }}
        >
          <div className="col-md-6 position-relative">
            <label className="form-label">City</label>
            <input
              className={`form-control ${tooltipSubmitted ? (form.city.trim().length >= 2 ? "is-valid" : "is-invalid") : ""}`}
              value={form.city}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, city: event.target.value }))
              }
              required
            />
            <div className="invalid-tooltip">City is required.</div>
            <div className="valid-tooltip">Looks good.</div>
          </div>
          <div className="col-md-3 position-relative">
            <label className="form-label">State</label>
            <select
              className={`form-select ${tooltipSubmitted ? (form.state ? "is-valid" : "is-invalid") : ""}`}
              value={form.state}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, state: event.target.value }))
              }
              required
            >
              <option value="">Choose...</option>
              <option>California</option>
              <option>Texas</option>
              <option>New York</option>
            </select>
            <div className="invalid-tooltip">Select a state.</div>
            <div className="valid-tooltip">Looks good.</div>
          </div>
          <div className="col-md-3 position-relative">
            <label className="form-label">Zip</label>
            <input
              className={`form-control ${tooltipSubmitted ? (zipValid ? "is-valid" : "is-invalid") : ""}`}
              value={form.zip}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, zip: event.target.value }))
              }
              required
            />
            <div className="invalid-tooltip">Enter a 5 digit zip code.</div>
            <div className="valid-tooltip">Looks good.</div>
          </div>
          <div className="col-12 d-flex align-items-center gap-3">
            <button type="submit" className="btn btn-outline-primary">
              Check tooltip validation
            </button>
            {tooltipValid ? (
              <span className="text-success fw-semibold">
                Tooltip validation passed.
              </span>
            ) : null}
          </div>
        </form>
      </Card>

      <Card
        title="Live Validation Form"
        subtitle="Real-time feedback as you type"
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              className={`form-control ${liveSubmitted ? (passwordStrong ? "is-valid" : "is-invalid") : ""}`}
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, password: event.target.value }))
              }
            />
            <div className="invalid-feedback">Use at least 8 characters.</div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Confirm Password</label>
            <input
              className={`form-control ${liveSubmitted ? (passwordsMatch ? "is-valid" : "is-invalid") : ""}`}
              type="password"
              value={form.confirmPassword}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  confirmPassword: event.target.value,
                }))
              }
            />
            <div className="invalid-feedback">Passwords must match.</div>
          </div>
          <div className="col-md-6">
            <label className="form-label">File Upload</label>
            <input
              className={`form-control ${liveSubmitted ? (fileValid ? "is-valid" : "is-invalid") : ""}`}
              type="file"
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  fileName: event.target.files?.[0]?.name || "",
                }))
              }
            />
            <div className="invalid-feedback">
              Allowed file types: PDF, PNG, JPG.
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-end">
            <div className="form-check mt-3">
              <input
                className={`form-check-input ${liveSubmitted && !form.newsletter ? "is-invalid" : ""}`}
                type="checkbox"
                id="newsletterOptIn"
                checked={form.newsletter}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    newsletter: event.target.checked,
                  }))
                }
              />
              <label className="form-check-label" htmlFor="newsletterOptIn">
                Subscribe to product updates
              </label>
              <div className="invalid-feedback">
                Select the opt-in checkbox.
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 d-flex align-items-center gap-3 flex-wrap">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => setLiveSubmitted(true)}
          >
            Validate live form
          </button>
          {liveSubmitted && liveValid ? (
            <span className="text-success fw-semibold">
              Live validation passed.
            </span>
          ) : null}
        </div>
      </Card>

      <Card title="File Validation" subtitle="File type and size feedback">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Image Upload</label>
            <input
              type="file"
              className="form-control"
              accept=".png,.jpg,.jpeg"
            />
            <small className="text-muted">
              Supported file types: PNG, JPG, JPEG.
            </small>
          </div>
          <div className="col-md-6">
            <label className="form-label">Document Upload</label>
            <input type="file" className="form-control" accept=".pdf" />
            <small className="text-muted">
              Max size example: 2 MB recommended.
            </small>
          </div>
        </div>
      </Card>
    </>
  );
}

function WizardUI() {
  const [step, setStep] = useState(1);
  const steps = ["Account", "Profile", "Address", "Finish"];

  return (
    <Card title="Horizontal Wizard" subtitle="Step-by-step workflow">
      <div className="wizard-steps mb-4 d-flex gap-3 flex-wrap">
        {steps.map((label, index) => {
          const value = index + 1;
          return (
            <div
              key={label}
              className={`wizard-step ${step === value ? "active" : ""} ${step > value ? "completed" : ""}`}
            >
              <div className="wizard-step-icon">
                <span className="wizard-step-number">{value}</span>
              </div>
              <div className="wizard-step-label">{label}</div>
            </div>
          );
        })}
      </div>
      <div className="border rounded p-3 mb-3">
        {step === 1 ? (
          <p className="mb-0">
            Create account credentials and security settings.
          </p>
        ) : null}
        {step === 2 ? (
          <p className="mb-0">Fill in personal profile and preferences.</p>
        ) : null}
        {step === 3 ? (
          <p className="mb-0">Add location, city, and zip information.</p>
        ) : null}
        {step === 4 ? (
          <p className="mb-0">Review all details before final submission.</p>
        ) : null}
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-outline-secondary"
          disabled={step === 1}
          onClick={() => setStep((value) => value - 1)}
        >
          Previous
        </button>
        {step < 4 ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setStep((value) => value + 1)}
          >
            Next Step
          </button>
        ) : (
          <button type="button" className="btn btn-success">
            Complete
          </button>
        )}
      </div>
    </Card>
  );
}

function EditorsUI() {
  return (
    <>
      <Card
        title="Classic Editor Block"
        subtitle="Quill/TinyMCE replacement placeholder"
      >
        <div className="border rounded p-3 mb-2 bg-light-subtle">
          <div className="d-flex gap-2 mb-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">
              B
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary">
              I
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary">
              U
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary">
              H1
            </button>
          </div>
          <textarea
            className="form-control"
            rows={6}
            defaultValue="Start writing your content here..."
          />
        </div>
      </Card>
      <Card title="Bubble Style Editor">
        <textarea
          className="form-control"
          rows={5}
          defaultValue="Highlight text to display inline formatting controls."
        />
      </Card>
    </>
  );
}

function PickersUI() {
  return (
    <>
      <Card title="Date and Time Inputs">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Time</label>
            <input type="time" className="form-control" />
          </div>
          <div className="col-md-4">
            <label className="form-label">Date and Time</label>
            <input type="datetime-local" className="form-control" />
          </div>
        </div>
      </Card>
      <Card title="Range and Constraints">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              min="2026-01-01"
              max="2026-12-31"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              min="2026-01-01"
              max="2026-12-31"
            />
          </div>
        </div>
      </Card>
    </>
  );
}

function SelectUI() {
  const [selectedTags, setSelectedTags] = useState([
    "React",
    "UI",
    "Bootstrap",
  ]);
  const [removedTags, setRemovedTags] = useState([
    "JavaScript",
    "Node.js",
    "React",
  ]);
  const [emailTags, setEmailTags] = useState([
    "john@example.com",
    "jane@example.com",
  ]);
  const [searchCountry, setSearchCountry] = useState("Canada");
  const [searchMulti, setSearchMulti] = useState(["Design", "Marketing"]);
  const [loadingSelection, setLoadingSelection] = useState("Ready");

  const tags = ["React", "UI", "Bootstrap", "Charts", "Forms", "Validation"];
  const countries = [
    "United States",
    "Canada",
    "Germany",
    "France",
    "Japan",
    "Brazil",
  ];
  const groupedOptions = [
    { label: "Frontend", items: ["React", "Vue", "Angular"] },
    { label: "Backend", items: ["Node.js", "Python", "Go"] },
    { label: "Cloud", items: ["AWS", "Azure", "GCP"] },
  ];

  return (
    <>
      <Card
        title="Basic Selects"
        subtitle="Single, preselected, disabled, and multi-select states"
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Country</label>
            <select
              className="form-select"
              value={searchCountry}
              onChange={(event) => setSearchCountry(event.target.value)}
            >
              {countries.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Preselected Plan</label>
            <select className="form-select" defaultValue="Pro">
              <option>Starter</option>
              <option>Pro</option>
              <option>Enterprise</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Disabled Select</label>
            <select className="form-select" disabled>
              <option>Disabled select</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Multiple Select</label>
            <select
              className="form-select"
              multiple
              value={searchMulti}
              onChange={(event) =>
                setSearchMulti(
                  Array.from(
                    event.target.selectedOptions,
                    (option) => option.value,
                  ),
                )
              }
            >
              {["Design", "Development", "Marketing", "Support", "Sales"].map(
                (item) => (
                  <option key={item}>{item}</option>
                ),
              )}
            </select>
          </div>
        </div>
      </Card>

      <Card
        title="Searchable Selects"
        subtitle="Searchable single and multi-select patterns"
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Search Countries</label>
            <select
              className="form-select"
              value={searchCountry}
              onChange={(event) => setSearchCountry(event.target.value)}
            >
              {countries.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Search & Multi-select</label>
            <select
              className="form-select"
              multiple
              value={searchMulti}
              onChange={(event) =>
                setSearchMulti(
                  Array.from(
                    event.target.selectedOptions,
                    (option) => option.value,
                  ),
                )
              }
            >
              {["Design", "Development", "Marketing", "Support", "Sales"].map(
                (item) => (
                  <option key={item}>{item}</option>
                ),
              )}
            </select>
          </div>
        </div>
      </Card>

      <Card
        title="Grouped Options"
        subtitle="Grouped and grouped multi-select patterns"
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Grouped Select</label>
            <select className="form-select">
              {groupedOptions.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.items.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Grouped Multi-select</label>
            <select className="form-select" multiple>
              {groupedOptions.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.items.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <Card title="Text Input Tags" subtitle="Add custom values as tags">
        <div className="d-flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <button
              type="button"
              key={tag}
              className={`btn btn-sm ${selectedTags.includes(tag) ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() =>
                setSelectedTags((prev) =>
                  prev.includes(tag)
                    ? prev.filter((item) => item !== tag)
                    : [...prev, tag],
                )
              }
            >
              {tag}
            </button>
          ))}
        </div>
        <small className="text-muted">
          Selected: {selectedTags.join(", ") || "None"}
        </small>
      </Card>

      <Card
        title="Removable and Email Tags"
        subtitle="Tag inputs with removable items and preset values"
      >
        <div className="mb-3">
          <label className="form-label">Removable Single</label>
          <div className="d-flex flex-wrap gap-2">
            {removedTags.map((tag) => (
              <span
                key={tag}
                className="badge text-bg-light d-inline-flex align-items-center gap-2 px-3 py-2"
              >
                {tag}
                <button
                  type="button"
                  className="btn btn-sm btn-link p-0 text-decoration-none"
                  onClick={() =>
                    setRemovedTags((prev) =>
                      prev.filter((item) => item !== tag),
                    )
                  }
                >
                  <i className="bi bi-x" />
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email Tags</label>
          <input
            className="form-control"
            value={emailTags.join(", ")}
            onChange={(event) =>
              setEmailTags(
                event.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              )
            }
            placeholder="Enter email addresses..."
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Custom Placeholder</label>
          <input
            className="form-control"
            placeholder="Choose your favorite fruit..."
          />
        </div>
        <div>
          <label className="form-label">Unique Tags Only</label>
          <input
            className="form-control"
            placeholder="Duplicates not allowed"
          />
        </div>
      </Card>

      <Card
        title="Selectable Limits and Sorting"
        subtitle="Length, max items, and sorted states"
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Max Items 3</label>
            <select className="form-select" multiple>
              {["React", "Vue", "Angular", "Svelte", "Solid"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Max Items 5</label>
            <select className="form-select" multiple>
              {["Apple", "Banana", "Orange", "Grape", "Mango", "Peach"].map(
                (item) => (
                  <option key={item}>{item}</option>
                ),
              )}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Sorted Alphabetically</label>
            <select className="form-select">
              {["Alpha", "Beta", "Gamma", "Omega"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">No Sort</label>
            <select className="form-select">
              {["Custom order A", "Custom order B", "Custom order C"].map(
                (item) => (
                  <option key={item}>{item}</option>
                ),
              )}
            </select>
          </div>
        </div>
      </Card>

      <Card
        title="Loading and Sized Selects"
        subtitle="Loading state and size variations"
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Loading Select</label>
            <select
              className="form-select"
              value={loadingSelection}
              onChange={(event) => setLoadingSelection(event.target.value)}
            >
              <option>Ready</option>
              <option>Loading...</option>
              <option>Cached</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Small Select</label>
            <select className="form-select form-select-sm">
              <option>Small select</option>
              <option>Option one</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Default Select</label>
            <select className="form-select">
              <option>Default select</option>
              <option>Option one</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Large Select</label>
            <select className="form-select form-select-lg">
              <option>Large select</option>
              <option>Option one</option>
            </select>
          </div>
        </div>
      </Card>
    </>
  );
}

function UploadUI() {
  const [files, setFiles] = useState([]);

  return (
    <>
      <Card title="Drop Zone">
        <label
          className="w-100 border border-2 border-dashed rounded p-4 text-center"
          style={{ cursor: "pointer" }}
        >
          <input
            type="file"
            className="d-none"
            multiple
            onChange={(event) => setFiles(Array.from(event.target.files || []))}
          />
          <i className="bi bi-cloud-arrow-up fs-3 d-block mb-2" />
          <strong>Click to upload</strong> or drag and drop files here
        </label>
      </Card>
      <Card title="Selected Files">
        {files.length === 0 ? (
          <p className="text-muted mb-0">No files selected yet.</p>
        ) : null}
        {files.length > 0 ? (
          <ul className="list-group">
            {files.map((file) => (
              <li
                key={`${file.name}-${file.size}`}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{file.name}</span>
                <span className="badge text-bg-light">
                  {Math.max(1, Math.round(file.size / 1024))} KB
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </Card>
    </>
  );
}

function FormsMenuPage() {
  const { formPage } = useParams();
  const page = formPages[formPage] || {
    title: "Forms",
    description: "Forms module",
  };

  const content = useMemo(() => {
    if (formPage === "elements") return <ElementsUI />;
    if (formPage === "layouts") return <LayoutsUI />;
    if (formPage === "validation") return <ValidationUI />;
    if (formPage === "wizard") return <WizardUI />;
    if (formPage === "editors") return <EditorsUI />;
    if (formPage === "pickers") return <PickersUI />;
    if (formPage === "select") return <SelectUI />;
    if (formPage === "upload") return <UploadUI />;

    return (
      <Card title="Forms">
        <p className="text-muted mb-0">
          Select a forms module from the sidebar.
        </p>
      </Card>
    );
  }, [formPage]);

  return (
    <div className={`main-content page-forms-${formPage || "module"}`}>
      <div className="page-header">
        <h1 className="page-title">{page.title}</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">Forms</span>
          <span className="breadcrumb-item active">{page.title}</span>
        </nav>
      </div>
      <p className="text-muted mb-4">{page.description}</p>
      {content}
    </div>
  );
}

export default FormsMenuPage;
