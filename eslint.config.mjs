import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

// ESLint 9 requires flat config and Next 16 removed `next lint`, so the
// project lints with the `eslint` CLI against this file.
const config = [
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts", "*.tsbuildinfo"],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
];

export default config;
