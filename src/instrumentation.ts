/**
 * Next.js boot hook — open MySQL before the first user request pays cold TLS cost.
 * DB warm lives in instrumentation-node.ts so Edge/webpack stays free of Prisma.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  try {
    const { warmDatabase } = await import("./instrumentation-node");
    await warmDatabase();
  } catch (error) {
    console.warn(
      "[instrumentation] db warm error:",
      error instanceof Error ? error.message : error
    );
  }
}
