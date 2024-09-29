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
                    onChange={(e) => {

                        if (setActive) {
                            setActive({ active: e.target.checked });
                        } else {

                            handleChange({
                                target: { name: 'active', value: true },
                            });
                        }
                    }}
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
                <select
                    name="category_id" 
                    value={state.category_id || ''} 
                    onChange={handleChange}
                    className="select-element"
                >
                    <option value="">Select Category</option>
                    {state.category_names.map(category => (
                        <option key={category.categories_id} value={category.categories_id}>
                            {category.categories_name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="two-column">
                <input
                    type="text"
                    name="professor_id"
                    placeholder="Nombre professor"
                    value={state.professor.professors_last_name + " " + state.professor.professors_first_name} 
                    readOnly
                />
                <select
                    name="studycenter_id" 
                    value={state.studycenter_id || ''}
                    onChange={handleChange}
                    className="select-element"
                >
                    <option value="">Select Center</option>
                    {state.studycenter_names.map(center => (
                        <option key={center.id} value={center.id}>
                            {center.name}
                        </option>
                    ))}
                </select>
            </div>

        </div>
    )
}
export default CourseFormFields;
