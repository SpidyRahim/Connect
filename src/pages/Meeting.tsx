// import {
//   EuiBadge,
//   EuiBasicTable,
//   EuiButtonIcon,
//   EuiCopy,
//   EuiFlexGroup,
//   EuiFlexItem,
//   EuiPanel,
// } from "@elastic/eui";

// import { getDocs, query } from "firebase/firestore";
// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";
// import Header from "../components/Header";
// import useAuth from "../hooks/useAuth";

// import { meetingsRef } from "../utils/firebaseConfig";
// import { MeetingType } from "../utils/types";

// export default function Meeting() {
//   useAuth();
//   const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
//   const [meetings, setMeetings] = useState<Array<MeetingType>>([]);

//   useEffect(() => {
//     const getMyMeetings = async () => {
//       const firestoreQuery = query(meetingsRef);
//       const fetchedMeetings = await getDocs(firestoreQuery);
//       if (fetchedMeetings.docs.length) {
//         const myMeetings: Array<MeetingType> = [];
//         fetchedMeetings.forEach((meeting) => {
//           const data = meeting.data() as MeetingType;
//           if (data.createdBy === userInfo?.uid)
//             myMeetings.push(meeting.data() as MeetingType);
//           else if (data.meetingType === "anyone-can-join")
//             myMeetings.push(meeting.data() as MeetingType);
//           else {
//             const index = data.invitedUsers.findIndex(
//               (user: string) => user === userInfo?.uid
//             );
//             if (index !== -1) {
//               myMeetings.push(meeting.data() as MeetingType);
//             }
//           }
//         });

//         setMeetings(myMeetings);
//       }
//     };
//     if (userInfo) getMyMeetings();
//   }, [userInfo]);

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
//       field: "meetingId",
//       name: "Copy Link",
//       width: "10%",
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
import { getDocs, query } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import { meetingsRef } from "../utils/firebaseConfig";
import { MeetingType } from "../utils/types";

export default function Meeting() {
  useAuth();
  const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
  const [meetings, setMeetings] = useState<Array<MeetingType>>([]);

  useEffect(() => {
    const getMyMeetings = async () => {
      const firestoreQuery = query(meetingsRef);
      const fetchedMeetings = await getDocs(firestoreQuery);
      if (fetchedMeetings.docs.length) {
        const myMeetings: Array<MeetingType> = [];
        fetchedMeetings.forEach((meeting) => {
          const data = meeting.data() as MeetingType;
          if (data.createdBy === userInfo?.uid)
            myMeetings.push(meeting.data() as MeetingType);
          else if (data.meetingType === "anyone-can-join")
            myMeetings.push(meeting.data() as MeetingType);
          else {
            const index = data.invitedUsers.findIndex(
              (user: string) => user === userInfo?.uid
            );
            if (index !== -1) {
              myMeetings.push(meeting.data() as MeetingType);
            }
          }
        });

        setMeetings(myMeetings);
      }
    };
    if (userInfo) getMyMeetings();
  }, [userInfo]);

  // Table columns configuration
  const meetingColumns = [
    {
      field: "meetingName",
      name: "Meeting Name",
    },
    {
      field: "meetingType",
      name: "Meeting Type",
    },
    {
      field: "meetingDate",
      name: "Meeting Date",
      render: (meetingDate: string) => {
        // Format the date to "DD-MMM, YYYY" (e.g., "21 Dec, 2024")
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
            return <EuiBadge
              color="warning"
              style={{
                borderRadius: "20px",
                textTransform: "uppercase",
                padding: "6px 12px",
              }}
            >
              Ended
            </EuiBadge>;
          } else if (moment(meeting.meetingDate).isAfter()) {
            return (
              <EuiBadge
                color="primary"
                style={{
                  borderRadius: "20px",
                  textTransform: "uppercase",
                  padding: "6px 12px",
                }}
              >
                Upcoming
              </EuiBadge>
            );
          }
        } else {
          return (
            <EuiBadge
              color="danger"
              style={{
                borderRadius: "20px",
                textTransform: "uppercase",
                padding: "6px 12px",
              }}
            >
              Cancelled
            </EuiBadge>
          );
        }
      },
    },
    {
      field: "meetingId",
      name: "Copy Link",
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
              tableLayout="auto"
              responsive={true}
            />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
}
