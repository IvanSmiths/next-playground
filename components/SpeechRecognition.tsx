"use client";

import {useState} from "react";

const SpeechRecognitionComponent = () => {
    const [text, setText] = useState<string>();

    function handleOnRecord() {
        // @ts-ignore
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.start(console.log('start'));
        recognition.onresult = async function (event) {
            const transcript = event.results[0][0].transcript;
            if (!transcript) {
                console.error("No transcript was found.");
            }
            console.log('transcript', transcript)
            setText(transcript);
            const utterance = new SpeechSynthesisUtterance('Hello, world!');
            window.speechSynthesis.speak(utterance);
        }
        recognition.end = function (event) {
            console.error('Error in speech recognition: ', event);
        };
        recognition.onerror = function (event) {
            console.error('Error in speech recognition: ', event);
            const utterance = new SpeechSynthesisUtterance('Error!');
            window.speechSynthesis.speak(utterance);
        };
    }

    return (
        <>
            <button onClick={handleOnRecord}>Record</button>
            {text}
        </>

    );
};

export default SpeechRecognitionComponent;
