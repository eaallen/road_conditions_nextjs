import React, { Component } from "react";

export default function withComponentDidMount<T, K>(WrappedComponent: React.ComponentType<T>, getData: () => Promise<K> | K) {
    return class extends Component {
        state = { data: null }

        constructor(props: any) {
            super(props);
        }

        componentDidMount(): void {
            Promise.resolve(getData()).then(data => {
                this.setState({ data })
            })
        }

        render() {
            return <WrappedComponent data={this.state.data} {...this.props as T} />
        }
    }
}

