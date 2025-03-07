import Select from "react-select";
import "./MultiSelect.scss"
const MultiSelect = ({
    field,
    form,
    options,
    isMulti = false,
    alreadySelected,
    placeholder = "Select",
}) => {
    function onChange(option) {
        form.setFieldValue(
            field.name,
            option ? option.map((item) => item.value) : []
        );
    }

    if (!isMulti) {
        return (
            <Select
                options={options}
                name={field.name}
                value={
                    options ? options.find((option) => option.value === field.value) : ""
                }
                onChange={(option) => form.setFieldValue(field.name, option.value)}
                onBlur={field.onBlur}
                placeholder={placeholder}
                menuIsOpen
            />
        );
    } else {
        return (
            <Select
                className="react-select-container"
                classNamePrefix="react-select"
                name={field.name}
                onChange={onChange}
                options={options}
                isMulti={true}
                placeholder={placeholder}
                defaultValue={alreadySelected}
                // menuIsOpen={true}
                menuPlacement="auto"
            />
        );
    }
};

export default MultiSelect;
