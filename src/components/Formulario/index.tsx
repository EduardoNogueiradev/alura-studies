import React, { useState } from 'react';
import Botao from '../Botao'
import style from './Formulario.module.scss'
import { ITarefa } from '../../types/tarefa';
import { v4 as uuidv4 } from 'uuid'

interface Props {
    setTarefas: React.Dispatch<React.SetStateAction<ITarefa[]>>;
}

function Formulario({ setTarefas } : Props){
    const [ state, setState ] = useState({
        tarefa: "",
        tempo: "00:00:00"
    })

    function adicionarTarefa(evento: React.FormEvent) {
        /* React.FormEvent => informa que "evento" é do tipo evento de formulário */
        evento.preventDefault(); /* aqui não previnimos o padrão de dar refresh na página após enviarmos o formulário */
        
        setTarefas( tarefasAntigas => 
            [
                ...tarefasAntigas,
                {
                    ...state,
                    selecionado: false,          /* Aqui declaramos que setTarefas é as tarefas antigas mais a tarefa adicionada */
                    completado: false,
                    id: uuidv4()
                }
            ]
        ) 

        setState({
            tarefa: "",              /* Setamos o estado do formulário para "vazio" depois de adicionar uma tarefa */
            tempo: "00:00:00"
        })
       
    }

    return (
        <form className={style.novaTarefa} onSubmit={adicionarTarefa}>
            <div className={style.inputContainer}>
                <label htmlFor="tarefa">
                    Adicione um novo estudo
                </label>
                <input 
                    type="text"
                    name="tarefa"
                    id="tarefa"
                    value={state.tarefa}
                    /* Digo que o valor do input é o objeto tarefa do state */
                    onChange={evento => setState({ ...state, tarefa: evento.target.value })}
                    /* 
                        Digo que o elemento em mudança é uma arrow function onde "evento" é a função 
                        que usa a função "setState", essa função é usada para adicionar valores ao state,
                        dentro da função usamos o "...this.state" que busca os valores de state, percorrendo-o,
                        depois declaramos que "tarefa" é o valor do input com: "evento.target.value", que busca
                        o valor do input.
                    */
                    placeholder="O que você quer estudar?"
                    required
                />
            </div>
            <div className={style.inputContainer}>
                <label htmlFor="tempo">
                    Tempo
                </label>
                <input
                    type="time"
                    step="1"
                    name="tempo"
                    value={state.tempo}
                    onChange={evento => setState({ ...state, tempo: evento.target.value})}
                    id="tempo"
                    min="00:00:00"
                    max="01:30:00"
                    required
                />
            </div>
            <Botao type="submit">
                Adicionar
            </Botao>
        </form>
    )

}

export default Formulario;