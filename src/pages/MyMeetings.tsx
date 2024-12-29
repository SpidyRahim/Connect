// import {
//   EuiBadge,
//   EuiBasicTable,
//   EuiButtonIcon,
//   EuiCopy,
//   EuiFlexGroup,
//   EuiFlexItem,
//   EuiPanel,
// } from "@elastic/eui";
// import { getDocs, query, where } from "firebase/firestore";
// import moment from "moment";
// import React, { useEffect, useState, useCallback } from "react";
// import { Link } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
// import EditFlyout from "../components/EditFlyout";
// import Header from "../components/Header";
// import useAuth from "../hooks/useAuth";
// import { meetingsRef } from "../utils/firebaseConfig";
// import { MeetingType } from "../utils/types";

// export default function MyMeetings() {
//   useAuth();
//   const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
//   const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
//   const [showEditFlyout, setShowEditFlyout] = useState(false);
//   const [editMeeting, setEditMeeting] = useState<MeetingType>();
//   const getMyMeetings = useCallback(async () => {
//     const firestoreQuery = query(
//       meetingsRef,
//       where("createdBy", "==", userInfo?.uid)
//     );
//     const fetchedMeetings = await getDocs(firestoreQuery);
//     if (fetchedMeetings.docs.length) {
//       const myMeetings: Array<MeetingType> = [];
//       fetchedMeetings.forEach((meeting) => {
//         myMeetings.push({
//           docId: meeting.id,
//           ...(meeting.data() as MeetingType),
//         });
//       });
//       setMeetings(myMeetings);
//     }
//   }, [userInfo?.uid]);
//   useEffect(() => {
//     if (userInfo) getMyMeetings();
//   }, [userInfo, getMyMeetings]);

//   const openEditFlyout = (meeting: MeetingType) => {
//     setShowEditFlyout(true);
//     setEditMeeting(meeting);
//   };

//   const closeEditFlyout = (dataChanged = false) => {
//     setShowEditFlyout(false);
//     setEditMeeting(undefined);
//     if (dataChanged) getMyMeetings();
//   };

//   const meetingColumns = [
//     {
//       field: "meetingName",
//       name: "Meeting Name",
//     },
//     {
//       field: "meetingType",
//       name: "Meeting Type",
//     },
//     {
//       field: "meetingDate",
//       name: "Meeting Date",
//     },
//     {
//       field: "",
//       name: "Status",
//       render: (meeting: MeetingType) => {
//         if (meeting.status) {
//           if (meeting.meetingDate === moment().format("L")) {
//             return (
//               <EuiBadge color="success">
//                 <Link
//                   to={`/join/${meeting.meetingId}`}
//                   style={{ color: "black" }}
//                 >
//                   Join Now
//                 </Link>
//               </EuiBadge>
//             );
//           } else if (
//             moment(meeting.meetingDate).isBefore(moment().format("L"))
//           ) {
//             return <EuiBadge color="default">Ended</EuiBadge>;
//           } else if (moment(meeting.meetingDate).isAfter()) {
//             return <EuiBadge color="primary">Upcoming</EuiBadge>;
//           }
//         } else return <EuiBadge color="danger">Cancelled</EuiBadge>;
//       },
//     },
//     {
//       field: "",
//       name: "Edit",
//       width: "5%",
//       render: (meeting: MeetingType) => {
//         return (
//           <EuiButtonIcon
//             aria-label="meeting-edit"
//             iconType="indexEdit"
//             color="danger"
//             display="base"
//             isDisabled={
//               moment(meeting.meetingDate).isBefore(moment().format("L")) ||
//               !meeting.status
//             }
//             onClick={() => openEditFlyout(meeting)}
//           />
//         );
//       },
//     },
//     {
//       field: "meetingId",
//       name: "Copy Link",
//       width: "5%",
//       render: (meetingId: string) => {
//         return (
//           <EuiCopy
//             textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}
//           >
//             {(copy: any) => (
//               <EuiButtonIcon
//                 iconType="copy"
//                 onClick={copy}
//                 display="base"
//                 aria-label="meeting-copy"
//               />
//             )}
//           </EuiCopy>
//         );
//       },
//     },
//   ];

//   return (
//     <div
//       style={{
//         display: "flex",
//         height: "100vh",
//         flexDirection: "column",
//       }}
//     >
//       <Header />
//       <EuiFlexGroup justifyContent="center" style={{ margin: "1rem" }}>
//         <EuiFlexItem>
//           <EuiPanel>
//             <EuiBasicTable items={meetings} columns={meetingColumns} />
//           </EuiPanel>
//         </EuiFlexItem>
//       </EuiFlexGroup>
//       {showEditFlyout && (
//         <EditFlyout closeFlyout={closeEditFlyout} meeting={editMeeting!} />
//       )}
//     </div>
//   );
// }



// import {
//   EuiBadge,
//   EuiBasicTable,
//   EuiButtonIcon,
//   EuiCopy,
//   EuiFlexGroup,
//   EuiFlexItem,
//   EuiPanel,
// } from "@elastic/eui";
// import { getDocs, query, where } from "firebase/firestore";
// import moment from "moment";
// import React, { useEffect, useState, useCallback } from "react";
// import { Link } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
// import EditFlyout from "../components/EditFlyout";
// import Header from "../components/Header";
// import useAuth from "../hooks/useAuth";
// import { meetingsRef } from "../utils/firebaseConfig";
// import { MeetingType } from "../utils/types";

// export default function MyMeetings() {
//   useAuth();
//   const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
//   const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
//   const [showEditFlyout, setShowEditFlyout] = useState(false);
//   const [editMeeting, setEditMeeting] = useState<MeetingType>();

//   // Fetch meetings from Firestore
//   const getMyMeetings = useCallback(async () => {
//     const firestoreQuery = query(
//       meetingsRef,
//       where("createdBy", "==", userInfo?.uid)
//     );
//     const fetchedMeetings = await getDocs(firestoreQuery);
//     if (fetchedMeetings.docs.length) {
//       const myMeetings: Array<MeetingType> = [];
//       fetchedMeetings.forEach((meeting) => {
//         myMeetings.push({
//           docId: meeting.id,
//           ...(meeting.data() as MeetingType),
//         });
//       });
//       setMeetings(myMeetings);
//     }
//   }, [userInfo?.uid]);

//   useEffect(() => {
//     if (userInfo) getMyMeetings();
//   }, [userInfo, getMyMeetings]);

//   const openEditFlyout = (meeting: MeetingType) => {
//     setShowEditFlyout(true);
//     setEditMeeting(meeting);
//   };

//   const closeEditFlyout = (dataChanged = false) => {
//     setShowEditFlyout(false);
//     setEditMeeting(undefined);
//     if (dataChanged) getMyMeetings();
//   };

//   // Table columns configuration
//   const meetingColumns = [
//     {
//       field: "meetingName",
//       name: "Meeting Name",
//     },
//     {
//       field: "meetingType",
//       name: "Meeting Type",
//     },
//     {
//       field: "meetingDate",
//       name: "Meeting Date",
//     },
//     {
//       field: "",
//       name: "Status",
//       render: (meeting: MeetingType) => {
//         if (meeting.status) {
//           if (meeting.meetingDate === moment().format("L")) {
//             return (
//               <EuiBadge color="success" style={{ textTransform: "uppercase" }}>
//                 <Link
//                   to={`/join/${meeting.meetingId}`}
//                   style={{ color: "black", fontWeight: 500 }}
//                 >
//                   Join Now
//                 </Link>
//               </EuiBadge>
//             );
//           } else if (
//             moment(meeting.meetingDate).isBefore(moment().format("L"))
//           ) {
//             return <EuiBadge color="default">Ended</EuiBadge>;
//           } else if (moment(meeting.meetingDate).isAfter()) {
//             return <EuiBadge color="primary">Upcoming</EuiBadge>;
//           }
//         } else return <EuiBadge color="danger">Cancelled</EuiBadge>;
//       },
//     },
//     {
//       field: "",
//       name: "Edit",
//       width: "5%",
//       render: (meeting: MeetingType) => {
//         return (
//           <EuiButtonIcon
//             aria-label="meeting-edit"
//             iconType="indexEdit"
//             color="danger"
//             display="base"
//             isDisabled={
//               moment(meeting.meetingDate).isBefore(moment().format("L")) ||
//               !meeting.status
//             }
//             onClick={() => openEditFlyout(meeting)}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//             style={{
//               transition: "transform 0.2s ease",
//             }}
//           />
//         );
//       },
//     },
//     {
//       field: "meetingId",
//       name: "Copy Link",
//       width: "5%",
//       render: (meetingId: string) => {
//         return (
//           <EuiCopy
//             textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}
//           >
//             {(copy: any) => (
//               <EuiButtonIcon
//                 iconType="copy"
//                 onClick={copy}
//                 display="base"
//                 aria-label="meeting-copy"
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}
//                 style={{
//                   transition: "transform 0.2s ease",
//                 }}
//               />
//             )}
//           </EuiCopy>
//         );
//       },
//     },
//   ];

//   // Mouse event handlers for hover effect
//   const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
//     e.currentTarget.style.transform = "scale(1.1)";
//   };

//   const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
//     e.currentTarget.style.transform = "scale(1)";
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         height: "100vh",
//         flexDirection: "column",
//         background: "linear-gradient(135deg, #2a3d5f, #1a1a1d)",
//         color: "#fff",
//         fontFamily: "Roboto, sans-serif",
//       }}
//     >
//       <Header />
//       <EuiFlexGroup justifyContent="center" style={{ margin: "1rem" }}>
//         <EuiFlexItem>
//           <EuiPanel
//             style={{
//               backgroundColor: "#2C2F3C",
//               borderRadius: "10px",
//               boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
//             }}
//           >
//             <EuiBasicTable items={meetings} columns={meetingColumns} />
//           </EuiPanel>
//         </EuiFlexItem>
//       </EuiFlexGroup>
//       {showEditFlyout && (
//         <EditFlyout closeFlyout={closeEditFlyout} meeting={editMeeting!} />
//       )}
//     </div>
//   );
// }

// import {
//   EuiBadge,
//   EuiBasicTable,
//   EuiButtonIcon,
//   EuiCopy,
//   EuiFlexGroup,
//   EuiFlexItem,
//   EuiPanel,
// } from "@elastic/eui";
// import { getDocs, query, where } from "firebase/firestore";
// import moment from "moment";
// import React, { useEffect, useState, useCallback } from "react";
// import { Link } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
// import EditFlyout from "../components/EditFlyout";
// import Header from "../components/Header";
// import useAuth from "../hooks/useAuth";
// import { meetingsRef } from "../utils/firebaseConfig";
// import { MeetingType } from "../utils/types";

// export default function MyMeetings() {
//   useAuth();
//   const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
//   const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
//   const [showEditFlyout, setShowEditFlyout] = useState(false);
//   const [editMeeting, setEditMeeting] = useState<MeetingType>();

//   // Fetch meetings from Firestore
//   const getMyMeetings = useCallback(async () => {
//     const firestoreQuery = query(
//       meetingsRef,
//       where("createdBy", "==", userInfo?.uid)
//     );
//     const fetchedMeetings = await getDocs(firestoreQuery);
//     if (fetchedMeetings.docs.length) {
//       const myMeetings: Array<MeetingType> = [];
//       fetchedMeetings.forEach((meeting) => {
//         myMeetings.push({
//           docId: meeting.id,
//           ...(meeting.data() as MeetingType),
//         });
//       });
//       setMeetings(myMeetings);
//     }
//   }, [userInfo?.uid]);

//   useEffect(() => {
//     if (userInfo) getMyMeetings();
//   }, [userInfo, getMyMeetings]);

//   const openEditFlyout = (meeting: MeetingType) => {
//     setShowEditFlyout(true);
//     setEditMeeting(meeting);
//   };

//   const closeEditFlyout = (dataChanged = false) => {
//     setShowEditFlyout(false);
//     setEditMeeting(undefined);
//     if (dataChanged) getMyMeetings();
//   };

//   // Table columns configuration
//   const meetingColumns = [
//     {
//       field: "meetingName",
//       name: "Meeting Name",
//       width: "20%",
//     },
//     {
//       field: "meetingType",
//       name: "Meeting Type",
//       width: "20%",
//     },
//     {
//       field: "meetingDate",
//       name: "Meeting Date",
//       width: "20%",
//     },
//     {
//       field: "",
//       name: "Status",
//       render: (meeting: MeetingType) => {
//         if (meeting.status) {
//           if (meeting.meetingDate === moment().format("L")) {
//             return (
//               <EuiBadge
//                 color="success"
//                 style={{
//                   borderRadius: "20px",
//                   textTransform: "uppercase",
//                   padding: "6px 12px",
//                 }}
//               >
//                 <Link
//                   to={`/join/${meeting.meetingId}`}
//                   style={{
//                     color: "black",
//                     fontWeight: 500,
//                     textDecoration: "none",
//                   }}
//                 >
//                   Join Now
//                 </Link>
//               </EuiBadge>
//             );
//           } else if (
//             moment(meeting.meetingDate).isBefore(moment().format("L"))
//           ) {
//             return <EuiBadge color="default">Ended</EuiBadge>;
//           } else if (moment(meeting.meetingDate).isAfter()) {
//             return <EuiBadge color="primary">Upcoming</EuiBadge>;
//           }
//         } else return <EuiBadge color="danger">Cancelled</EuiBadge>;
//       },
//     },
//     {
//       field: "",
//       name: "Edit",
//       width: "5%",
//       render: (meeting: MeetingType) => {
//         return (
//           <EuiButtonIcon
//             aria-label="meeting-edit"
//             iconType="indexEdit"
//             color="danger"
//             display="base"
//             isDisabled={
//               moment(meeting.meetingDate).isBefore(moment().format("L")) ||
//               !meeting.status
//             }
//             onClick={() => openEditFlyout(meeting)}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//             style={{
//               transition: "transform 0.2s ease",
//               borderRadius: "50%",
//             }}
//           />
//         );
//       },
//     },
//     {
//       field: "meetingId",
//       name: "Copy Link",
//       width: "5%",
//       render: (meetingId: string) => {
//         return (
//           <EuiCopy
//             textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}
//           >
//             {(copy: any) => (
//               <EuiButtonIcon
//                 iconType="copy"
//                 onClick={copy}
//                 display="base"
//                 aria-label="meeting-copy"
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}
//                 style={{
//                   transition: "transform 0.2s ease",
//                   borderRadius: "50%",
//                 }}
//               />
//             )}
//           </EuiCopy>
//         );
//       },
//     },
//   ];

//   // Mouse event handlers for hover effect
//   const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
//     e.currentTarget.style.transform = "scale(1.1)";
//   };

//   const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
//     e.currentTarget.style.transform = "scale(1)";
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         height: "100vh",
//         flexDirection: "column",
//         background: "linear-gradient(135deg, #2a3d5f, #1a1a1d)",
//         color: "#fff",
//         fontFamily: "Roboto, sans-serif",
//         borderRadius: "15px",
//       }}
//     >
//       <Header />
//       <EuiFlexGroup justifyContent="center" style={{ margin: "1rem" }}>
//         <EuiFlexItem>
//           <EuiPanel
//             style={{
//               backgroundColor: "#2C2F3C",
//               borderRadius: "10px",
//               boxShadow: "0 4px 25px rgba(0, 0, 0, 0.4)",
//               padding: "1rem",
//             }}
//           >
//             <EuiBasicTable
//               items={meetings}
//               columns={meetingColumns}
//               style={{
//                 borderRadius: "15px",
//                 overflow: "hidden",
//                 boxShadow: "0 2px 15px rgba(167, 224, 75, 0.2)",
//               }}
//               // Customizing table header
//               tableLayout="auto"
//               responsive={true}
//             />
//           </EuiPanel>
//         </EuiFlexItem>
//       </EuiFlexGroup>
//       {showEditFlyout && (
//         <EditFlyout closeFlyout={closeEditFlyout} meeting={editMeeting!} />
//       )}
//     </div>
//   );
// }


import {
  EuiBadge,
  EuiBasicTable,
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from "@elastic/eui";
import { getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import EditFlyout from "../components/EditFlyout";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import { meetingsRef } from "../utils/firebaseConfig";
import { MeetingType } from "../utils/types";

export default function MyMeetings() {
  useAuth();
  const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
  const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
  const [showEditFlyout, setShowEditFlyout] = useState(false);
  const [editMeeting, setEditMeeting] = useState<MeetingType>();

  // Fetch meetings from Firestore
  const getMyMeetings = useCallback(async () => {
    const firestoreQuery = query(
      meetingsRef,
      where("createdBy", "==", userInfo?.uid)
    );
    const fetchedMeetings = await getDocs(firestoreQuery);
    if (fetchedMeetings.docs.length) {
      const myMeetings: Array<MeetingType> = [];
      fetchedMeetings.forEach((meeting) => {
        myMeetings.push({
          docId: meeting.id,
          ...(meeting.data() as MeetingType),
        });
      });
      setMeetings(myMeetings);
    }
  }, [userInfo?.uid]);

  useEffect(() => {
    if (userInfo) getMyMeetings();
  }, [userInfo, getMyMeetings]);

  const openEditFlyout = (meeting: MeetingType) => {
    setShowEditFlyout(true);
    setEditMeeting(meeting);
  };

  const closeEditFlyout = (dataChanged = false) => {
    setShowEditFlyout(false);
    setEditMeeting(undefined);
    if (dataChanged) getMyMeetings();
  };

  // Table columns configuration
  const meetingColumns = [
    {
      field: "meetingName",
      name: "Meeting Name",
      width: "20%",
    },
    {
      field: "meetingType",
      name: "Meeting Type",
      width: "20%",
    },
    {
      field: "meetingDate",
      name: "Meeting Date",
      width: "20%",
      render: (meetingDate: string) => {
        // Format the date to "DD MMM YYYY" (e.g., "21 Dec 2024")
        return moment(meetingDate).format("DD-MMM, YYYY");
      },
    },
    {
      field: "",
      name: "Status",
      render: (meeting: MeetingType) => {
        if (meeting.status) {
          if (meeting.meetingDate === moment().format("L")) {
            return (
              <EuiBadge
                color="success"
                style={{
                  borderRadius: "20px",
                  textTransform: "uppercase",
                  padding: "6px 12px",
                }}
              >
                <Link
                  to={`/join/${meeting.meetingId}`}
                  style={{
                    color: "black",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  Join Now
                </Link>
              </EuiBadge>
            );
          } else if (
            moment(meeting.meetingDate).isBefore(moment().format("L"))
          ) {
            return <EuiBadge color="default">Ended</EuiBadge>;
          } else if (moment(meeting.meetingDate).isAfter()) {
            return <EuiBadge
              color="primary"
              style={{
                borderRadius: "20px",
                textTransform: "uppercase",
                padding: "6px 12px",
              }}
            >
              Upcoming
            </EuiBadge>;
          }
        } else return <EuiBadge
          color="danger"
          style={{
            borderRadius: "20px",
            textTransform: "uppercase",
            padding: "6px 12px",
          }}
        >
          Cancelled
        </EuiBadge>;
      },
    },
    {
      field: "",
      name: "Edit",
      width: "10%",
      render: (meeting: MeetingType) => {
        return (
          <EuiButtonIcon
            aria-label="meeting-edit"
            iconType="indexEdit"
            color="danger"
            display="base"
            isDisabled={
              moment(meeting.meetingDate).isBefore(moment().format("L")) ||
              !meeting.status
            }
            onClick={() => openEditFlyout(meeting)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transition: "transform 0.2s ease",
              borderRadius: "50%",
            }}
          />
        );
      },
    },
    {
      field: "meetingId",
      name: "Copy Link",
      width: "10%",
      render: (meetingId: string) => {
        return (
          <EuiCopy
            textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}
          >
            {(copy: any) => (
              <EuiButtonIcon
                iconType="copy"
                onClick={copy}
                display="base"
                aria-label="meeting-copy"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  transition: "transform 0.2s ease",
                  borderRadius: "50%",
                }}
              />
            )}
          </EuiCopy>
        );
      },
    },
  ];

  // Mouse event handlers for hover effect
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "scale(1.1)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        background: "linear-gradient(135deg, #2a3d5f, #1a1a1d)",
        color: "#fff",
        fontFamily: "Roboto, sans-serif",
        borderRadius: "15px",
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent="center" style={{ margin: "1rem" }}>
        <EuiFlexItem>
          <EuiPanel
            style={{
              backgroundColor: "#2C2F3C",
              borderRadius: "10px",
              boxShadow: "0 4px 25px rgba(0, 0, 0, 0.4)",
              padding: "1rem",
            }}
          >
            <EuiBasicTable
              items={meetings}
              columns={meetingColumns}
              style={{
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 2px 15px rgba(167, 224, 75, 0.2)",
              }}
              // Customizing table header
              tableLayout="auto"
              responsive={true}
            />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
      {showEditFlyout && (
        <EditFlyout closeFlyout={closeEditFlyout} meeting={editMeeting!} />
      )}
    </div>
  );
}
