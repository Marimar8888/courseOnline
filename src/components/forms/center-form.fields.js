import React from 'react'

const CenterFormFields = ({ handleSubmit, handleBack, handleChange, state }) => {
    return (
        <div className="dashboard-content-entity-form">
            <form onSubmit={handleSubmit} className="dashboard-dates">
                <div className="dashboard-dates-header">
                    <h2>Datos</h2>
                    <div className='dashboard-dates-header-button'>
                        <button
                            className={`btn-save ${state.isButtonEnabled ? 'btn' : ''}`}
                            disabled={!state.isButtonEnabled}
                        >
                            GUARDAR
                        </button>
                        <button type="button" onClick={handleBack} className="btn-back" >
                            VOLVER
                        </button>
                    </div>
                </div>
                <div>
                    <h3>Nombre, apellidos y dni</h3>
                </div>
                <div className='dashboard-form-group-name'>
                    <div className="form-group">
                        <input
                            type="text"
                            name="studyCenters_name"
                            placeholder="Nombre del centro"
                            value={state.studyCenters_name || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="studyCenters_cif"
                            placeholder="CIF"
                            value={state.studyCenters_cif || ""}
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
                            name="studyCenters_address"
                            placeholder="Dirección"
                            value={state.studyCenters_address || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="studyCenters_city"
                            placeholder="Ciudad"
                            value={state.studyCenters_city || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="studyCenters_postal"
                            placeholder="Código Postal"
                            value={state.studyCenters_postal || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="studyCenters_email"
                            placeholder="Email"
                            value={state.studyCenters_email || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <h3>Datos de pago</h3>
                </div>
                <div className='dashboard-form-group-card'>
                    <div className="form-group">
                        <input
                            type="text"
                            name="studyCenters_number_card"
                            placeholder="Número de tarjeta"
                            value={state.studyCenters_number_card || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="studyCenters_exp_date"
                            placeholder="Fecha de caducidad (MM/AA)"
                            value={state.studyCenters_exp_date || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="studyCenters_cvc"
                            placeholder="CVC"
                            value={state.studyCenters_cvc || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}
export default CenterFormFields;
