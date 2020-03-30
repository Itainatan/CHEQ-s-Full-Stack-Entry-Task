import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "./Form"
import { createVast, editVast, setEdit, setCreate } from "../store/actions";
import { ButtonStyle, Head, Message } from "../styles/utils"
import { Container, ContainerForm } from "../styles/ContainerStyle";
var _ = require('lodash');

const initialState = {
    vast_url: '',
    position: 'bottom_right',
    width: 100,
    height: 100,
    errorInput: false,
    errorCreate: false,
    errorEdit: false,
    errorUrl: false,
};
//eslint-disable-next-line
const regex = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);

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
        if (this.isValidUrl(vast_url)) {
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
        else this.setState({ errorUrl: true })
    }

    isValidUrl = value => value.match(regex)

    checkEditConditions = () => {
        const { vast } = this.props
        const { vast_url, position, width, height } = this.state
        return (vast_url !== vast.vast_url
            && ((position !== vast.position) || (Number(width) !== vast.width) || (Number(height) !== vast.height)))
    }

    updateValue = (key, e) => {
        const { value } = key === 'position' ? e : e.target
        this.setState({ [key]: value, errorEdit: false })
        this.checkValidation(key, value)
    }

    checkValidation = (key, value) => {
        const { width, height, errorCreate, errorEdit, errorUrl } = this.state
        if (key === 'width' || key === 'height')
            key === 'width' ? this.checkIntInputs(value, height) : this.checkIntInputs(value, width)
        if (key === 'vast_url' && (errorCreate || errorEdit || errorUrl))
            this.setState({ errorCreate: false, errorEdit: false, errorUrl: false })
    }

    checkIntInputs = (width, height) => {
        this.checkValues(width, height) ? this.setState({ errorInput: true })
            : this.setState({ errorInput: false, errorCreate: false })
    }

    checkValues = (width, height) => ((width < 100 || width > 1000) || (height < 100 || height > 1000))

    showForm = () => {
        const { create, vast } = this.props
        const { vast_url, position, width, height, errorInput, errorCreate, errorEdit, errorUrl } = this.state
        const values = { vast_url, position, width, height }
        return (
            <ContainerForm>
                <Head>
                    {create ? 'Create new Vast' : `Edit vast ${vast.id}`}
                </Head>
                <Form onChange={this.updateValue} values={values} />
                <Container>
                    <ButtonStyle onClick={() => this.done()}> done </ButtonStyle>
                    {errorInput && <Message> Values of width and height can be between 100 to 1000 </Message>}
                    {errorCreate && <Message> Please check all inputs </Message>}
                    {errorEdit && <Message> When edit you must change vast url and one more detail </Message>}
                    {errorUrl && <Message> insert a valid url </Message>}
                </Container>
            </ContainerForm>
        )
    }

    render() {
        const { edit, create, message, setCreate } = this.props
        return (
            <Container>
                <ButtonStyle onClick={() => setCreate(!create)}> create vast </ButtonStyle>
                {message && <Message> {message} </Message>}
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
