/** Shared playground namespace — avoids circular ES module imports */
const PG = (globalThis.PG ||= {});
export default PG;
