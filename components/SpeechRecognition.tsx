"use client";

import {useState} from "react";

const SpeechRecognitionComponent = () => {
    const [text, setText] = useState<string>();

    function handleOnRecord() {
        // @ts-ignore
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.start();
        recognition.onresult = async function(event) {
            const transcript = event.results[0][0].transcript;
            console.log('transcript', transcript)
            setText(transcript);
        }
    }

    return (
        <>
        <button onClick={handleOnRecord}>Record</button>
            {text}
            </>

            );
};

export default SpeechRecognitionComponent;
