import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";

import React from "react";
import { useNavigate } from "react-router-dom";
import meeting1 from "../assets/meeting1.png";
import meeting2 from "../assets/meeting2.png";

import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

export default function CreateMeeting() {
  useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          // display: "flex",
          // height: "100vh",
          // flexDirection: "column",
          overflow: "auto",
          background: "linear-gradient(135deg, #1e1e2f, #1a1a3f)", // Dark gradient background
        }}
      >
        <Header />
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          style={{ margin: "5vh 10vw" }}
        >
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage src={meeting1} alt="icon" size="100%" />}
              title={`Create 1 on 1 Meeting`}
              description="Create a personal single person meeting."
              onClick={() => navigate("/create1on1")}
              paddingSize="xl"
              style={{
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                borderRadius: "20px",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.07)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage src={meeting2} alt="icon" size="100%" />}
              title={`Create Video Conference`}
              description="Invite multiple persons to the meeting."
              onClick={() => navigate("/videoconference")}
              paddingSize="xl"
              style={{
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                borderRadius: "20px",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.07)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  );
}
