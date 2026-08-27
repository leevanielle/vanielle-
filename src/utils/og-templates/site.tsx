export default () => {
  const agents = [
    { name: "MEET", color: "#cf2f21", x: 28, y: 88, n: "01" },
    { name: "BUILD", color: "#d4a33b", x: 170, y: 88, n: "02" },
    { name: "LEAD", color: "#191915", x: 312, y: 88, n: "03" },
    { name: "BOOK", color: "#ef746d", x: 312, y: 255, n: "04" },
    { name: "NOTES", color: "#716c61", x: 170, y: 255, n: "05" },
    { name: "TALK", color: "#9f2018", x: 28, y: 255, n: "06" },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        overflow: "hidden",
        background: "#f2eee4",
        color: "#191915",
        fontFamily: "IBM Plex Mono",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 72,
          padding: "0 38px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "2px solid #191915",
          background: "#f2eee4",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          <span>VANIELLE</span>
          <span style={{ margin: "0 10px", color: "#cf2f21" }}>■</span>
          <span>LEE</span>
        </div>
        <span
          style={{ color: "#716c61", fontSize: 10, letterSpacing: "0.08em" }}
        >
          AGENT FIELD SYSTEM / ONLINE
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 124,
          left: 42,
          width: 570,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            color: "#cf2f21",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          AI ENGINEER · FOUNDER · CTO · AUTHOR
        </span>
        <span
          style={{
            marginTop: 24,
            fontFamily: "serif",
            fontSize: 51,
            fontWeight: 400,
            letterSpacing: "-0.055em",
            lineHeight: 1.08,
          }}
        >
          I make ambitious technology feel possible.
        </span>
        <span
          style={{
            width: 520,
            marginTop: 22,
            color: "#5f5a50",
            fontSize: 15,
            lineHeight: 1.55,
          }}
        >
          Ten years turning hard technical bets into products, teams, and
          decisions people can trust.
        </span>
        <div
          style={{
            width: 235,
            marginTop: 29,
            padding: "13px 17px",
            display: "flex",
            justifyContent: "center",
            background: "#191915",
            boxShadow: "6px 6px 0 #cf2f21",
            color: "#f2eee4",
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          ENTER THE FIELD MANUAL →
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 112,
          right: 40,
          width: 480,
          height: 440,
          display: "flex",
          border: "2px solid #191915",
          background: "#fbf8ef",
          boxShadow: "10px 10px 0 #d4a33b",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 45,
            padding: "0 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#191915",
            color: "#f2eee4",
            fontSize: 10,
          }}
        >
          <span>FIELD ROUTE / 001</span>
          <span style={{ color: "#ef746d" }}>SCROLL TO MOVE</span>
        </div>

        <div
          style={{
            position: "absolute",
            top: 146,
            left: 65,
            width: 340,
            borderTop: "2px dashed #191915",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 313,
            left: 65,
            width: 340,
            borderTop: "2px dashed #191915",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 146,
            right: 73,
            height: 169,
            borderLeft: "2px dashed #191915",
          }}
        />

        {agents.map(agent => (
          <div
            style={{
              position: "absolute",
              left: agent.x + 39,
              top: agent.y,
              width: 74,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #191915",
                borderRadius: "50%",
                background: agent.color,
              }}
            >
              <span
                style={{
                  width: 4,
                  height: 6,
                  marginRight: 7,
                  borderRadius: "50%",
                  background: "#fbf8ef",
                }}
              />
              <span
                style={{
                  width: 4,
                  height: 6,
                  borderRadius: "50%",
                  background: "#fbf8ef",
                }}
              />
            </div>
            <span
              style={{
                marginTop: 8,
                color: "#191915",
                fontSize: 9,
                fontWeight: 700,
              }}
            >
              {agent.n} · {agent.name}
            </span>
          </div>
        ))}

        <div
          style={{
            position: "absolute",
            right: 14,
            bottom: 12,
            left: 14,
            display: "flex",
            justifyContent: "space-between",
            color: "#716c61",
            fontSize: 8,
            letterSpacing: "0.08em",
          }}
        >
          <span>HUMAN IN THE LOOP</span>
          <span>BUILD · LEAD · WRITE</span>
        </div>
      </div>
    </div>
  );
};
