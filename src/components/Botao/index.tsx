import React from 'react';
import style from './Botao.module.scss'

interface IProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
}

class Botao extends React.Component<IProps> {
    render() {
        const { type = "button" } = this.props
        return (
            <button type={type} className={style.botao} onClick={this.props.onClick}> 
                {this.props.children}
            </button>
        )
    }
}

export default Botao;