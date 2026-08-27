export default () => {
  const rooms = [
    ["LOBBY", "WELCOME"],
    ["LAB", "BUILD"],
    ["BOARDROOM", "LEAD"],
    ["LIBRARY", "READ"],
    ["BALCONY", "THINK"],
    ["SALON", "TALK"],
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background:
          "linear-gradient(145deg, #2a3541 0%, #1d2630 60%, #151c23 100%)",
        color: "#25292c",
        fontFamily: "IBM Plex Mono",
      }}
    >
      <div
        style={{
          height: 66,
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid rgba(255,255,255,.28)",
          borderRadius: 18,
          background: "#f6f3ec",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: 12, color: "#b95347" }}>✦</span>
          <span style={{ fontSize: 18, fontWeight: 600 }}>Vanielle Lee</span>
        </div>
        <span
          style={{
            color: "#77736d",
            fontSize: 13,
            letterSpacing: "0.04em",
          }}
        >
          PRIVATE RESIDENCE · PENTHOUSE
        </span>
        <span
          style={{
            padding: "10px 14px",
            borderRadius: 999,
            background: "#25292c",
            color: "white",
            fontSize: 12,
          }}
        >
          SIGN THE GUESTBOOK
        </span>
      </div>

      <div
        style={{
          flex: 1,
          marginTop: 12,
          display: "flex",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 250,
            padding: 18,
            display: "flex",
            flexDirection: "column",
            borderRadius: 20,
            background: "#edf1ef",
          }}
        >
          <div
            style={{
              paddingBottom: 12,
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #cdd3d0",
              color: "#6f736f",
              fontSize: 12,
            }}
          >
            <span>FLOOR PLAN</span>
            <span style={{ color: "#b95347" }}>PH</span>
          </div>
          <div
            style={{
              flex: 1,
              marginTop: 12,
              display: "flex",
              flexWrap: "wrap",
              border: "2px solid #aeb7b4",
              background: "#aeb7b4",
              gap: 2,
            }}
          >
            {rooms.map(([room, action], index) => (
              <div
                style={{
                  width: index === 0 ? "100%" : "49.5%",
                  padding: "11px 10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  background: index === 0 ? "#25292c" : "#f8f8f5",
                  color: index === 0 ? "white" : "#25292c",
                }}
              >
                <span
                  style={{
                    color: index === 0 ? "#cfb985" : "#96928b",
                    fontSize: 9,
                  }}
                >
                  {action}
                </span>
                <span style={{ marginTop: 4, fontSize: 13, fontWeight: 600 }}>
                  {room}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            padding: "32px 38px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: 20,
            background: "#f6f3ec",
          }}
        >
          <span
            style={{
              color: "#b95347",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            WELCOME UPSTAIRS
          </span>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              fontSize: 47,
              fontWeight: 600,
              letterSpacing: "-0.055em",
              lineHeight: 1.12,
            }}
          >
            <span>Technology gets complicated.</span>
            <span style={{ marginTop: 9, color: "#b95347", fontSize: 38 }}>
              I make it easier to lead.
            </span>
          </div>
          <div
            style={{
              width: 590,
              marginTop: 24,
              display: "flex",
              color: "#666762",
              fontSize: 17,
              lineHeight: 1.5,
            }}
          >
            Explore a room-by-room tour through agentic AI, engineering
            leadership, writing, and founder life.
          </div>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              color: "#8a857e",
              fontSize: 13,
            }}
          >
            <span>10+ YEARS ENGINEERING</span>
            <span style={{ marginLeft: 28 }}>8 YEARS AS CTO</span>
            <span style={{ marginLeft: 28, color: "#b95347" }}>
              VANIELLE.IO ↗
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
