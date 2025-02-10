import { useState } from 'react';
const Form = () => {
    const [isStream, setIsStream] = useState(false);
    const [prompt, setPrompt] = useState('');

    const toggleChecked = () => setIsStream((prev) => !prev);
    const handleChange = (e) => setPrompt(e.target.value);
    const handleSubmit = async (e) => {
        try {
            // Prevent the form from submitting
            e.preventDefault();
            // const {
            //     prompt: { value: prompt },
            //     stream: { checked: isStream },
            //     submit,
            // } = form.elements;
            // If the prompt value is empty, alert the user
            if (!prompt) return alert('Please enter a prompt');
            // Clear the results container
            // resultsContainer.innerHTML = '';
            // Disable the submit button
            // submit.disabled = true;
            // submit.classList.add(
            //     'bg-gray-500',
            //     'hover:bg-gray-500',
            //     'cursor-not-allowed'
            // );
            // stream.disabled = true;
            // Request
            const response = await fetch(
                'http://localhost:5050/api/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        mode: 'development', // Set the mode to development to not send the request to Open AI for now
                        provider: 'open-ai',
                    },
                    body: JSON.stringify({
                        model: 'gpt-4o',
                        stream: isStream,
                        messages: [
                            {
                                role: 'system',
                                content: 'You are a software developer', // This is the system message, it will control the behavior of the chatbot
                            },
                            {
                                role: 'user',
                                content: prompt, // This is the user message, it will be the prompt for the chatbot
                            },
                        ],
                    }),
                }
            );
            if (!response.ok) {
                // If the response is not ok, throw an error by parsing the JSON response
                const { error } = await response.json();
                throw new Error(error);
            }
            // Conditionally process the response depending on the value of `isStream`
            if (isStream) {
                // Process stream response
                // Get the responses stream
                const reader = response.body.getReader();
                // Create a new TextDecoder
                const decoder = new TextDecoder('utf-8');
                // Variable to store the data result
                let dataResult = '';
                // Create a new paragraph element before the loop
                // const p = document.createElement('p');
                // resultsContainer.appendChild(p);
                // Variable to check if the stream is done
                let isDone = false;
                // While the stream is not closed, i.e. done is false
                while (!isDone) {
                    // Read the next chunk
                    const result = await reader.read();
                    // If the result is done, break out of the loop
                    if (result.done) {
                        isDone = true;
                        break;
                    }
                    // Decode the result
                    const chunk = decoder.decode(result.value, {
                        stream: true,
                    });
                    // Split lines by new line, you can get more than one line per chunk
                    const lines = chunk.split('\n');
                    // Loop through each line
                    lines.forEach((line) => {
                        // Check if the line starts with data:, that's how Open AI sends the data
                        if (line.startsWith('data:')) {
                            // Get the JSON string without the data: prefix
                            const jsonStr = line.replace('data:', '');
                            // Parse the JSON string
                            const data = JSON.parse(jsonStr);
                            // Get the content from the first choice
                            const content = data.choices[0]?.delta?.content;
                            // If there is content
                            if (content) {
                                dataResult += content;
                                console.log(dataResult);

                                // const md = marked.parse(dataResult);
                                // Add the content to the paragraph element;
                                // p.innerHTML = md;
                                // Prism.highlightAll();
                            }
                        }
                    });
                }
            } else {
                // Process response normally
                const dataResult = await response.json();
                console.log(dataResult);

                // Output the response to the results container
                // resultsContainer.innerHTML = `<p>${marked.parse(
                //     dataResult.message?.content
                // )}</p>`;
                // Prism.highlightAll();
            }
        } catch (error) {
            // If an error occurs, log it to the console
            console.error(error);
        } finally {
            // Enable the submit button
            // submit.disabled = false;
            // submit.classList.remove(
            //     'bg-gray-500',
            //     'hover:bg-gray-500',
            //     'cursor-not-allowed'
            // );
            // stream.disabled = false;
        }
    };
    return (
        <div className='h-1/3 w-full p-8 bg-slate-600 rounded-lg shadow-md'>
            <form onSubmit={handleSubmit}>
                <input
                    id='stream'
                    type='checkbox'
                    onChange={toggleChecked}
                    value={isStream}
                />
                <label htmlFor='stream'>Stream response?</label>
                <textarea
                    id='prompt'
                    rows='5'
                    placeholder='Ask me anything...'
                    className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    value={prompt}
                    onChange={handleChange}
                ></textarea>
                <button
                    id='submit'
                    type='submit'
                    className='mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                    Submit✨
                </button>
            </form>
        </div>
    );
};

export default Form;
