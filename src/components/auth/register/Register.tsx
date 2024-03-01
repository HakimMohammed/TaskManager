import { useState } from "react";
import { useAuth } from "../../../providers/authProvider/authProvider";

interface RegisterFormValues {
  email: string;
  password: string;
  repeatPassword: string;
}

export default function Register(): JSX.Element {
  const { signUp } = useAuth();
  const [formError, setFormError] = useState<string>("");
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<RegisterFormValues>({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const validateForm = () => {
    const { email, password, repeatPassword } = formValues;
    
    if (!email || !password || !repeatPassword) {
      setFormError("Please fill in all fields.");
      return false;
    }

    if (password.length < 6) {
      setFormError("Password should be at least 6 characters.");
      return false;
    }
  
    if (password.trim() !== repeatPassword.trim()) {
      setFormError("Passwords do not match.");
      return false;
    }
  
    return true;
  };
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {      
      return;
    }

    setFormSubmitting(true);
    signUp(formValues.email, formValues.password)
      .then(() => {
        // Naigate to Home
      })
      .catch((error) => {
        console.log(`🚀 ~ signup error`, error)
        setFormError(error.message);
      })
      .finally(() => {
        setFormSubmitting(false);
      });
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Create an Account
                        </h5>
                        <p className="text-center small">
                          Enter your personal details to create account
                        </p>
                      </div>

                      <form className={`row g-3 needs-validation ${formError !== '' ? '' : 'was-validated'}`}  noValidate onSubmit={handleSubmit}>
                        <div className="col-12">
                          <label htmlFor="yourEmail" className="form-label">
                            Your Email
                          </label>
                          <input
                            value={formValues.email}
                            type="email"
                            name="email"
                            className="form-control"
                            id="yourEmail"
                            required
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">
                            Password
                          </label>
                          <input
                            value={formValues.password}
                            type="password"
                            name="password"
                            className="form-control"
                            id="yourPassword"
                            required
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="col-12">
                          <label htmlFor="repeatPassword" className="form-label">
                            Confirm Password
                          </label>
                          <input
                          value={formValues.repeatPassword}
                            type="password"
                            name="repeatPassword"
                            className="form-control"
                            id="repeatPassword"
                            required
                            onChange={handleInputChange}
                          />
                          <div className="invalid-feedback">
                            {formError}
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                            disabled={formSubmitting}
                          >
                            {formSubmitting ? "Creating Account..." : "Create Account"}
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            Already have an account? <a>Log in</a>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
