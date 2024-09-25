import React from 'react';

const CourseFormFields = ({ state, handleChange, setActive }) => {
    return (
        <div>
            <div className="two-column">
                <input
                    type="text"
                    onChange={handleChange}
                    name="title"
                    placeholder="Titulo del Curso"
                    value={state.title}
                />

                <input
                    type="checkbox"
                    onChange={(e) => setActive({ active: e.target.checked })}
                    name="active"
                    checked={state.active}
                />
            </div>
            <div className="three-column">
                <input
                    type="text"
                    onChange={handleChange}
                    name="price"
                    placeholder="Precio"
                    value={state.price}
                />

                <input
                    type="text"
                    onChange={handleChange}
                    name="discounted_price"
                    placeholder="Precio con descuento"
                    value={state.discounted_price}
                />
                <input
                    type="text"
                    onChange={handleChange}
                    name="category_id"
                    placeholder="Categoria"
                    value={state.category_id}
                />
            </div>
            <div className="two-column">
                <input
                    type="text"
                    onChange={handleChange}
                    name="professor_id"
                    placeholder="Nombre professor"
                    value={state.professor_id}
                />

                <input
                    type="text"
                    onChange={handleChange}
                    name="studycenter_id"
                    placeholder="Nombre Centro estudios"
                    value={state.studycenter_id}
                />
            </div>

        </div>
    )
}
export default CourseFormFields;
