export default (lobbyImage: string) => {
  const rooms = ["LOBBY", "LAB", "BOARDROOM", "LIBRARY", "BALCONY", "SALON"];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        overflow: "hidden",
        background: "#101713",
        color: "#f8f3e9",
        fontFamily: "IBM Plex Mono",
      }}
    >
      <img
        src={lobbyImage}
        width="1200"
        height="630"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background:
            "linear-gradient(90deg, rgba(7,12,10,.94) 0%, rgba(7,12,10,.78) 47%, rgba(7,12,10,.12) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          padding: "36px 42px 32px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: 12, color: "#e4bd78" }}>✦</span>
            <span style={{ fontSize: 19, fontWeight: 600 }}>Vanielle Lee</span>
          </div>
          <span
            style={{
              padding: "10px 14px",
              border: "1px solid rgba(255,255,255,.28)",
              borderRadius: 999,
              background: "rgba(10,16,13,.68)",
              color: "#f6e8c9",
              fontSize: 11,
              letterSpacing: "0.06em",
            }}
          >
            SAIGON · AFTER RAIN
          </span>
        </div>

        <div
          style={{
            flex: 1,
            width: 680,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#e4bd78",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.09em",
            }}
          >
            WELCOME TO THE PENTHOUSE
          </span>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              fontSize: 48,
              fontWeight: 600,
              letterSpacing: "-0.055em",
              lineHeight: 1.11,
            }}
          >
            <span>Technology gets complicated.</span>
            <span style={{ marginTop: 8, color: "#ef8f7f", fontSize: 40 }}>
              I make it easier to lead.
            </span>
          </div>
          <div
            style={{
              width: 610,
              marginTop: 22,
              display: "flex",
              color: "rgba(248,243,233,.78)",
              fontSize: 16,
              lineHeight: 1.5,
            }}
          >
            Tour the lab, boardroom, library, balcony, and salon of an AI
            engineer, founder, CTO, and author.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            {rooms.map((room, index) => (
              <span
                style={{
                  marginRight: 7,
                  padding: "7px 9px",
                  border: "1px solid rgba(255,255,255,.2)",
                  borderRadius: 999,
                  background:
                    index === 0 ? "#c75d4e" : "rgba(10,16,13,.62)",
                  color: "#f8f3e9",
                  fontSize: 9,
                }}
              >
                {room}
              </span>
            ))}
          </div>
          <span
            style={{
              padding: "10px 14px",
              borderRadius: 999,
              background: "#f2e7d2",
              color: "#17231d",
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            SIGN THE GUESTBOOK →
          </span>
        </div>
      </div>
    </div>
  );
};
