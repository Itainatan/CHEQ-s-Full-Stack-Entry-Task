import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "../styles/ContainerStyle";
import { getXml } from "../store/actions";

class VastXML extends Component {

    componentDidMount() {
        const id = this.props.history.location.pathname.split('/')[2]
        this.props.getXml(id);
    }

    render() {
        return (
            <Container>
                {this.props.xml && this.props.xml}
            </Container>
        );
    }
}

const maStateToProps = store => {
    return {
        xml: store && store.vasts && store.vasts.xml,
    };
};

export default connect(maStateToProps, { getXml })(VastXML);
