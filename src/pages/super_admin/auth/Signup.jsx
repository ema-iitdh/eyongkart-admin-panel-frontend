import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { useSignup } from "../../../features/auth/hooks/useAuth";
import { z } from "zod";

const signupSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    ),
});

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { mutate: signup, isLoading, isError, error } = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    try {
      signupSchema.parse({ userName, email, password, phone });
      setValidationErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = {};
        for (const error of err.errors) {
          errors[error.path[0]] = error.message;
        }
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const isFormValid = () => {
    try {
      signupSchema.parse({ userName, email, password, phone });
      return true;
    } catch {
      return false;
    }
  };

  const shouldShowPasswordRequirements = () => {
    if (!password) return false;
    return !(
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  };
  const handleInputChange = (field, value, setter) => {
    setter(value);
    try {
      // Only validate the changing field
      const partialData = { [field]: value };
      signupSchema.pick({ [field]: true }).parse(partialData);
      // Clear error for this field if validation passes
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setValidationErrors((prev) => ({
          ...prev,
          [field]: err.errors[0].message,
        }));
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    signup({ userName, email, password, phone });
  };

  const errorMessage = error?.response?.data?.message || error?.message;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-400 flex items-center justify-center p-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-sm"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-4"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Create Account
          </h1>
          <p className="text-sm text-gray-600">Join us and start shopping</p>
        </motion.div>

        {isError && (
          <div className="mb-4 px-3 py-2 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="userName"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <motion.input
              id="userName"
              whileFocus={{ scale: 1.01 }}
              type="text"
              value={userName}
              onChange={(e) =>
                handleInputChange("userName", e.target.value, setUserName)
              }
              required
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 ease-in-out text-sm"
              placeholder="Enter your username"
            />
            {validationErrors.userName && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.userName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <motion.input
              id="email"
              whileFocus={{ scale: 1.01 }}
              type="email"
              value={email}
              onChange={(e) =>
                handleInputChange("email", e.target.value, setEmail)
              }
              required
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 ease-in-out text-sm"
              placeholder="Enter your email"
            />
            {validationErrors.email && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <motion.input
              id="phone"
              whileFocus={{ scale: 1.01 }}
              type="tel"
              value={phone}
              onChange={(e) =>
                handleInputChange("phone", e.target.value, setPhone)
              }
              required
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 ease-in-out text-sm"
              placeholder="Enter your phone number"
            />
            {validationErrors.phone && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.phone}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <motion.input
                id="password"
                whileFocus={{ scale: 1.01 }}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) =>
                  handleInputChange("password", e.target.value, setPassword)
                }
                required
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 ease-in-out text-sm"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <AnimatePresence>
              {shouldShowPasswordRequirements() && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 space-y-1 overflow-hidden"
                >
                  <p className="text-xs text-gray-600">
                    Password must contain:
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1 pl-4">
                    <motion.li
                      className="flex items-center gap-1"
                      animate={{ opacity: password.length >= 8 ? 0.5 : 1 }}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                          password.length >= 8 ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                      At least 8 characters
                    </motion.li>
                    <motion.li
                      className="flex items-center gap-1"
                      animate={{ opacity: /[A-Z]/.test(password) ? 0.5 : 1 }}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                          /[A-Z]/.test(password)
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      One uppercase letter
                    </motion.li>
                    <motion.li
                      className="flex items-center gap-1"
                      animate={{ opacity: /[a-z]/.test(password) ? 0.5 : 1 }}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                          /[a-z]/.test(password)
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      One lowercase letter
                    </motion.li>
                    <motion.li
                      className="flex items-center gap-1"
                      animate={{ opacity: /[0-9]/.test(password) ? 0.5 : 1 }}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                          /[0-9]/.test(password)
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      One number
                    </motion.li>
                    <motion.li
                      className="flex items-center gap-1"
                      animate={{
                        opacity: /[!@#$%^&*]/.test(password) ? 0.5 : 1,
                      }}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                          /[!@#$%^&*]/.test(password)
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      One special character (!@#$%^&*)
                    </motion.li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            {validationErrors.password && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.password}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="terms"
              className="cursor-pointer h-4 w-4"
              checked={agreeToTerms}
              onCheckedChange={setAgreeToTerms}
              required
            />
            <label htmlFor="terms" className="text-xs text-gray-600">
              I agree to the{" "}
              <Link
                to={ROUTES.TERMS_AND_CONDITIONS}
                className="text-purple-600 hover:text-purple-500"
              >
                Terms and Conditions
              </Link>
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || !agreeToTerms || !isFormValid()}
            className="w-full bg-black hover:bg-black/90 text-white py-2 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Creating Account...
              </div>
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600">
            Already have an account?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="text-purple-600 hover:text-purple-500 font-semibold transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
