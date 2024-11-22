import React from "react";
import {toast} from "react-toastify";

export default function ModalCreateCashier({onCancel, onConfirm}) {
    const [formData, setFormData] = React.useState({
        description: "",
        balance: 0.0
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateDataAndInsert = (e) => {
        e.preventDefault();

        if (!formData.description || !formData.description.length) {
            toast.error("A descrição é obrigatória",
                {position: "top-right", autoClose: 10000});
        } else {
            onConfirm(formData);
        }
    }

    return (
        <div className="Modal">
            <form className="Form">
                <div className="FormItem">
                    <div>
                        <p>Descrição</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            required
                            name="description"
                            value={formData.description}
                            onChange={handleChange}/>
                    </div>
                </div>
                <div className="FormItem">
                    <div>
                        <p>Saldo inicial</p>
                    </div>
                    <div>
                        <input
                            name="balance"
                            type="number"
                            value={formData.balance}
                            required
                            onChange={handleChange}
                            step="0.01"
                            min="0.01"/>
                    </div>
                </div>
                <div className="FormButtons">
                    <div>
                        <button onClick={onCancel}>Cancelar</button>
                    </div>
                    <div>
                        <button onClick={validateDataAndInsert} className="Green">Cadastrar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}