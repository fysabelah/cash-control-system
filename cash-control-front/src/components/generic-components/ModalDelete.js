import React from "react";

export default function ModalDelete({description, onConfirm, onCancel}) {

    return (
        <div className="Modal">
            <div className="ModalConfirmation__body">
                <div>
                    <h3>Deseja deletar {description}?</h3>
                </div>
                <div className="ModalConfirmation__button">
                    <div>
                        <button onClick={onCancel}>Cancelar</button>
                    </div>
                    <div>
                        <button className="buttonConfirmationGreen"
                                onClick={onConfirm}>Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}