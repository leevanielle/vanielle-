export default () => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      padding: "46px 52px",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      background: "#f7f5f2",
      color: "#2b2926",
      fontFamily: "IBM Plex Mono",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -90,
        right: -10,
        width: 390,
        height: 390,
        display: "flex",
        borderRadius: "50%",
        background: "#efe5e2",
      }}
    />
    <div
      style={{
        position: "absolute",
        right: 180,
        bottom: -130,
        width: 270,
        height: 270,
        display: "flex",
        borderRadius: "50%",
        background: "#dfe8e3",
      }}
    />

    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 24,
        borderBottom: "1px solid #d8d3cb",
        fontSize: 17,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: 12, color: "#bd574c" }}>✦</span>
        <span style={{ fontWeight: 600 }}>Vanielle Lee</span>
      </div>
      <span style={{ color: "#77716a", fontSize: 14 }}>
        AI engineer · Founder · CTO · Author
      </span>
    </div>

    <div
      style={{
        position: "relative",
        flex: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 780,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 22,
            color: "#bd574c",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 19,
              height: 19,
              marginRight: 13,
              display: "flex",
              border: "1px solid #a98a55",
              borderRadius: "50%",
            }}
          />
          A quiet tour of the work
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 57,
            fontWeight: 600,
            letterSpacing: "-0.055em",
            lineHeight: 1.08,
          }}
        >
          <span>I make ambitious technology</span>
          <span style={{ color: "#bd574c" }}>
            feel clear, human, and possible.
          </span>
        </div>

        <div
          style={{
            width: 650,
            marginTop: 28,
            display: "flex",
            color: "#68625b",
            fontSize: 18,
            lineHeight: 1.5,
          }}
        >
          Agentic AI · product engineering · technical leadership · founder
          perspective
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 28,
          width: 210,
          height: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "24px 22px",
          border: "1px solid #d8d3cb",
          borderRadius: "110px 110px 22px 22px",
          background: "rgba(255, 254, 250, 0.84)",
          boxShadow: "0 20px 60px rgba(43, 41, 38, 0.10)",
        }}
      >
        <span
          style={{
            color: "#a98a55",
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Current view
        </span>
        <span
          style={{
            marginTop: 10,
            color: "#2b2926",
            fontSize: 17,
            lineHeight: 1.45,
          }}
        >
          Building useful technology—and the teams around it.
        </span>
      </div>
    </div>

    <div
      style={{
        position: "relative",
        paddingTop: 20,
        display: "flex",
        justifyContent: "space-between",
        borderTop: "1px solid #d8d3cb",
        color: "#77716a",
        fontSize: 14,
      }}
    >
      <span>10+ years in engineering · 8 years as CTO</span>
      <span style={{ color: "#bd574c", fontWeight: 600 }}>vanielle.io ↗</span>
    </div>
  </div>
);
