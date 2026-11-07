/**
 * Node-only boot work. Kept in a separate file so Edge/webpack analysis
 * does not pull Prisma/mariadb into non-Node bundles.
 */
export async function warmDatabase() {
  const { pingDatabase } = await import("@/lib/db");
  const result = await pingDatabase();
  if (result.ok) {
    console.info(`[instrumentation] db warm ok ${result.ms}ms`);
  } else {
    console.warn(`[instrumentation] db warm failed ${result.ms}ms:`, result.error);
  }
}
