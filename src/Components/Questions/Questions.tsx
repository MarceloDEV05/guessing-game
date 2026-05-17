import { question } from "./question"

import { useState } from "react"

export const Questions = () => {
    const [mainQuest, setMainQuest] = useState(0)
    const [response, setResponse] = useState("")
    const [score, setScore] = useState(0)
    const [message, setMessage] = useState("")
    const [isCorrect, setIsCorrect] = useState(false)
    const [questCount, setQuestCount] = useState(question.length - 1)
    const [correctResponse, setCorrectResponse] = useState(0)
    const [errors, setErrors] = useState(0)
    const [pontuation, setPontuation] = useState(0)

    const totalQuestion = question.length - 1

    const currentQuest = question[mainQuest];
    const isFinished = mainQuest >= question.length

    //mainQuest >= question.length - 1

    function handleVerifyQuestion(e: React.SubmitEvent) {
        e.preventDefault()


        if (response == "") {
            setMessage("Resposta inválida, tente na próxima rodada")
            setPontuation((prev) => Math.max(prev - 1, 0))
            setCorrectResponse(correctResponse - 1)

            if (pontuation === 0) {
                setPontuation(0)

            }

            if (correctResponse === 0) {
                setCorrectResponse(0)
            }

            setTimeout(() => {
                nextQuestion()
                setMessage("")
            }, 1000)

            return;
        }

        if (response.trim().toLowerCase() === currentQuest.resposta.toLowerCase()) {

            setMessage("Você acertou")
            setIsCorrect(true)
            setResponse("")
            setScore(score + currentQuest.ponto * 2)
            setQuestCount(questCount - 1)
            setCorrectResponse(correctResponse + 1)
            setPontuation(pontuation + 1)

            setTimeout(() => {
                nextQuestion()
                setMessage("");
            }, 1000)


        }
        else if (response.trim().toLowerCase() !== currentQuest.resposta.toLowerCase()) {
            setMessage("Você errou")
            setIsCorrect(false)
            setResponse("")
            setErrors(errors + 1)
            nextQuestion()
        }

    }

    function jumpQuestion() {
        if(mainQuest < question.length){
            setMessage("")
            nextQuestion()
        }
    }

    function nextQuestion() {
        setMainQuest((prev) => prev + 1)
    }


    function resetGame() {
        setIsCorrect(false)
        setScore(0)
        setResponse("")
        setQuestCount(question.length - 1)
        setMessage("")
        setMainQuest(0)
        setErrors(0)
        setCorrectResponse(0)
        setPontuation(0)
    }

    if (isFinished) {
        return (
            <>
                <div className="flex flex-col gap-5 border lg:w-70 lg:h-70 w-full h-screen px-5 rounded-2xl shadow-2xl bg-blue-500 text-white pt-5">
                    <h1 className="text-center text-2xl font-bold">Fim de jogo</h1>

                    <h2>Pontuação: {pontuation}</h2>
                    <h2>Score: {score}</h2>
                    <h2>Acertos: {correctResponse}</h2>
                    <h2>Erros: {errors}</h2>
                    <h2>Total de perguntas: {totalQuestion}</h2>
                </div>

                <div className="w-full justify-center flex items-center pt-10">
                    <button onClick={resetGame} className="w-full p-2 rounded-2xl bg-blue-500 text-white transition-all hover:duration-300 ease-in-out hover:scale-110">
                        Recomeçar?
                    </button>
                </div>
            </>
        )
    }


    return (
        <div className="bg-white flex w-full  flex-col items-center gap-10 rounded-2xl">

            <div className="flex justify-between w-full">
                <div className="font-bold text-xl">
                    <h1 className="font-bold text-xl">Perguntas: {questCount}</h1>
                </div>

                <div className="">
                    <h1 className="font-bold text-xl">Score: {score}</h1>
                </div>
            </div>

            <div className=" border-2 border-gray-400 w-100 flex flex-col items-center justify-center h-30 rounded-xl shadow-2xl">
                <h1 className="text-black font-bold text-center">
                    {currentQuest.pergunta}
                </h1>

                <span>Ponto de acerto: {currentQuest.ponto}</span>

            </div>

            <div>
                {message && (
                    <span className={isCorrect ? "text-green-500 font-bold text-2xl" : "text-red-500 font-black text-2xl"}>
                        {message}
                    </span>
                )}
            </div>

            <form onSubmit={handleVerifyQuestion} className="w-full flex flex-col justify-around">
                <input type="text"
                    className="p-2 border-b outline-none text-center"
                    placeholder="Digite sua resposta"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                />

                <div className="flex justify-around w-full gap-2  pt-15 ">

                    <button type="button" onClick={() => jumpQuestion()}
                        className="w-full flex-1 p-2 bg-red-600 text-white shadow-2xl" >
                        Pular
                    </button>


                    <button type="submit"
                        className="flex-1 w-full p-2 bg-blue-600 text-white shadow-2xl">
                        Verificar
                    </button>
                </div>
            </form>



        </div>
    )
}
