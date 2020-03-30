import React from "react";
import PropTypes from "prop-types";
import Dropdown from 'react-dropdown';
import { Label, LabelReq } from "../styles/utils"
import { Container } from "../styles/ContainerStyle";

const Form = props => {

    const { vast_url, position, width, height } = props.values

    const options = ['top_left', 'top_middle', 'top_right', 'middle_left',
        'middle_right', 'bottom_left', 'bottom_middle', 'bottom_right'];

    const inputs = [{ label: 'vast_url', value: vast_url }, { label: 'position', value: position },
    { label: 'width', value: width }, { label: 'height', value: height }]

    return (
        <>
            <Container>
                {
                    inputs.map(input => {
                        return <>
                            {input.label === 'vast_url' ?
                                <LabelReq>{input.label}:</LabelReq>
                                : <Label>{input.label}:</Label>}
                            {input.label === 'position' ?
                                <Dropdown options={options} onChange={(e) => props.onChange(input.label, e)} value={position} />
                                : <input value={input.value} onChange={e => props.onChange(input.label, e)} />}
                        </>
                    })
                }
            </Container>
        </>
    )
}

Form.propTypes = {
    values: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Form;
