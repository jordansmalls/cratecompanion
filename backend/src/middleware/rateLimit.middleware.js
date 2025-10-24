import rateLimit from "express-rate-limit";

// --- Rate Limiter for Login Attempts --- //

/**
 * Implements rate limiting for login attempts to mitigate brute-force attacks.
 * 5 attempts per 5 minutes.
 */

export const loginLimiter = rateLimit({
  // 5 mins
  windowMs: 5 * 60 * 1000,
  // each IP allowed 5 login requests per windowMS
  max: 5,
  message:
    "Too many login attempts from this IP address, please try again after 5 minutes.",
  // Return rate limit info in the `RateLimit-*` headers
  standardHeaders: true,
  // Disable the `X-RateLimit-*` headers
  legacyHeaders: false,
});

// --- Rate Limiter for Register Attempts --- //

/**
 * Implements rate limiting for signup/registration attempts.
 * 3 signups per 24 hours.
 */
export const registerLimiter = rateLimit({
  // 24 hours
  windowMs: 24 * 60 * 60 * 1000,
  // Limit each IP to 5 new account signups per windowMs
  max: 5,
  message:
    "Too many accounts created from this IP address, please try again after 24 hours.",
  // Return rate limit info in the `RateLimit-*` headers
  standardHeaders: true,
  // Disable the `X-RateLimit-*` headeris
  legacyHeaders: false,
});

// --- Rate Limiter for Account Update Attempts --- //

/**
 * Implements rate limiting for account update attempts to mitigate abuse.
 * 10 attempts per 5 minutes.
 */

export const accountUpdateLimiter = rateLimit({
  // 5 mins
  windowMs: 5 * 60 * 1000,
  // each IP allowed 5 login requests per windowMS
  max: 10,
  message:
    "Too many account update attempts from this IP address, please try again after 5 minutes.",
  // Return rate limit info in the `RateLimit-*` headers
  standardHeaders: true,
  // Disable the `X-RateLimit-*` headers
  legacyHeaders: false,
});
