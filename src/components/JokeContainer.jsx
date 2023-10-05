import { useState } from "react"
import axios from "axios";
const baseUrl = 'https://jokes-api-0a9p.onrender.com/joke';


const JokeContainer = () => {
    const [joke, setJoke] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGetRandomJoke = async () => {
        setLoading(true)
        try {
            setLoading(false);
            const res = await axios.get(baseUrl)
            setJoke(res)
        } catch (error) {
            setErrorMsg(error.message)
            setLoading(false)
            setTimeout(() => {
                setErrorMsg('')
            }, 5000)
            console.log(errorMsg)

            console.error(error);
        }

    }

  return (
    <section className="flex items-center justify-center pt-20">
        <div className="w-1/2 h-[60vh] shadow-xl shadow-purple-400 rounded-lg flex items-center justify-center flex-col gap-y-4">
            <h1 className="font-onest text-4xl text-purple-500 italic font-extrabold">Dad Jokes</h1>
            <div className="flex items-center justify-center flex-col gap-y-6">
                <div className="h-[30vh] w-[40vw] flex items-center justify-center border-2 border-purple-500 flex-col gap-y-2 rounded-lg">
                    {loading && (<p className="text-xs md:text-sm font-semibold font-onest p-2 text-black pt-4">Loading...</p>)}
                    {!loading && joke !== null && (
                        <>
                            <h2 className="text-xs md:text-sm font-semibold font-onest p-2 text-purple-400">{joke.setup}</h2>
                            <p className="text-xs md:text-sm font-onest p-2">{joke.punchline}</p>
                        </>
                    ) } 
                        
                    {!loading && (<p className="text-xl md:text-2xl font-semibold font-onest text-red-500 p-2">Could not get Joke, try again</p>)}
                        


                </div>
                {errorMsg && ( <p className="font-onest text-xs text-red-500">{errorMsg}</p> )}
                <button className="bg-purple-500 text-white font-semibold font-onest text-sm px-6 py-3 rounded-lg" 
                onClick={handleGetRandomJoke}>Generate Joke</button>
            </div>
        </div>
    </section>
  )
}

export default JokeContainer