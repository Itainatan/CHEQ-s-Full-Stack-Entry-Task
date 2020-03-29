import React, { Component } from "react";
import { connect } from "react-redux";
import { createVast, editVast, setEdit, setCreate } from "../store/actions";
import { ButtonStyle, Head, Label, LabelReq, Message } from "../styles/utils"
import { Container, ContainerForm } from "../styles/ContainerStyle";
import Dropdown from 'react-dropdown';
var _ = require('lodash');

const options = [
    'top_left', 'top_middle', 'top_right', 'middle_left',
    'middle_right', 'bottom_left', 'bottom_middle', 'bottom_right'
];

const initialState = {
    vast_url: '',
    position: 'bottom_right',
    width: 100,
    height: 100,
    errorInput: false,
    errorCreate: false,
    errorEdit: false
};

class VastForm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidUpdate(prevProps) {
        const { vast } = this.props
        if (!_.isEqual(prevProps.vast, vast)) {
            if (vast) {
                const { vast_url, position, width, height } = vast
                this.setState({ ...initialState, vast_url, position, width, height })
            }
            else this.setState(initialState)
        }
    }

    done = () => {
        const { vast_url, position, width, height, errorInput } = this.state
        const vast = { vast_url, position, width, height }
        if (this.props.create) {
            if (!vast_url || errorInput) this.setState({ errorCreate: true })
            else {
                this.props.createVast(vast);
                setTimeout(() => { this.setState(initialState) }, 500);
            }
        }
        else
            this.checkEditConditions() && !errorInput ? this.props.editVast({ id: this.props.vast.id, ...vast })
                : this.setState({ errorEdit: true });
    }

    checkEditConditions = () => {
        const { vast } = this.props
        const { vast_url, position, width, height } = this.state
        return (vast_url !== '' &&
            vast_url !== vast.vast_url
            && ((position !== vast.position) || (Number(width) !== vast.width) || (Number(height) !== vast.height)))
    }

    updateValue = (key, e) => {
        const { value } = e.target
        this.setState({ [key]: value, errorEdit: false })
        this.checkValidation(key, value)
    }

    checkValidation = (key, value) => {
        const { width, height, errorCreate, errorEdit } = this.state
        if (key === 'width')
            this.checkValues(value, height) ? this.setState({ errorInput: true })
                : this.setState({ errorInput: false, errorCreate: false })
        if (key === 'height')
            if (this.checkValues(value, width))
                this.setState({ errorInput: true })
            else this.setState({ errorInput: false, errorCreate: false })
        if (key === 'vast_url' && (errorCreate || errorEdit) && value)
            this.setState({ errorCreate: false, errorEdit: false })
    }

    checkValues = (width, height) => ((width < 100 || width > 1000) || (height < 100 || height > 1000))

    showForm = () => {
        const { create, vast } = this.props
        const { vast_url, position, width, height, errorInput, errorCreate, errorEdit } = this.state
        return (
            <ContainerForm>
                <Head>
                    {create ? 'Create new Vast' : `Edit vast ${vast.id}`}
                </Head>
                <Container>
                    <LabelReq> vast url:</LabelReq>
                    <input value={vast_url}
                        onChange={e => this.updateValue("vast_url", e)}
                    ></input>
                </Container>
                <Container>
                    <Label> position:</Label>
                    <Dropdown options={options} onChange={(e) => this.setState({ position: e.value })} value={position} />
                </Container>
                <Container>
                    <Label> width:</Label>
                    <input type='number' value={width}
                        onChange={e => this.updateValue("width", e)}
                    ></input>
                </Container>
                <Container>
                    <Label> height:</Label>
                    <input type='number' value={height}
                        onChange={e => this.updateValue("height", e)}
                    ></input>
                </Container>
                <Container>
                    {errorInput &&
                        <Message>
                            Values of width and height can be between 100 to 1000.
                    </Message>}
                    {errorCreate &&
                        <Message>
                            Please check all inputs!
                    </Message>}
                    {errorEdit &&
                        <Message>
                            When edit you must change vast url and one more detail!
                    </Message>}
                </Container>
                <Container>
                    <ButtonStyle onClick={() => this.done()}> done </ButtonStyle>
                </Container>
            </ContainerForm>
        )
    }

    render() {
        const { edit, create, message, setCreate } = this.props
        return (
            <Container>
                <ButtonStyle onClick={() => setCreate(!create)}> create vast </ButtonStyle>
                {message &&
                    <Message>
                        {message}
                    </Message>}
                {(create || edit) && this.showForm()}
            </Container>
        );
    }
}

const maStateToProps = store => {
    return {
        edit: store && store.sets && store.sets.edit,
        create: store && store.sets && store.sets.create,
        vast: store && store.vasts && store.vasts.vast,
        message: store && store.sets && store.sets.message
    };
};

export default connect(maStateToProps, { createVast, editVast, setEdit, setCreate })(VastForm);
