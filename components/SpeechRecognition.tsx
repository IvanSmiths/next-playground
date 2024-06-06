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
            const utterance = new SpeechSynthesisUtterance('Hello, world!');
            window.speechSynthesis.speak(utterance);
        }

        recognition.onend = function (event: Event): void {
            console.error('Error in speech recognition: ', event);
        };

        recognition.onerror = function (event: SpeechRecognitionErrorEvent): void {
            console.error('Error in speech recognition: ', event);
            const utterance = new SpeechSynthesisUtterance('Error!');
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
        </>

    );
};

export default SpeechRecognitionComponent;
