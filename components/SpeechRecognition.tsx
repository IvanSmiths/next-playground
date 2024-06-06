"use client";

import {useState} from "react";

const SpeechRecognitionComponent = () => {
    const [text, setText] = useState<string>();

    function handleOnRecord(): void {
        const SpeechRecognition: {
            new(): SpeechRecognition,
            process?: any
        } = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition: SpeechRecognition = new SpeechRecognition();

        recognition.start();

        recognition.onresult = async function (event: SpeechRecognitionEvent): Promise<void> {
            const transcript: string = event.results[0][0].transcript;
            if (!transcript) {
                console.error("No transcript was found.");
            }
            console.log('transcript', transcript)
            setText(transcript);
            const utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(transcript);
            window.speechSynthesis.speak(utterance);
        }

        recognition.onend = function (event: Event): void {
            console.error('Error in speech recognition: ', event);
        };

        recognition.onerror = function (event: SpeechRecognitionErrorEvent): void {
            console.error('Error in speech recognition: ', event.error);
            const utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance('Error!');
            window.speechSynthesis.speak(utterance);
        };

        setTimeout((): void => {
            recognition.stop();
            console.log('stop');
        }, 5000);
    }

    return (
        <>
            <button onClick={handleOnRecord}>Record</button>
            {text}
            <h1 className={`${text === "test" ? "animate-pulse" : ""}`}>Hi</h1>
        </>
    );
};

export default SpeechRecognitionComponent;
