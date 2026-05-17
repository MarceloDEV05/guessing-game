
import { Questions } from "../Questions/Questions"

export const QuestionBox = () => {


    return(
        <div className="bg-white w-150 h-160 flex flex-col items-center gap-20 rounded-2xl">

            <h1 className="text-4xl font-extrabold text-center pt-10">Jogo da Adivinha 🕹️</h1>

                <div>
                    <Questions/>
                </div>

               

        </div>
    )
}