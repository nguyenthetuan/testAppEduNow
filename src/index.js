import React, { Component } from "react";
import { View } from 'react-native';
import { connect, Provider } from 'react-redux';
import { Action, Router } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/integration/react';
import Scenes from './router';
import SyncStorage from 'sync-storage';

const { store, presistor } = configureStore();
const ConnectedRouter = connect()(Router);

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await SyncStorage.init();
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={presistor}>
                    <View style={{ flex: 1 }}>
                        <ConnectedRouter scenes={Scenes} />
                    </View>
                </PersistGate>
            </Provider>
        );
    }
}