function checkRequiredEnvs(envNames) {
  const missingEnvs = envNames.filter((env) => !process.env[env]);
  if (missingEnvs.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvs.join(", ")}`
    );
  }
}

module.exports = { checkRequiredEnvs };
