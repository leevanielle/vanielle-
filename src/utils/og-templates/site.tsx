export default () => {
  const agents = [
    { name: "MEET", color: "#f0c8bc", x: 785, y: 148 },
    { name: "BUILD", color: "#a9d8cb", x: 953, y: 184 },
    { name: "LEAD", color: "#e3bd74", x: 1012, y: 330 },
    { name: "BOOK", color: "#c7bce8", x: 910, y: 455 },
    { name: "NOTES", color: "#a8c9e8", x: 742, y: 438 },
    { name: "TALK", color: "#e9a4a0", x: 690, y: 278 },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 72% 50%, #254138 0%, #111b18 30%, #0b1110 66%)",
        color: "#f7f3eb",
        fontFamily: "IBM Plex Mono",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 36,
          right: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: 12, color: "#e3bd74" }}>+</span>
          <span style={{ fontSize: 18, fontWeight: 600 }}>Vanielle Lee</span>
        </div>
        <span
          style={{
            padding: "9px 13px",
            border: "1px solid rgba(255,255,255,.2)",
            borderRadius: 999,
            color: "#a9d8cb",
            fontSize: 10,
          }}
        >
          SIX AGENTS ARE AWAKE
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 135,
          left: 42,
          width: 560,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            color: "#e3bd74",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
          }}
        >
          AI ENGINEER · FOUNDER · CTO · AUTHOR
        </span>
        <span
          style={{
            marginTop: 22,
            fontSize: 47,
            fontWeight: 600,
            letterSpacing: "-0.055em",
            lineHeight: 1.14,
          }}
        >
          I make ambitious technology feel possible.
        </span>
        <span
          style={{
            width: 525,
            marginTop: 23,
            color: "rgba(247,243,235,.68)",
            fontSize: 15,
            lineHeight: 1.55,
          }}
        >
          Discover the systems, leadership, book, field notes, and human behind
          the work.
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 840,
          top: 250,
          width: 130,
          height: 130,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(169,216,203,.36)",
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 28%, #fff8e9, #d9e5dc 54%, #8fc5b7)",
          boxShadow: "0 0 80px rgba(169,216,203,.34)",
          color: "#18201d",
          fontSize: 22,
        }}
      >
        +
      </div>

      {agents.map(agent => (
        <div
          style={{
            position: "absolute",
            left: agent.x,
            top: agent.y,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 54,
              height: 54,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: agent.color,
              boxShadow: `0 0 34px ${agent.color}55`,
            }}
          >
            <span
              style={{
                width: 4,
                height: 6,
                marginRight: 7,
                borderRadius: "50%",
                background: "#17201d",
              }}
            />
            <span
              style={{
                width: 4,
                height: 6,
                borderRadius: "50%",
                background: "#17201d",
              }}
            />
          </div>
          <span style={{ marginTop: 7, color: "rgba(247,243,235,.72)", fontSize: 9 }}>
            {agent.name}
          </span>
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          right: 36,
          bottom: 30,
          padding: "11px 15px",
          display: "flex",
          borderRadius: 999,
          background: "#f7f3eb",
          color: "#17201d",
          fontSize: 11,
          fontWeight: 600,
        }}
      >
        COME MEET THE AGENTS →
      </div>
    </div>
  );
};
