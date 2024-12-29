// import React, { useEffect, useState } from "react";
// import {
//     EuiModal,
//     EuiModalHeader,
//     EuiModalHeaderTitle,
//     EuiModalBody,
//     EuiModalFooter,
//     EuiButton,
//     EuiFieldText,
//     EuiCheckboxGroup,
//     EuiSpacer,
//     EuiText,
// } from "@elastic/eui";

// interface QuizPopupProps {
//     onClose: () => void;
// }

// const QuizPopup: React.FC<QuizPopupProps> = ({ onClose }) => {
//     const [question, setQuestion] = useState(""); // The quiz question
//     const [options, setOptions] = useState<string[]>(["", ""]); // Options for the quiz
//     const [correctAnswers, setCorrectAnswers] = useState<string[]>([]); // Correct answers
//     const [timeLeft, setTimeLeft] = useState<number>(60); // Timer countdown
//     const [quizStarted, setQuizStarted] = useState(false); // Whether the quiz is running

//     const handleOptionChange = (index: number, value: string) => {
//         const newOptions = [...options];
//         newOptions[index] = value;
//         setOptions(newOptions);
//     };

//     const handleCheckboxChange = (option: string) => {
//         const updatedAnswers = correctAnswers.includes(option)
//             ? correctAnswers.filter((ans) => ans !== option)
//             : [...correctAnswers, option];
//         setCorrectAnswers(updatedAnswers);
//     };

//     const addOption = () => setOptions([...options, ""]); // Add new quiz option

//     const startQuiz = () => {
//         setQuizStarted(true);
//         setTimeLeft(60); // Reset the timer for 60 seconds
//     };

//     useEffect(() => {
//         if (quizStarted && timeLeft > 0) {
//             const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//             return () => clearInterval(timer);
//         } else if (timeLeft === 0) {
//             // End quiz when the timer runs out
//             setQuizStarted(false);
//             alert("Time is up! Displaying results...");
//         }
//     }, [quizStarted, timeLeft]);

//     return (
//         <EuiModal onClose={onClose} style={{ width: "500px" }}>
//             <EuiModalHeader>
//                 <EuiModalHeaderTitle>
//                     {quizStarted ? "Quiz in Progress" : "Create Quiz"}
//                 </EuiModalHeaderTitle>
//             </EuiModalHeader>
//             <EuiModalBody>
//                 {!quizStarted ? (
//                     <>
//                         <EuiFieldText
//                             placeholder="Enter your question here"
//                             value={question}
//                             onChange={(e) => setQuestion(e.target.value)}
//                         />
//                         <EuiSpacer size="m" />
//                         {options.map((option, index) => (
//                             <div key={index} style={{ marginBottom: "8px" }}>
//                                 <EuiFieldText
//                                     placeholder={`Option ${index + 1}`}
//                                     value={option}
//                                     onChange={(e) => handleOptionChange(index, e.target.value)}
//                                 />
//                             </div>
//                         ))}
//                         <EuiButton onClick={addOption} style={{ marginTop: "8px" }}>
//                             Add Option
//                         </EuiButton>
//                         <EuiSpacer size="m" />
//                         <EuiText>Select Correct Answer(s):</EuiText>
//                         <EuiSpacer size="s" />
//                         {options.map((option, index) => (
//                             <EuiCheckboxGroup
//                                 key={index}
//                                 options={[
//                                     { id: option, label: option },
//                                 ]}
//                                 idToSelectedMap={{
//                                     [option]: correctAnswers.includes(option),
//                                 }}
//                                 onChange={() => handleCheckboxChange(option)}
//                             />
//                         ))}
//                     </>
//                 ) : (
//                     <>
//                         <EuiText>
//                             <h4>{question}</h4>
//                         </EuiText>
//                         <EuiSpacer size="m" />
//                         {options.map((option, index) => (
//                             <EuiButton key={index} style={{ marginBottom: "8px" }}>
//                                 {option}
//                             </EuiButton>
//                         ))}
//                         <EuiSpacer size="m" />
//                         <EuiText>Time Left: {timeLeft}s</EuiText>
//                     </>
//                 )}
//             </EuiModalBody>
//             <EuiModalFooter>
//                 {!quizStarted ? (
//                     <EuiButton fill onClick={startQuiz}>
//                         Start Quiz
//                     </EuiButton>
//                 ) : (
//                     <EuiButton fill onClick={onClose}>
//                         Close Quiz
//                     </EuiButton>
//                 )}
//             </EuiModalFooter>
//         </EuiModal>
//     );
// };

// export default QuizPopup;



// import React, { useEffect, useState } from "react";
// import {
//     EuiModal,
//     EuiModalHeader,
//     EuiModalHeaderTitle,
//     EuiModalBody,
//     EuiModalFooter,
//     EuiButton,
//     EuiFieldText,
//     EuiCheckboxGroup,
//     EuiSpacer,
//     EuiText,
// } from "@elastic/eui";
// import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore";
// import { firebaseDB } from "../utils/firebaseConfig";

// interface QuizPopupProps {
//     meetingId: string;
//     userId: string;
//     onClose: () => void;
// }

// const QuizPopup: React.FC<QuizPopupProps> = ({ meetingId, userId, onClose }) => {
//     const [question, setQuestion] = useState("");
//     const [options, setOptions] = useState<string[]>(["", ""]);
//     const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
//     const [timeLeft, setTimeLeft] = useState<number>(60); // Timer countdown
//     const [quizStarted, setQuizStarted] = useState(false);

//     const handleOptionChange = (index: number, value: string) => {
//         const newOptions = [...options];
//         newOptions[index] = value;
//         setOptions(newOptions);
//     };

//     const handleCheckboxChange = (option: string) => {
//         const updatedAnswers = correctAnswers.includes(option)
//             ? correctAnswers.filter((ans) => ans !== option)
//             : [...correctAnswers, option];
//         setCorrectAnswers(updatedAnswers);
//     };

//     const addOption = () => setOptions([...options, ""]);

//     const startQuiz = async () => {
//         setQuizStarted(true);

//         // Publish the quiz to Firestore
//         const quizData = {
//             meetingId,
//             createdBy: userId,
//             question,
//             options,
//             correctAnswers,
//             createdAt: new Date(),
//             active: true, // Indicate that the quiz is currently active
//         };

//         await addDoc(collection(firebaseDB, "quizzes"), quizData);
//     };

//     useEffect(() => {
//         if (quizStarted && timeLeft > 0) {
//             const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//             return () => clearInterval(timer);
//         } else if (timeLeft === 0) {
//             setQuizStarted(false);
//             alert("Time is up! The quiz has ended.");
//         }
//     }, [quizStarted, timeLeft]);

//     return (
//         <EuiModal onClose={onClose} style={{ width: "500px" }}>
//             <EuiModalHeader>
//                 <EuiModalHeaderTitle>
//                     {quizStarted ? "Quiz in Progress" : "Create Quiz"}
//                 </EuiModalHeaderTitle>
//             </EuiModalHeader>
//             <EuiModalBody>
//                 {!quizStarted ? (
//                     <>
//                         <EuiFieldText
//                             placeholder="Enter your question here"
//                             value={question}
//                             onChange={(e) => setQuestion(e.target.value)}
//                         />
//                         <EuiSpacer size="m" />
//                         {options.map((option, index) => (
//                             <div key={index} style={{ marginBottom: "8px" }}>
//                                 <EuiFieldText
//                                     placeholder={`Option ${index + 1}`}
//                                     value={option}
//                                     onChange={(e) => handleOptionChange(index, e.target.value)}
//                                 />
//                             </div>
//                         ))}
//                         <EuiButton onClick={addOption} style={{ marginTop: "8px" }}>
//                             Add Option
//                         </EuiButton>
//                         <EuiSpacer size="m" />
//                         <EuiText>Select Correct Answer(s):</EuiText>
//                         <EuiSpacer size="s" />
//                         {options.map((option, index) => (
//                             <EuiCheckboxGroup
//                                 key={index}
//                                 options={[
//                                     { id: option, label: option },
//                                 ]}
//                                 idToSelectedMap={{
//                                     [option]: correctAnswers.includes(option),
//                                 }}
//                                 onChange={() => handleCheckboxChange(option)}
//                             />
//                         ))}
//                     </>
//                 ) : (
//                     <>
//                         <EuiText>
//                             <h4>{question}</h4>
//                         </EuiText>
//                         <EuiSpacer size="m" />
//                         {options.map((option, index) => (
//                             <EuiButton key={index} style={{ marginBottom: "8px" }}>
//                                 {option}
//                             </EuiButton>
//                         ))}
//                         <EuiSpacer size="m" />
//                         <EuiText>Time Left: {timeLeft}s</EuiText>
//                     </>
//                 )}
//             </EuiModalBody>
//             <EuiModalFooter>
//                 {!quizStarted ? (
//                     <EuiButton fill onClick={startQuiz}>
//                         Publish Quiz
//                     </EuiButton>
//                 ) : (
//                     <EuiButton fill onClick={onClose}>
//                         Close Quiz
//                     </EuiButton>
//                 )}
//             </EuiModalFooter>
//         </EuiModal>
//     );
// };

// export default QuizPopup;



// import React, { useEffect, useState } from "react";
// import {
//     EuiModal,
//     EuiModalHeader,
//     EuiModalHeaderTitle,
//     EuiModalBody,
//     EuiModalFooter,
//     EuiButton,
//     EuiFieldText,
//     EuiCheckboxGroup,
//     EuiSpacer,
//     EuiText,
// } from "@elastic/eui";
// import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
// import { firebaseDB } from "../utils/firebaseConfig";

// interface QuizPopupProps {
//     meetingId: string;
//     userId: string;
//     quizData?: any; // Quiz data for participants
//     onClose: () => void;
// }

// const QuizPopup: React.FC<QuizPopupProps> = ({
//     meetingId,
//     userId,
//     quizData,
//     onClose,
// }) => {
//     const [question, setQuestion] = useState("");
//     const [options, setOptions] = useState<string[]>(["", ""]);
//     const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
//     const [selectedOption, setSelectedOption] = useState<string | null>(null);
//     const [timeLeft, setTimeLeft] = useState<number>(60);
//     const [quizStarted, setQuizStarted] = useState(false);

//     // For the participants: Track remaining quiz time
//     useEffect(() => {
//         if (quizData) {
//             setQuestion(quizData.question);
//             setOptions(quizData.options);
//             setCorrectAnswers(quizData.correctAnswers);

//             const timer = setInterval(() => {
//                 setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//             }, 1000);

//             return () => clearInterval(timer);
//         }
//     }, [quizData]);

//     // Handle quiz creation for the host
//     const handleOptionChange = (index: number, value: string) => {
//         const newOptions = [...options];
//         newOptions[index] = value;
//         setOptions(newOptions);
//     };

//     const handleCheckboxChange = (option: string) => {
//         const updatedAnswers = correctAnswers.includes(option)
//             ? correctAnswers.filter((ans) => ans !== option)
//             : [...correctAnswers, option];
//         setCorrectAnswers(updatedAnswers);
//     };

//     const addOption = () => setOptions([...options, ""]);

//     const startQuiz = async () => {
//         setQuizStarted(true);

//         // Publish the quiz to Firestore
//         const quizData = {
//             meetingId,
//             createdBy: userId,
//             question,
//             options,
//             correctAnswers,
//             createdAt: new Date(),
//             active: true, // Quiz is now active
//         };

//         await addDoc(collection(firebaseDB, "quizzes"), quizData);
//         onClose(); // Close the popup
//     };

//     // Handle participant response
//     const submitResponse = async () => {
//         if (!quizData) return;

//         const quizRef = doc(firebaseDB, "quizzes", quizData.docId);
//         const userResponse = {
//             userId,
//             response: selectedOption,
//         };

//         // Update quiz responses (append user's response)
//         await updateDoc(quizRef, {
//             responses: quizData.responses
//                 ? [...quizData.responses, userResponse]
//                 : [userResponse],
//         });

//         onClose(); // Close the popup
//         alert("Your answer has been submitted!");
//     };

//     return (
//         <EuiModal onClose={onClose} style={{ width: "500px" }}>
//             <EuiModalHeader>
//                 <EuiModalHeaderTitle>
//                     {quizData ? "Answer Quiz" : "Create Quiz"}
//                 </EuiModalHeaderTitle>
//             </EuiModalHeader>
//             <EuiModalBody>
//                 {/* Participant View - Answer Quiz */}
//                 {quizData ? (
//                     <>
//                         <EuiText>
//                             <h4>{quizData.question}</h4>
//                         </EuiText>
//                         <EuiSpacer size="m" />
//                         {quizData.options.map((option: string, index: number) => (
//                             <EuiButton
//                                 key={index}
//                                 style={{ marginBottom: "8px", width: "100%" }}
//                                 // color={selectedOption === option ? "primary" : "default"}
//                                 onClick={() => setSelectedOption(option)}
//                             >
//                                 {option}
//                             </EuiButton>
//                         ))}
//                         <EuiSpacer size="m" />
//                         <EuiText>Time Left: {timeLeft}s</EuiText>
//                     </>
//                 ) : (
//                     <>
//                         {/* Host View - Create Quiz */}
//                         <EuiFieldText
//                             placeholder="Enter your question here"
//                             value={question}
//                             onChange={(e) => setQuestion(e.target.value)}
//                         />
//                         <EuiSpacer size="m" />
//                         {options.map((option, index) => (
//                             <div key={index} style={{ marginBottom: "8px" }}>
//                                 <EuiFieldText
//                                     placeholder={`Option ${index + 1}`}
//                                     value={option}
//                                     onChange={(e) => handleOptionChange(index, e.target.value)}
//                                 />
//                             </div>
//                         ))}
//                         <EuiButton onClick={addOption} style={{ marginTop: "8px" }}>
//                             Add Option
//                         </EuiButton>
//                         <EuiSpacer size="m" />
//                         <EuiText>Select Correct Answer(s):</EuiText>
//                         <EuiSpacer size="s" />
//                         {options.map((option, index) => (
//                             <EuiCheckboxGroup
//                                 key={index}
//                                 options={[{ id: option, label: option }]}
//                                 idToSelectedMap={{
//                                     [option]: correctAnswers.includes(option),
//                                 }}
//                                 onChange={() => handleCheckboxChange(option)}
//                             />
//                         ))}
//                     </>
//                 )}
//             </EuiModalBody>
//             <EuiModalFooter>
//                 {/* Show Submit Button for Participants */}
//                 {quizData ? (
//                     <EuiButton
//                         fill
//                         onClick={submitResponse}
//                         isDisabled={!selectedOption || timeLeft === 0}
//                     >
//                         Submit Answer
//                     </EuiButton>
//                 ) : (
//                     // Show Publish Button for Host
//                     <EuiButton fill onClick={startQuiz}>
//                         Publish Quiz
//                     </EuiButton>
//                 )}
//                 <EuiButton onClick={onClose} color="danger">
//                     Close
//                 </EuiButton>
//             </EuiModalFooter>
//         </EuiModal>
//     );
// };

// export default QuizPopup;




// import React, { useEffect, useState } from "react";
// import {
//     EuiModal,
//     EuiModalHeader,
//     EuiModalHeaderTitle,
//     EuiModalBody,
//     EuiModalFooter,
//     EuiButton,
//     EuiFieldText,
//     EuiCheckboxGroup,
//     EuiSpacer,
//     EuiText,
// } from "@elastic/eui";
// import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
// import { firebaseDB } from "../utils/firebaseConfig";

// interface QuizPopupProps {
//     meetingId: string;
//     userId: string;
//     quizData?: any; // Quiz data for participants
//     onClose: () => void;
// }

// const QuizPopup: React.FC<QuizPopupProps> = ({
//     meetingId,
//     userId,
//     quizData,
//     onClose,
// }) => {
//     const [question, setQuestion] = useState("");
//     const [options, setOptions] = useState<string[]>(["", ""]);
//     const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
//     const [selectedOption, setSelectedOption] = useState<string | null>(null);
//     const [timeLeft, setTimeLeft] = useState<number>(60);
//     const [quizStarted, setQuizStarted] = useState(false);
//     const [feedback, setFeedback] = useState<string | null>(null); // To store feedback message
//     const [submitted, setSubmitted] = useState(false); // Prevent multiple submissions

//     // For participants: Track remaining quiz time
//     useEffect(() => {
//         if (quizData) {
//             setQuestion(quizData.question);
//             setOptions(quizData.options);
//             setCorrectAnswers(quizData.correctAnswers);

//             const timer = setInterval(() => {
//                 setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//             }, 1000);

//             return () => clearInterval(timer);
//         }
//     }, [quizData]);

//     // Handle quiz creation for the host
//     const handleOptionChange = (index: number, value: string) => {
//         const newOptions = [...options];
//         newOptions[index] = value;
//         setOptions(newOptions);
//     };

//     const handleCheckboxChange = (option: string) => {
//         const updatedAnswers = correctAnswers.includes(option)
//             ? correctAnswers.filter((ans) => ans !== option)
//             : [...correctAnswers, option];
//         setCorrectAnswers(updatedAnswers);
//     };

//     const addOption = () => setOptions([...options, ""]);

//     const startQuiz = async () => {
//         setQuizStarted(true);

//         // Publish the quiz to Firestore
//         const quizData = {
//             meetingId,
//             createdBy: userId,
//             question,
//             options,
//             correctAnswers,
//             createdAt: new Date(),
//             active: true, // Quiz is now active
//         };

//         await addDoc(collection(firebaseDB, "quizzes"), quizData);
//         onClose(); // Close the popup
//     };

//     // Handle participant response
//     const submitResponse = async () => {
//         if (!quizData || submitted) return;

//         setSubmitted(true);
//         const quizRef = doc(firebaseDB, "quizzes", quizData.docId);
//         const userResponse = {
//             userId,
//             response: selectedOption,
//         };

//         // Update quiz responses (append user's response)
//         await updateDoc(quizRef, {
//             responses: quizData.responses
//                 ? [...quizData.responses, userResponse]
//                 : [userResponse],
//         });

//         // Show feedback
//         if (correctAnswers.includes(selectedOption!)) {
//             setFeedback("Your Answer is Correct!");
//         } else {
//             setFeedback(
//                 `Your Answer is Wrong! The correct answer is: ${correctAnswers.join(", ")}`
//             );
//         }
//     };

//     return (
//         <EuiModal onClose={onClose} style={{ width: "500px" }}>
//             <EuiModalHeader>
//                 <EuiModalHeaderTitle>
//                     {quizData ? "Answer Quiz" : "Create Quiz"}
//                 </EuiModalHeaderTitle>
//             </EuiModalHeader>
//             <EuiModalBody>
//                 {/* Participant View - Answer Quiz */}
//                 {quizData ? (
//                     <>
//                         <EuiText>
//                             <h4>{quizData.question}</h4>
//                         </EuiText>
//                         <EuiSpacer size="m" />
//                         {quizData.options.map((option: string, index: number) => (
//                             <EuiButton
//                                 key={index}
//                                 style={{
//                                     marginBottom: "8px",
//                                     width: "100%",
//                                     backgroundColor:
//                                         selectedOption === option ? "#0070f3" : "#f5f5f5",
//                                     color: selectedOption === option ? "white" : "black",
//                                     fontWeight: selectedOption === option ? "bold" : "normal",
//                                     border: "1px solid #ccc",
//                                 }}
//                                 onClick={() => setSelectedOption(option)}
//                                 isDisabled={submitted} // Disable after submission
//                             >
//                                 {option}
//                             </EuiButton>
//                         ))}
//                         <EuiSpacer size="m" />
//                         <EuiText>Time Left: {timeLeft}s</EuiText>
//                         {feedback && (
//                             <>
//                                 <EuiSpacer size="m" />
//                                 <EuiText color={feedback.includes("Correct") ? "success" : "danger"}>
//                                     {feedback}
//                                 </EuiText>
//                             </>
//                         )}
//                     </>
//                 ) : (
//                     <>
//                         {/* Host View - Create Quiz */}
//                         <EuiFieldText
//                             placeholder="Enter your question here"
//                             value={question}
//                             onChange={(e) => setQuestion(e.target.value)}
//                         />
//                         <EuiSpacer size="m" />
//                         {options.map((option, index) => (
//                             <div key={index} style={{ marginBottom: "8px" }}>
//                                 <EuiFieldText
//                                     placeholder={`Option ${index + 1}`}
//                                     value={option}
//                                     onChange={(e) => handleOptionChange(index, e.target.value)}
//                                 />
//                             </div>
//                         ))}
//                         <EuiButton onClick={addOption} style={{ marginTop: "8px" }}>
//                             Add Option
//                         </EuiButton>
//                         <EuiSpacer size="m" />
//                         <EuiText>Select Correct Answer(s):</EuiText>
//                         <EuiSpacer size="s" />
//                         {options.map((option, index) => (
//                             <EuiCheckboxGroup
//                                 key={index}
//                                 options={[{ id: option, label: option }]}
//                                 idToSelectedMap={{
//                                     [option]: correctAnswers.includes(option),
//                                 }}
//                                 onChange={() => handleCheckboxChange(option)}
//                             />
//                         ))}
//                     </>
//                 )}
//             </EuiModalBody>
//             <EuiModalFooter>
//                 {/* Show Submit Button for Participants */}
//                 {quizData ? (
//                     <EuiButton
//                         fill
//                         onClick={submitResponse}
//                         isDisabled={!selectedOption || submitted || timeLeft === 0}
//                     >
//                         Submit Answer
//                     </EuiButton>
//                 ) : (
//                     // Show Publish Button for Host
//                     <EuiButton fill onClick={startQuiz}>
//                         Publish Quiz
//                     </EuiButton>
//                 )}
//                 <EuiButton onClick={onClose} color="danger">
//                     Close
//                 </EuiButton>
//             </EuiModalFooter>
//         </EuiModal>
//     );
// };

// export default QuizPopup;



import React, { useEffect, useState } from "react";
import {
    EuiModal,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiModalBody,
    EuiModalFooter,
    EuiButton,
    EuiFieldText,
    EuiCheckboxGroup,
    EuiSpacer,
    EuiText,
    EuiPanel,
} from "@elastic/eui";
import {
    addDoc,
    collection,
    doc,
    updateDoc,
    onSnapshot,
} from "firebase/firestore";
import { firebaseDB } from "../utils/firebaseConfig";

interface QuizPopupProps {
    meetingId: string;
    userId: string;
    userName: string;
    quizData?: any; // Quiz data for participants
    onClose: () => void;
}

const QuizPopup: React.FC<QuizPopupProps> = ({
    meetingId,
    userId,
    userName,
    quizData,
    onClose,
}) => {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState<string[]>(["", ""]);
    const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(10);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [responses, setResponses] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (quizData) {
            setQuestion(quizData.question);
            setOptions(quizData.options);
            setCorrectAnswers(quizData.correctAnswers);

            // Start timer
            const timer = setInterval(() => {
                setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [quizData]);

    useEffect(() => {
        // Automatically show results when time is up
        if (timeLeft === 0) {
            fetchResponses();
            setShowResults(true);
        }
    }, [timeLeft]);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => setOptions([...options, ""]);

    const startQuiz = async () => {
        const quiz = {
            meetingId,
            createdBy: userId,
            question,
            options,
            correctAnswers,
            responses: [],
            active: true,
            createdAt: new Date(),
        };
        await addDoc(collection(firebaseDB, "quizzes"), quiz);
        onClose();
    };

    const submitResponse = async () => {
        if (!quizData || submitted) return;

        setSubmitted(true);
        const quizRef = doc(firebaseDB, "quizzes", quizData.docId);
        const userResponse = {
            userId,
            userName,
            response: selectedOption,
            isCorrect: correctAnswers.includes(selectedOption || ""),
        };

        await updateDoc(quizRef, {
            responses: quizData.responses
                ? [...quizData.responses, userResponse]
                : [userResponse],
        });

        setFeedback(
            userResponse.isCorrect
                ? "Your Answer is Correct!"
                : `Your Answer is Wrong! Correct Answer: ${correctAnswers.join(", ")}`
        );

        fetchResponses();
    };

    const fetchResponses = () => {
        const quizRef = doc(firebaseDB, "quizzes", quizData.docId);
        onSnapshot(quizRef, (snapshot) => {
            if (snapshot.exists()) {
                setResponses(snapshot.data().responses || []);
            }
        });
    };

    return (
        <EuiModal onClose={onClose} style={{ width: "500px" }}>
            <EuiModalHeader>
                <EuiModalHeaderTitle>
                    {quizData ? "Answer Quiz" : "Create Quiz"}
                </EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
                {/* Participant View */}
                {quizData ? (
                    <>
                        <EuiText>
                            <h4>{question}</h4>
                        </EuiText>
                        <EuiSpacer />
                        {options.map((option, index) => (
                            <EuiButton
                                key={index}
                                style={{
                                    marginBottom: "8px",
                                    width: "100%",
                                    backgroundColor:
                                        selectedOption === option ? "#0070f3" : "#f5f5f5",
                                    color: selectedOption === option ? "white" : "black",
                                }}
                                onClick={() => setSelectedOption(option)}
                                isDisabled={submitted || timeLeft === 0}
                            >
                                {option}
                            </EuiButton>
                        ))}
                        <EuiSpacer />
                        <EuiText>Time Left: {timeLeft}s</EuiText>
                        {feedback && (
                            <>
                                <EuiSpacer />
                                <EuiText color={feedback.includes("Correct") ? "success" : "danger"}>
                                    {feedback}
                                </EuiText>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {/* Host View */}
                        <EuiFieldText
                            placeholder="Enter question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <EuiSpacer />
                        {options.map((option, index) => (
                            <EuiFieldText
                                key={index}
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                        ))}
                        <EuiButton onClick={addOption}>Add Option</EuiButton>
                        <EuiSpacer />
                        <EuiText>Select Correct Answer:</EuiText>
                        {options.map((option) => (
                            <EuiCheckboxGroup
                                key={option}
                                options={[{ id: option, label: option }]}
                                idToSelectedMap={{ [option]: correctAnswers.includes(option) }}
                                onChange={() =>
                                    setCorrectAnswers((prev) =>
                                        prev.includes(option)
                                            ? prev.filter((ans) => ans !== option)
                                            : [...prev, option]
                                    )
                                }
                            />
                        ))}
                    </>
                )}

                {/* Results Section */}
                {showResults && (
                    <>
                        <EuiSpacer />
                        <EuiText>
                            <h4>Quiz Results:</h4>
                        </EuiText>
                        {responses.map((resp, idx) => (
                            <EuiPanel key={idx} style={{ marginBottom: "8px" }}>
                                <EuiText>
                                    {resp.userName} - {resp.response} -{" "}
                                    {resp.isCorrect ? "Correct" : "Wrong"}
                                </EuiText>
                            </EuiPanel>
                        ))}
                    </>
                )}
            </EuiModalBody>

            <EuiModalFooter>
                {quizData ? (
                    <EuiButton
                        fill
                        onClick={submitResponse}
                        isDisabled={!selectedOption || submitted || timeLeft === 0}
                    >
                        Submit Answer
                    </EuiButton>
                ) : (
                    <EuiButton fill onClick={startQuiz}>
                        Publish Quiz
                    </EuiButton>
                )}
                <EuiButton onClick={onClose} color="danger">
                    Close
                </EuiButton>
            </EuiModalFooter>
        </EuiModal>
    );
};

export default QuizPopup;
