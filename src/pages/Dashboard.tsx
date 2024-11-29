// import React from "react";
// import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
// import { useNavigate } from "react-router-dom";
// import dashboard1 from "../assets/dashboard1.png";
// import dashboard2 from "../assets/dashboard2.png";
// import dashboard3 from "../assets/dashboard3.png";
// import Header from "../components/Header";
// import useAuth from "../hooks/useAuth";

// function Dashboard() {
//   useAuth();
//   const navigate = useNavigate();

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           height: "100vh",
//           flexDirection: "column",
//         }}
//       >
//         <Header />
//         <EuiFlexGroup
//           justifyContent="center"
//           alignItems="center"
//           style={{ margin: "5vh 10vw" }}
//         >
//           <EuiFlexItem>
//             <EuiCard
//               icon={<EuiImage src={dashboard1} alt="icon" size="5rem" />}
//               title={`Create Meeting`}
//               description="Create a new meeting and invite people."
//               onClick={() => navigate("/create")}
//               paddingSize="xl"
//             />
//           </EuiFlexItem>
//           <EuiFlexItem>
//             <EuiCard
//               icon={<EuiImage src={dashboard2} alt="icon" size="100%" />}
//               title={`My Meetings`}
//               description="View your created meetings."
//               onClick={() => navigate("/mymeetings")}
//               paddingSize="xl"
//             />
//           </EuiFlexItem>
//           <EuiFlexItem>
//             <EuiCard
//               icon={<EuiImage src={dashboard3} alt="icon" size="5rem" />}
//               title={`Meetings`}
//               description="View the meetings that you are invited to."
//               onClick={() => navigate("/meetings")}
//               paddingSize="xl"
//             />
//           </EuiFlexItem>
//         </EuiFlexGroup>
//       </div>
//     </>
//   );
// }

// export default Dashboard;



// import React, { useState, useEffect } from "react";
// import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
// import { useNavigate } from "react-router-dom";
// import dashboard1 from "../assets/dashboard1.png";
// import dashboard2 from "../assets/dashboard2.png";
// import dashboard3 from "../assets/dashboard3.png";
// import Header from "../components/Header";
// import useAuth from "../hooks/useAuth";
// import bannerImage from "../assets/banner.png"; // Add your banner image here.

// function Dashboard() {
//   useAuth();
//   const navigate = useNavigate();

//   // State to manage current time and date
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000); // Update every second
//     return () => clearInterval(timer); // Cleanup the interval on component unmount
//   }, []);

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString(undefined, {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
//   };

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           height: "100vh",
//           flexDirection: "column",
//           overflow: "auto",
//         }}
//       >
//         <Header />
//         {/* Banner Section */}
//         <div
//           style={{
//             position: "relative",
//             width: "100%",
//             height: "30vh",
//             backgroundImage: `url(${bannerImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           {/* Overlay for better text readability */}
//           <div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               backgroundColor: "rgba(0, 0, 0, 0.4)", // Slightly dark overlay
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               flexDirection: "column",
//             }}
//           >
//             {/* Styled Date */}
//             <div
//               style={{
//                 fontSize: "2rem",
//                 fontWeight: "bold",
//                 color: "#fff",
//                 textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
//               }}
//             >
//               {formatDate(currentTime)}
//             </div>
//             {/* Styled Time */}
//             <div
//               style={{
//                 fontSize: "1.5rem",
//                 fontWeight: "500",
//                 color: "#f1c40f",
//                 marginTop: "0.5rem",
//                 textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
//               }}
//             >
//               {formatTime(currentTime)}
//             </div>
//           </div>
//         </div>

//         {/* Cards Section */}
//         <EuiFlexGroup
//           justifyContent="center"
//           alignItems="center"
//           style={{ margin: "5vh 10vw" }}
//         >
//           <EuiFlexItem>
//             <EuiCard
//               icon={<EuiImage src={dashboard1} alt="icon" size="5rem" />}
//               title={`Create Meeting`}
//               description="Create a new meeting and invite people."
//               onClick={() => navigate("/create")}
//               paddingSize="xl"
//             />
//           </EuiFlexItem>
//           <EuiFlexItem>
//             <EuiCard
//               icon={<EuiImage src={dashboard2} alt="icon" size="100%" />}
//               title={`My Meetings`}
//               description="View your created meetings."
//               onClick={() => navigate("/mymeetings")}
//               paddingSize="xl"
//             />
//           </EuiFlexItem>
//           <EuiFlexItem>
//             <EuiCard
//               icon={<EuiImage src={dashboard3} alt="icon" size="5rem" />}
//               title={`Meetings`}
//               description="View the meetings that you are invited to."
//               onClick={() => navigate("/meetings")}
//               paddingSize="xl"
//             />
//           </EuiFlexItem>
//         </EuiFlexGroup>
//       </div>
//     </>
//   );
// }

// export default Dashboard;




// import React, { useState, useEffect } from "react";
// import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
// import { useNavigate } from "react-router-dom";
// import dashboard1 from "../assets/dashboard1.png";
// import dashboard2 from "../assets/dashboard2.png";
// import dashboard3 from "../assets/dashboard3.png";
// import Header from "../components/Header";
// import useAuth from "../hooks/useAuth";
// import bannerImage from "../assets/banner.png"; // Add your banner image here.

// function Dashboard() {
//   useAuth();
//   const navigate = useNavigate();

//   // State to manage current time and date
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000); // Update every second
//     return () => clearInterval(timer); // Cleanup the interval on component unmount
//   }, []);

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString(undefined, {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
//   };

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           height: "100vh",
//           flexDirection: "column",
//           overflow: "auto",
//         }}
//       >
//         <Header />
//         {/* Banner Section */}
//         <div
//           style={{
//             position: "relative",
//             width: "80%",
//             height: "40vh",
//             backgroundImage: `url(${bannerImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             display: "flex",
//             alignItems: "flex-start",
//             justifyContent: "flex-start",
//             padding: "5px",
//             borderRadius: "30px"
//           }}
//         >
//           {/* Overlay for better text readability */}
//           <div
//             style={{
//               // backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay for readability
//               padding: "1.5rem 2rem",
//               borderRadius: "10px",
//             }}
//           >
//             {/* Time */}
//             <div
//               style={{
//                 fontSize: "4rem",
//                 fontWeight: "700",
//                 color: "#FFFFFF",
//                 lineHeight: "1.2",
//                 marginBottom: "0.5rem",
//                 textShadow: "4px 4px 8px rgba(0, 0, 0, 0.8)",
//               }}
//             >
//               {formatTime(currentTime)}
//             </div>
//             {/* Date */}
//             <div
//               style={{
//                 fontSize: "2rem",
//                 fontWeight: "500",
//                 color: "#fff",
//                 lineHeight: "1.5",
//                 textShadow: "3px 3px 6px rgba(0, 0, 0, 0.8)",
//               }}
//             >
//               {formatDate(currentTime)}
//             </div>
//           </div>
//         </div>

//         {/* Cards Section */}
//         <EuiFlexGroup
//           justifyContent="center"
//           alignItems="center"
//           style={{ margin: "5vh 10vw" }}
//         >
//           <EuiFlexItem>
//             <EuiCard
//               icon={<EuiImage src={dashboard1} alt="icon" size="5rem" />}
//               title={`Create Meeting`}
//               description="Create a new meeting and invite people."
//               onClick={() => navigate("/create")}
//               paddingSize="xl"
//             />
//           </EuiFlexItem>
//           <EuiFlexItem>
//             <EuiCard
//               icon={<EuiImage src={dashboard2} alt="icon" size="100%" />}
//               title={`My Meetings`}
//               description="View your created meetings."
//               onClick={() => navigate("/mymeetings")}
//               paddingSize="xl"
//             />
//           </EuiFlexItem>
//           <EuiFlexItem>
//             <EuiCard
//               icon={<EuiImage src={dashboard3} alt="icon" size="5rem" />}
//               title={`Meetings`}
//               description="View the meetings that you are invited to."
//               onClick={() => navigate("/meetings")}
//               paddingSize="xl"
//             />
//           </EuiFlexItem>
//         </EuiFlexGroup>
//       </div>
//     </>
//   );
// }

// export default Dashboard;



import React, { useState, useEffect } from "react";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
import { useNavigate } from "react-router-dom";
import dashboard1 from "../assets/dashboard1.png";
import dashboard2 from "../assets/dashboard2.png";
import dashboard3 from "../assets/dashboard3.png";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import bannerImage from "../assets/banner.png"; // Add your banner image here.

function Dashboard() {
  useAuth();
  const navigate = useNavigate();

  // State to manage current time and date
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second
    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <Header />
        {/* Container for Centering the Banner */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "10px", // Add padding from the top
            // marginBottom: "5vh", // Optional spacing for separation from cards
          }}
        >
          {/* Banner Section */}
          <div
            style={{
              position: "relative",
              width: "80%", // Banner width
              height: "35vh", // Banner height
              backgroundImage: `url(${bannerImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              padding: "20px",
              borderRadius: "30px",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Add a shadow for emphasis
            }}
          >
            {/* Overlay for better text readability */}
            <div>
              {/* Time */}
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif", // Apply Poppins font
                  fontSize: "4rem",
                  fontWeight: "700",
                  color: "#FFFFFF",
                  lineHeight: "1.2",
                  marginBottom: "0.5rem",
                  textShadow: "4px 4px 8px rgba(0, 0, 0, 0.8)",
                }}
              >
                {formatTime(currentTime)}
              </div>
              {/* Date */}
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif", // Apply Poppins font
                  fontSize: "2rem",
                  fontWeight: "500",
                  color: "#fff",
                  lineHeight: "1.5",
                  textShadow: "3px 3px 6px rgba(0, 0, 0, 0.8)",
                }}
              >
                {formatDate(currentTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          style={{ margin: "5vh 10vw" }}
        >
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage src={dashboard1} alt="icon" size="5rem" />}
              title={`Create Meeting`}
              description="Create a new meeting and invite people."
              onClick={() => navigate("/create")}
              paddingSize="xl"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage src={dashboard2} alt="icon" size="100%" />}
              title={`My Meetings`}
              description="View your created meetings."
              onClick={() => navigate("/mymeetings")}
              paddingSize="xl"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage src={dashboard3} alt="icon" size="5rem" />}
              title={`Meetings`}
              description="View the meetings that you are invited to."
              onClick={() => navigate("/meetings")}
              paddingSize="xl"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  );
}

export default Dashboard;
