
import { Questions } from "../Questions/Questions"

export const QuestionBox = () => {


    return(
        <div className="bg-white lg:w-150 w-full lg:h-160 m-15 px-2 h-screen flex flex-col items-center justify-center gap-20 rounded-2xl">

            <h1 className="text-4xl font-extrabold text-center pt-10">Jogo da Adivinha 🕹️</h1>

                <div>
                    <Questions/>
                </div>

               

        </div>
    )
}