export default () => {
  const rows = [
    ["MODEL", "READY", "96%"],
    ["SYSTEMS", "ONLINE", "84%"],
    ["STRATEGY", "MURKY", "67%"],
    ["ALIGNMENT", "HUMAN", "22%"],
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        padding: "42px 48px 36px",
        display: "flex",
        flexDirection: "column",
        background: "#0a0b0a",
        color: "#eae6db",
        fontFamily: "IBM Plex Mono",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 14,
          display: "flex",
          background: "#d62f24",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 18,
          borderBottom: "2px solid #5c5f58",
          color: "#f2c84b",
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: "0.05em",
        }}
      >
        <span>VANIELLE LEE / OPERATOR MODE</span>
        <span>FIELD NOTE 001</span>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 52,
        }}
      >
        <div
          style={{
            width: 730,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 66,
              fontWeight: 600,
              letterSpacing: "-0.065em",
              lineHeight: 0.98,
            }}
          >
            <span>THE MODEL IS RARELY</span>
            <span>THE BOTTLENECK.</span>
            <span style={{ marginTop: 12, color: "#e24738", fontSize: 48 }}>
              THE COMPANY IS.
            </span>
          </div>

          <div
            style={{
              marginTop: 30,
              display: "flex",
              color: "#b8b9b2",
              fontSize: 20,
              lineHeight: 1.4,
            }}
          >
            AI ENGINEER · ODECLOUD FOUNDER/CTO · AUTHOR
          </div>
        </div>

        <div
          style={{
            width: 320,
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
            border: "2px solid #686a63",
            background: "#11130f",
            boxShadow: "10px 10px 0 #f2c84b",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: 14,
              borderBottom: "1px solid #4e504a",
              color: "#72d5b6",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <span>COMPANY DIAGNOSTIC</span>
            <span>LIVE</span>
          </div>

          {rows.map(([label, status, score], index) => (
            <div
              style={{
                height: 58,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #343630",
                fontSize: 15,
              }}
            >
              <span style={{ color: "#676962" }}>0{index + 1}</span>
              <span style={{ width: 112 }}>{label}</span>
              <span style={{ color: index > 1 ? "#f2c84b" : "#72d5b6" }}>
                {status}
              </span>
              <span style={{ color: "#8d8f87" }}>{score}</span>
            </div>
          ))}

          <div
            style={{
              marginTop: 16,
              padding: "12px 14px",
              display: "flex",
              background: "#d62f24",
              color: "white",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            RUN THE ORGANIZATION →
          </div>
        </div>
      </div>

      <div
        style={{
          paddingTop: 16,
          display: "flex",
          justifyContent: "space-between",
          borderTop: "2px solid #5c5f58",
          color: "#9b9c94",
          fontSize: 16,
        }}
      >
        <span>10+ YEARS IN ENGINEERING / 8 YEARS AS CTO</span>
        <span style={{ color: "#f2c84b" }}>VANIELLE.IO ↗</span>
      </div>
    </div>
  );
};
