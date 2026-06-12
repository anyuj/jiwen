export const hashPassword = async (password: string) => {
  return Bun.password.hash(password, {
    algorithm: "argon2id",
    memoryCost: 19456,
    timeCost: 2,
  });
};

export const verifyPassword = async ({
  password,
  hash,
}: {
  password: string;
  hash: string;
}) => {
  try {
    return await Bun.password.verify(password, hash);
  } catch (error) {
    if (process.env.NODE_ENV !== "test") {
      const message = error instanceof Error ? error.message : String(error);
      console.warn("Password verification error.", { message });
    }
    return false;
  }
};
