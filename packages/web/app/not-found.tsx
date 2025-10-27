import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: 24,
        textAlign: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", margin: 0 }}>404</h1>
      <p style={{ fontSize: "1.125rem", margin: 0 }}>Page not found</p>
      <p style={{ color: "#666", maxWidth: 640 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <Link
          href="/"
          style={{
            padding: "8px 14px",
            background: "#111",
            color: "#fff",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          Go home
        </Link>
        <Link
          href="/contact"
          style={{
            padding: "8px 14px",
            borderRadius: 6,
            background: "transparent",
            border: "1px solid #ddd",
            textDecoration: "none",
          }}
        >
          Contact
        </Link>
      </div>
    </main>
  );
}
