import AILoader from "./AILoader";

export default function PageLoader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#020817", // match your theme
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <AILoader size="lg" label="Loading dashboard…" />
    </div>
  );
}