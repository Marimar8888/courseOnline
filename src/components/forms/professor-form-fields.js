import React from 'react';

const ProfessorFormFields = ({handleSubmit, handleChange, state}) => {
  return (
    <div>
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
              name="professors_first_name"
              placeholder="Nombre"
              value={state.professors_first_name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="professors_last_name"
              placeholder="Apellidos"
              value={state.professors_last_name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="professors_dni"
              placeholder="DNI"
              value={state.professors_dni || ""}
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
              name="professors_address"
              placeholder="Dirección"
              value={state.professors_address || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="professors_city"
              placeholder="Ciudad"
              value={state.professors_city || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="professors_postal"
              placeholder="Código Postal"
              value={state.professors_postal || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="professors_email"
              placeholder="Email"
              value={state.professors_email || ""}
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
              name="professors_number_card"
              placeholder="Número de tarjeta"
              value={state.professors_number_card || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="professors_exp_date"
              placeholder="Fecha de caducidad (MM/AA)"
              value={state.professors_exp_date || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="professors_cvc"
              placeholder="CVC"
              value={state.professors_cvc || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
export default ProfessorFormFields
