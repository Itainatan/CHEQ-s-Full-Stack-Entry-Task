import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setEdit } from "../store/actions";
import { ButtonStyle, Square, AStyle } from "../styles/utils"
var _ = require('lodash');

const Vast = props => {
    const { vast } = props
    return (
        <>
            {
                Object.values(vast).map((value, index) =>
                    <Square key={index}>{value}</Square>
                )
            }
            <Square>
                <ButtonStyle onClick={() => props.setEdit(true, vast)}> edit vast </ButtonStyle>
                <AStyle href={`/xml/${vast.id}`}> view XML </AStyle>
            </Square>
        </>
    )
}

Vast.propTypes = {
    vast: PropTypes.object.isRequired
};

const areEqual = (prevProps, nextProps) => {
    return _.isEqual(prevProps.vast, nextProps.vast)
}

const VastMemo = React.memo(Vast, areEqual);

export default connect(null, { setEdit })(VastMemo);
