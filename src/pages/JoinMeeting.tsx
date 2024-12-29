// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { onAuthStateChanged } from "firebase/auth";
// import { getDocs, query, where } from "firebase/firestore";
// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import useToast from "../hooks/useToast";
// import { firebaseAuth, meetingsRef } from "../utils/firebaseConfig";
// import { generateMeetingID } from "../utils/generateMeetingId";

// export default function JoinMeeting() {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [createToast] = useToast();
//   const [isAllowed, setIsAllowed] = useState(false);
//   const [user, setUser] = useState<any>(undefined);
//   const [userLoaded, setUserLoaded] = useState(false);

//   onAuthStateChanged(firebaseAuth, (currentUser) => {
//     if (currentUser) {
//       setUser(currentUser);
//     }
//     setUserLoaded(true);
//   });
//   useEffect(() => {
//     const getMeetingData = async () => {
//       if (params.id && userLoaded) {
//         const firestoreQuery = query(
//           meetingsRef,
//           where("meetingId", "==", params.id)
//         );
//         const fetchedMeetings = await getDocs(firestoreQuery);

//         if (fetchedMeetings.docs.length) {
//           const meeting = fetchedMeetings.docs[0].data();
//           const isCreator = meeting.createdBy === user?.uid;
//           if (meeting.meetingType === "1-on-1") {
//             if (meeting.invitedUsers[0] === user?.uid || isCreator) {
//               if (meeting.meetingDate === moment().format("L")) {
//                 setIsAllowed(true);
//               } else if (
//                 moment(meeting.meetingDate).isBefore(moment().format("L"))
//               ) {
//                 createToast({ title: "Meeting has ended.", type: "danger" });
//                 navigate(user ? "/" : "/login");
//               } else if (moment(meeting.meetingDate).isAfter()) {
//                 createToast({
//                   title: `Meeting is on ${meeting.meetingDate}`,
//                   type: "warning",
//                 });
//                 navigate(user ? "/" : "/login");
//               }
//             } else navigate(user ? "/" : "/login");
//           } else if (meeting.meetingType === "video-conference") {
//             const index = meeting.invitedUsers.findIndex(
//               (invitedUser: string) => invitedUser === user?.uid
//             );
//             if (index !== -1 || isCreator) {
//               if (meeting.meetingDate === moment().format("L")) {
//                 setIsAllowed(true);
//               } else if (
//                 moment(meeting.meetingDate).isBefore(moment().format("L"))
//               ) {
//                 createToast({ title: "Meeting has ended.", type: "danger" });
//                 navigate(user ? "/" : "/login");
//               } else if (moment(meeting.meetingDate).isAfter()) {
//                 createToast({
//                   title: `Meeting is on ${meeting.meetingDate}`,
//                   type: "warning",
//                 });
//               }
//             } else {
//               createToast({
//                 title: `You are not invited to the meeting.`,
//                 type: "danger",
//               });
//               navigate(user ? "/" : "/login");
//             }
//           } else {
//             setIsAllowed(true);
//           }
//         }
//       }
//     };
//     getMeetingData();
//   }, [params.id, user, userLoaded, createToast, navigate]);
//   const myMeeting = async (element: any) => {
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       parseInt(process.env.REACT_APP_ZEGOCLOUD_APP_ID!),
//       process.env.REACT_APP_ZEGOCLOUD_SERVER_SECRET as string,
//       params.id as string,
//       user?.uid ? user.uid : generateMeetingID(),
//       user?.displayName ? user.displayName : generateMeetingID()
//     );
//     const zp = ZegoUIKitPrebuilt.create(kitToken);

//     zp?.joinRoom({
//       container: element,
//       maxUsers: 50,
//       sharedLinks: [
//         {
//           name: "Personal link",
//           url: `${process.env.REACT_APP_HOST}/join/${params.id}`,
//         },
//       ],
//       scenario: {
//         mode: ZegoUIKitPrebuilt.VideoConference,
//       },
//     });
//   };

//   return isAllowed ? (
//     <div
//       style={{
//         display: "flex",
//         height: "100vh",
//         flexDirection: "column",
//       }}
//     >
//       <div
//         className="myCallContainer"
//         ref={myMeeting}
//         style={{ width: "100%", height: "100vh" }}
//       ></div>
//     </div>
//   ) : (
//     <></>
//   );
// }


// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { onAuthStateChanged } from "firebase/auth";
// import { getDocs, query, where } from "firebase/firestore";
// import moment from "moment";
// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import useToast from "../hooks/useToast";
// import { firebaseAuth, meetingsRef } from "../utils/firebaseConfig";
// import { generateMeetingID } from "../utils/generateMeetingId";
// // import Header from "../components/Header";
// import QuizPopup from "../components/QuizPopup"; // Import QuizPopup component

// export default function JoinMeeting() {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [createToast] = useToast();
//   const [isAllowed, setIsAllowed] = useState(false);
//   const [user, setUser] = useState<any>(undefined);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [isQuizOpen, setIsQuizOpen] = useState(false); // State to manage quiz popup
//   const meetingContainer = useRef(null);

//   const openQuiz = () => setIsQuizOpen(true); // Open Quiz popup
//   const closeQuiz = () => setIsQuizOpen(false); // Close Quiz popup

//   onAuthStateChanged(firebaseAuth, (currentUser) => {
//     if (currentUser) {
//       setUser(currentUser);
//     }
//     setUserLoaded(true);
//   });

//   useEffect(() => {
//     const getMeetingData = async () => {
//       if (params.id && userLoaded) {
//         const firestoreQuery = query(
//           meetingsRef,
//           where("meetingId", "==", params.id)
//         );
//         const fetchedMeetings = await getDocs(firestoreQuery);

//         if (fetchedMeetings.docs.length) {
//           const meeting = fetchedMeetings.docs[0].data();
//           const isCreator = meeting.createdBy === user?.uid;
//           if (meeting.meetingType === "1-on-1") {
//             if (meeting.invitedUsers[0] === user?.uid || isCreator) {
//               if (meeting.meetingDate === moment().format("L")) {
//                 setIsAllowed(true);
//               } else if (
//                 moment(meeting.meetingDate).isBefore(moment().format("L"))
//               ) {
//                 createToast({ title: "Meeting has ended.", type: "danger" });
//                 navigate(user ? "/" : "/login");
//               } else if (moment(meeting.meetingDate).isAfter()) {
//                 createToast({
//                   title: `Meeting is on ${meeting.meetingDate}`,
//                   type: "warning",
//                 });
//                 navigate(user ? "/" : "/login");
//               }
//             } else navigate(user ? "/" : "/login");
//           } else if (meeting.meetingType === "video-conference") {
//             const index = meeting.invitedUsers.findIndex(
//               (invitedUser: string) => invitedUser === user?.uid
//             );
//             if (index !== -1 || isCreator) {
//               if (meeting.meetingDate === moment().format("L")) {
//                 setIsAllowed(true);
//               } else if (
//                 moment(meeting.meetingDate).isBefore(moment().format("L"))
//               ) {
//                 createToast({ title: "Meeting has ended.", type: "danger" });
//                 navigate(user ? "/" : "/login");
//               } else if (moment(meeting.meetingDate).isAfter()) {
//                 createToast({
//                   title: `Meeting is on ${meeting.meetingDate}`,
//                   type: "warning",
//                 });
//               }
//             } else {
//               createToast({
//                 title: `You are not invited to the meeting.`,
//                 type: "danger",
//               });
//               navigate(user ? "/" : "/login");
//             }
//           } else {
//             setIsAllowed(true);
//           }
//         }
//       }
//     };
//     getMeetingData();
//   }, [params.id, user, userLoaded, createToast, navigate]);

//   const myMeeting = async (element: any) => {
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       parseInt(process.env.REACT_APP_ZEGOCLOUD_APP_ID!),
//       process.env.REACT_APP_ZEGOCLOUD_SERVER_SECRET!,
//       params.id as string,
//       user?.uid ? user.uid : generateMeetingID(),
//       user?.displayName ? user.displayName : generateMeetingID()
//     );

//     const zp = ZegoUIKitPrebuilt.create(kitToken);
//     zp?.joinRoom({
//       container: element,
//       maxUsers: 50,
//       sharedLinks: [
//         {
//           name: "Personal link",
//           url: `${process.env.REACT_APP_HOST}/join/${params.id}`,
//         },
//       ],
//       scenario: {
//         mode: ZegoUIKitPrebuilt.VideoConference,
//       },
//     });
//   };

//   return isAllowed ? (
//     <>
//       {/* <Header /> */}
//       <div
//         style={{
//           display: "flex",
//           height: "100vh",
//           flexDirection: "column",
//           position: "relative",
//         }}
//       >
//         {/* Video Meeting Container */}
//         <div
//           ref={myMeeting}
//           style={{
//             width: "100%",
//             height: "100vh",
//           }}
//         ></div>

//         {/* Custom Quiz Button */}
//         <button
//           onClick={openQuiz}
//           style={{
//             position: "absolute",
//             top: "10px",
//             right: "10px",
//             zIndex: 1000,
//             backgroundColor: "#0070f3",
//             color: "white",
//             padding: "10px 20px",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Quiz
//         </button>

//         {/* Quiz Popup */}
//         {isQuizOpen && <QuizPopup onClose={closeQuiz} />}
//       </div>
//     </>
//   ) : (
//     <></>
//   );
// }



// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { onAuthStateChanged } from "firebase/auth";
// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   onSnapshot,
// } from "firebase/firestore";
// import moment from "moment";
// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import useToast from "../hooks/useToast";
// import { firebaseAuth, meetingsRef, firebaseDB } from "../utils/firebaseConfig";
// import { generateMeetingID } from "../utils/generateMeetingId";
// // import Header from "../components/Header";
// import QuizPopup from "../components/QuizPopup";

// export default function JoinMeeting() {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [createToast] = useToast();
//   const [isAllowed, setIsAllowed] = useState(false);
//   const [user, setUser] = useState<any>(undefined);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [isQuizOpen, setIsQuizOpen] = useState(false); // For creating quiz (host only)
//   const [activeQuiz, setActiveQuiz] = useState<any>(null); // Holds active quiz data
//   const [quizShown, setQuizShown] = useState(false); // To prevent re-showing quiz on re-entry
//   const meetingContainer = useRef(null);

//   // Open and close quiz popup
//   const openQuiz = () => setIsQuizOpen(true);
//   const closeQuiz = () => setIsQuizOpen(false);

//   // Handle Authentication
//   useEffect(() => {
//     onAuthStateChanged(firebaseAuth, (currentUser) => {
//       if (currentUser) setUser(currentUser);
//       setUserLoaded(true);
//     });
//   }, []);

//   // Fetch Meeting Data and Validate Access
//   useEffect(() => {
//     const getMeetingData = async () => {
//       if (params.id && userLoaded) {
//         const firestoreQuery = query(
//           meetingsRef,
//           where("meetingId", "==", params.id)
//         );
//         const fetchedMeetings = await getDocs(firestoreQuery);

//         if (fetchedMeetings.docs.length) {
//           const meeting = fetchedMeetings.docs[0].data();
//           const isCreator = meeting.createdBy === user?.uid;

//           if (meeting.meetingType === "1-on-1") {
//             if (meeting.invitedUsers[0] === user?.uid || isCreator) {
//               validateMeetingDate(meeting);
//             } else navigate(user ? "/" : "/login");
//           } else if (meeting.meetingType === "video-conference") {
//             const index = meeting.invitedUsers.findIndex(
//               (invitedUser: string) => invitedUser === user?.uid
//             );
//             if (index !== -1 || isCreator) {
//               validateMeetingDate(meeting);
//             } else {
//               createToast({
//                 title: "You are not invited to the meeting.",
//                 type: "danger",
//               });
//               navigate(user ? "/" : "/login");
//             }
//           } else {
//             setIsAllowed(true);
//           }
//         }
//       }
//     };

//     const validateMeetingDate = (meeting: any) => {
//       if (meeting.meetingDate === moment().format("L")) {
//         setIsAllowed(true);
//       } else if (moment(meeting.meetingDate).isBefore(moment().format("L"))) {
//         createToast({ title: "Meeting has ended.", type: "danger" });
//         navigate(user ? "/" : "/login");
//       } else if (moment(meeting.meetingDate).isAfter()) {
//         createToast({
//           title: `Meeting is on ${meeting.meetingDate}`,
//           type: "warning",
//         });
//         navigate(user ? "/" : "/login");
//       }
//     };

//     getMeetingData();
//   }, [params.id, user, userLoaded, createToast, navigate]);

//   // Initialize Zego Meeting
//   const initializeMeeting = async (element: any) => {
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       parseInt(process.env.REACT_APP_ZEGOCLOUD_APP_ID!),
//       process.env.REACT_APP_ZEGOCLOUD_SERVER_SECRET!,
//       params.id as string,
//       user?.uid ? user.uid : generateMeetingID(),
//       user?.displayName ? user.displayName : generateMeetingID()
//     );

//     const zp = ZegoUIKitPrebuilt.create(kitToken);
//     zp?.joinRoom({
//       container: element,
//       maxUsers: 50,
//       sharedLinks: [
//         {
//           name: "Personal link",
//           url: `${process.env.REACT_APP_HOST}/join/${params.id}`,
//         },
//       ],
//       scenario: {
//         mode: ZegoUIKitPrebuilt.VideoConference,
//       },
//     });
//   };

//   // Listen for Active Quiz in Firestore
//   useEffect(() => {
//     const quizzesQuery = query(
//       collection(firebaseDB, "quizzes"),
//       where("meetingId", "==", params.id),
//       where("active", "==", true)
//     );

//     const unsubscribe = onSnapshot(quizzesQuery, (snapshot) => {
//       if (!snapshot.empty) {
//         const quizData = snapshot.docs[0].data();

//         // Show quiz only if it hasn't been shown before
//         if (!quizShown) {
//           setActiveQuiz(quizData);
//           setQuizShown(true);
//         }
//       } else {
//         setActiveQuiz(null); // Clear quiz when no active quiz exists
//         setQuizShown(false); // Reset for new quizzes
//       }
//     });

//     return () => unsubscribe();
//   }, [params.id, quizShown]);

//   return isAllowed ? (
//     <>
//       {/* Header */}
//       {/* <Header /> */}

//       {/* Main Container */}
//       <div
//         style={{
//           display: "flex",
//           height: "100vh",
//           flexDirection: "column",
//           position: "relative",
//         }}
//       >
//         {/* Video Meeting Container */}
//         <div
//           ref={initializeMeeting}
//           style={{
//             width: "100%",
//             height: "100vh",
//           }}
//         ></div>

//         {/* Show Quiz Button for Host */}
//         {user && activeQuiz === null && (
//           <button
//             onClick={openQuiz}
//             style={{
//               position: "absolute",
//               bottom: "20px",
//               right: "20px",
//               zIndex: 1000,
//               backgroundColor: "#0070f3",
//               color: "white",
//               padding: "10px 20px",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//               fontWeight: "bold",
//             }}
//           >
//             Quiz
//           </button>
//         )}

//         {/* Quiz Popup */}
//         {isQuizOpen && (
//           <QuizPopup
//             meetingId={params.id!}
//             userId={user?.uid}
//             onClose={closeQuiz}
//           />
//         )}

//         {/* Active Quiz for Participants */}
//         {activeQuiz && !isQuizOpen && (
//           <QuizPopup
//             meetingId={params.id!}
//             userId={user?.uid}
//             quizData={activeQuiz}
//             onClose={() => setActiveQuiz(null)}
//           />
//         )}
//       </div>
//     </>
//   ) : (
//     <></>
//   );
// }





import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../hooks/useToast";
import { firebaseAuth, meetingsRef, firebaseDB } from "../utils/firebaseConfig";
import { generateMeetingID } from "../utils/generateMeetingId";
// import Header from "../components/Header";
import QuizPopup from "../components/QuizPopup";

export default function JoinMeeting() {
  const params = useParams();
  const navigate = useNavigate();
  const [createToast] = useToast();
  const [isAllowed, setIsAllowed] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const meetingContainer = useRef(null);

  // Handle Authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      setUserLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Meeting Data and Validate Access
  useEffect(() => {
    const fetchMeetingData = async () => {
      if (params.id && userLoaded) {
        const firestoreQuery = query(meetingsRef, where("meetingId", "==", params.id));
        const fetchedMeetings = await getDocs(firestoreQuery);

        if (fetchedMeetings.docs.length) {
          const meeting = fetchedMeetings.docs[0].data();
          const isCreator = meeting.createdBy === user?.uid;

          if (meeting.meetingType === "video-conference" || meeting.meetingType === "1-on-1") {
            const isInvited = meeting.invitedUsers?.includes(user?.uid) || isCreator;

            if (isInvited) validateMeetingDate(meeting);
            else navigate(user ? "/" : "/login");
          } else {
            setIsAllowed(true);
          }
        }
      }
    };

    const validateMeetingDate = (meeting: any) => {
      if (meeting.meetingDate === moment().format("L")) {
        setIsAllowed(true);
      } else if (moment(meeting.meetingDate).isBefore(moment().format("L"))) {
        createToast({ title: "Meeting has ended.", type: "danger" });
        navigate("/");
      } else {
        createToast({ title: `Meeting is on ${meeting.meetingDate}`, type: "warning" });
        navigate("/");
      }
    };

    fetchMeetingData();
  }, [params.id, user, userLoaded, createToast, navigate]);

  // Initialize Zego Meeting
  const initializeMeeting = async (element: any) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      parseInt(process.env.REACT_APP_ZEGOCLOUD_APP_ID!),
      process.env.REACT_APP_ZEGOCLOUD_SERVER_SECRET!,
      params.id as string,
      user?.uid || generateMeetingID(),
      user?.displayName || "Guest"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp?.joinRoom({
      container: element,
      maxUsers: 50,
      sharedLinks: [
        {
          name: "Personal link",
          url: `${process.env.REACT_APP_HOST}/join/${params.id}`,
        },
      ],
      scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
    });
  };

  // Listen for Active Quiz
  useEffect(() => {
    const quizzesQuery = query(
      collection(firebaseDB, "quizzes"),
      where("meetingId", "==", params.id),
      where("active", "==", true)
    );

    const unsubscribe = onSnapshot(quizzesQuery, (snapshot) => {
      if (!snapshot.empty) {
        const quizData = snapshot.docs[0].data();
        if (quizData.createdBy !== user?.uid) {
          setActiveQuiz({ ...quizData, docId: snapshot.docs[0].id });
        }
      } else {
        setActiveQuiz(null);
      }
    });

    return () => unsubscribe();
  }, [params.id, user]);

  return isAllowed ? (
    <>
      {/* Header */}
      {/* <Header /> */}

      {/* Main Container */}
      <div style={{ display: "flex", height: "100vh", position: "relative" }}>
        {/* Video Meeting */}
        <div ref={initializeMeeting} style={{ width: "100%", height: "100vh" }}></div>

        {/* Quiz Button for Host */}
        {user && (
          <div style={{ position: "absolute", bottom: "10px", left: "10px", zIndex: 1000 }}>
            <button
              style={{
                backgroundColor: "#0070f3",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => setIsQuizOpen(true)}
            >
              Quiz
            </button>
          </div>
        )}

        {/* Show QuizPopup for Quiz Creator */}
        {isQuizOpen && (
          <QuizPopup
            meetingId={params.id!}
            userId={user?.uid}
            userName={user?.displayName || "Anonymous"}
            onClose={() => setIsQuizOpen(false)}
          />
        )}

        {/* Active Quiz for Participants */}
        {activeQuiz && (
          <QuizPopup
            meetingId={params.id!}
            userId={user?.uid}
            userName={user?.displayName || "Anonymous"}
            quizData={activeQuiz}
            onClose={() => setActiveQuiz(null)}
          />
        )}
      </div>
    </>
  ) : (
    <></>
  );
}
