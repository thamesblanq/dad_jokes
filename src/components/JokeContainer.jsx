import { useState, useEffect } from "react"
import axios from "axios";
const baseUrl = 'https://jokes-api-0a9p.onrender.com/joke';


const JokeContainer = () => {
    const [joke, setJoke] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
            const getJoke = async () => {

                const apiKey = (await axios.get(baseUrl)).data.message;


                const options = {
                  method: 'GET',
                  url: 'https://dad-jokes.p.rapidapi.com/random/joke',
                  headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
                  }
                };
                
                try {
                    const response = await axios.request(options);
                    setJoke(response.data.body[0])
                } catch (error) {
                    setInterval(() => {
                        setErrorMsg(error.message)
                    }, 5000)
                    setErrorMsg("")
                    console.error(error);
                }
            }
            getJoke();
    }, [])


    const handleGetRandomJoke = async () => {

        const apiKey = (await axios.get(baseUrl)).data.message;
        const options = {
          method: 'GET',
          url: 'https://dad-jokes.p.rapidapi.com/random/joke',
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
          }
        };
        
        try {
            const response = await axios.request(options);
            setJoke(response.data.body[0])
        } catch (error) {
            setInterval(() => {
                setErrorMsg(error.message)
            }, 5000)
            setErrorMsg("")
            console.error(error);
        }

    }



  return (
    <section className="flex items-center justify-center pt-20">
        <div className="w-1/2 h-[60vh] shadow-xl shadow-purple-400 rounded-lg flex items-center justify-center flex-col gap-y-4">
            <h1 className="font-onest text-4xl text-purple-500 italic font-extrabold">Dad Jokes</h1>
            <div className="flex items-center justify-center flex-col gap-y-6">
                <div className="h-[30vh] w-[40vw] flex items-center justify-center border-2 border-purple-500 flex-col gap-y-2 rounded-lg">
                    {joke ? (
                        <>
                            <h2 className="text-xs md:text-sm font-semibold font-onest p-2 text-purple-400">{joke.setup}</h2>
                            <p className="text-xs md:text-sm font-onest p-2">{joke.punchline}</p>
                        </>
                    ) : (
                        <p className="text-xl md:text-2xl font-semibold font-onest text-red-500 p-2">Could not get Joke, try again</p>
                    )}

                </div>
                <p className="font-onest text-[2px] text-red-500">{errorMsg}</p>
                <button className="bg-purple-500 text-white font-semibold font-onest text-sm px-6 py-3 rounded-lg" 
                onClick={handleGetRandomJoke}>Generate Joke</button>
            </div>
        </div>
    </section>
  )
}

export default JokeContainer