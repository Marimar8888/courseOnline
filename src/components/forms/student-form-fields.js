import React from 'react';

const StudentFormFields = ({ handleSubmit, handleChange, state }) => {
    return (
        <div className="dashboard-content-entity-form">
            <form onSubmit={handleSubmit} className="dashboard-dates">
                <div className="dashboard-dates-header">
                    <h2>Datos</h2>
                    <button
                        className={`btn-save ${state.isButtonEnabled ? 'btn' : ''}`}
                        disabled={!state.isButtonEnabled}
                    >
                        GUARDAR
                    </button>
                </div>
                <div>
                    <h3>Nombre, apellidos y dni</h3>
                </div>
                <div className='dashboard-form-group-name'>
                    <div className="form-group">
                        <input
                            type="text"
                            name="students_first_name"
                            placeholder="Nombre"
                            value={state.students_first_name || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="students_last_name"
                            placeholder="Apellidos"
                            value={state.students_last_name || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="students_dni"
                            placeholder="DNI"
                            value={state.students_dni || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <h3>Domicilio</h3>
                </div>
                <div className='dashboard-form-group-address'>
                    <div className="form-group">
                        <input
                            type="text"
                            name="students_address"
                            placeholder="Dirección"
                            value={state.students_address || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="students_city"
                            placeholder="Ciudad"
                            value={state.students_city || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            name="students_postal"
                            placeholder="Cod Postal"
                            value={state.students_postal || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="students_email"
                            placeholder="Email"
                            value={state.students_email || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <h3>Datos bancarios</h3>
                </div>
                <div className='dashboard-form-group-card'>
                    <div className="form-group">
                        <input
                            type="text"
                            name="students_number_card"
                            placeholder="Nº tarjeta"
                            value={state.students_number_card || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="students_exp_date"
                            placeholder="Vencimiento"
                            value={state.students_exp_date || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            name="students_cvc"
                            placeholder="CVC"
                            value={state.students_cvc || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}
export default StudentFormFields;
