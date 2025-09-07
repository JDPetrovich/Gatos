import express from 'express';
import cors from "cors";
import Constantes from './constants/constantes.js';
import Rota from './routes/rotas.js';

class Servidor {
    static #portaPadrao = 0;
    #porta;
    #appExpress;

    constructor() {
        this.#porta = process.env.PORTA_SERVIDOR || Servidor.#portaPadrao;
        this.#appExpress = express()
        this.#appExpress.use(express.json())
        this.#appExpress.use(cors())
        this.#AdicionarRedirecionamentos()
        this.#AdicionarRotas()
    }

    #AdicionarRedirecionamentos() {
        this.#appExpress.use(
            Constantes.UrlRota.RAIZ,
            new Rota.REDIRECIONAMENTO().GetRedirecionamentos()
        )
    }
    
    #AdicionarRotas() {
        this.#appExpress.use(
            Constantes.UrlRota.API,
            new Rota.INICIAL().GetRotas()
        );
    
    }

    Rodar() {
        this.#appExpress.listen(this.#porta, () => {
            console.log(`O servidor está rodando na URI http://localhost:${this.#porta}`);
        });
    }
}

export default Servidor;