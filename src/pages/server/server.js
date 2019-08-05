import React, { Component } from "react";
import { StatusBar, Linking, Text, View, RefreshControl, Dimensions, Platform } from "react-native";
import { Header, Icon, Divider } from "react-native-elements";
import { config } from '../../config/config.js';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default class ServerScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            isRefreshing: true,
        };

        this.serverData = {
            core: {
                pc: 0,
                pm: 0
            }
        }

        this.dimensions = Dimensions.get('window');
    }

    componentDidMount() {
        const serverIp = this.props.navigation.getParam('ip', '127.0.0.1:7777');
        if (serverIp != '127.0.0.1:7777') {
            this.fetchServerData(serverIp);
        }
    }

    fetchServerData = (ipAddress) => {
        fetch(config.apiURL + '/server/' + ipAddress)
            .then((response) => response.json())
            .then((responseJson) => {
                this.serverData = responseJson;
                this.setState({ isRefreshing: false, loadingData: false });
            })
            .catch((error) => {
                console.error(error);
                alert("Something went wrong while connecting to the server.");
            });
    }

    refreshPage() {
        this.setState({ isRefreshing: true });
        this.fetchServerData(this.serverData.core.ip);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#304269" }}>
                <StatusBar backgroundColor="#512da8" />
                <Header
                    placement="center"
                    leftComponent={
                        <View>
                            {/*TODO: Back button*/}
                        </View>
                    }
                    centerComponent={
                        <View>
                            <Text>Server Info</Text>
                        </View>
                    }
                    rightComponent={
                        <View>
                            {/*TODO: add to favorites button*/}
                        </View>
                    }
                    containerStyle={{
                        backgroundColor: '#ccc',
                    }}
                />
                <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
                    <ScrollView
                        style={{ marginHorizontal: 10, flex: 1 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={() => this.refreshPage()}
                            />
                        }
                    >
                        <View style={{ marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name='info' type='entypo' />
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Server Information:</Text>
                                </View>
                            </View>
                            <Divider style={{ marginVertical: 20 }} />
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', marginHorizontal: 10 }}>
                                <View style={{ marginBottom: 8 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text>Address:</Text>
                                        {(this.serverData.core.pa == true) ? (
                                            <Icon name='lock' type='evilicon' />
                                        ) : (
                                                <Icon name='unlock' type='evilicon' />
                                            )}
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5 }}>
                                        <View style={{ borderRightWidth: 0.5, borderTopWidth: 0.5, width: 20, borderColor: '#ccc', marginRight: 5 }} />
                                        <Text>{this.serverData.core.ip}</Text>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 8 }}>
                                    <Text>Hostname:</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5 }}>
                                        <View style={{ borderRightWidth: 0.5, borderTopWidth: 0.5, width: 20, borderColor: '#ccc', marginRight: 5 }} />
                                        <Text>{this.serverData.core.hn}</Text>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 8 }}>
                                    <Text>Players:</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5 }}>
                                        <View style={{ borderRightWidth: 0.5, borderTopWidth: 0.5, width: 20, borderColor: '#ccc', marginRight: 5 }} />
                                        <Text>{this.serverData.core.pc}/{this.serverData.core.pm}</Text>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 8 }}>
                                    <Text>Gamemode:</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5 }}>
                                        <View style={{ borderRightWidth: 0.5, borderTopWidth: 0.5, width: 20, borderColor: '#ccc', marginRight: 5 }} />
                                        <Text>{this.serverData.core.gm}</Text>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 8 }}>
                                    <Text>Language:</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5 }}>
                                        <View style={{ borderRightWidth: 0.5, borderTopWidth: 0.5, width: 20, borderColor: '#ccc', marginRight: 5 }} />
                                        <Text>{this.serverData.core.la}</Text>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 8 }}>
                                    <Text>SA-MP version:</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5 }}>
                                        <View style={{ borderRightWidth: 0.5, borderTopWidth: 0.5, width: 20, borderColor: '#ccc', marginRight: 5 }} />
                                        <Text>{this.serverData.core.vn}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {(this.serverData.ru == null) ? (
                            <View />
                        ) : (
                                <View style={{ marginVertical: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <View style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                                            <Icon name='info' type='entypo' />
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Server Rules:</Text>
                                        </View>
                                    </View>
                                    <Divider style={{ marginVertical: 20 }} />
                                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', marginHorizontal: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                            <View style={{ width: this.dimensions.width * (60 / 100) - 20 }}>
                                                <Text>lagcomp:</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5 }}>
                                                    <View style={{ borderRightWidth: 0.5, borderTopWidth: 0.5, width: 20, borderColor: '#ccc', marginRight: 5 }} />
                                                    <Text>{(this.serverData.ru.lagcomp == null) ? ('unknown') : (this.serverData.ru.lagcomp)}</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: this.dimensions.width * (40 / 100) }}>
                                                <Text>mapname:</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5 }}>
                                                    <View style={{ borderRightWidth: 0.5, borderTopWidth: 0.5, width: 20, borderColor: '#ccc', marginRight: 5 }} />
                                                    <Text numberOfLines={1}>{this.serverData.ru.mapname}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                            <View style={{ width: this.dimensions.width * (60 / 100) - 20 }}>
                                                <Text>weather:</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5 }}>
                                                    <View style={{ borderRightWidth: 0.5, borderTopWidth: 0.5, width: 20, borderColor: '#ccc', marginRight: 5 }} />
                                                    <Text>{this.serverData.ru.weather}</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: this.dimensions.width * (40 / 100) }}>
                                                <Text>worldtime:</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5 }}>
                                                    <View style={{ borderRightWidth: 0.5, borderTopWidth: 0.5, width: 20, borderColor: '#ccc', marginRight: 5 }} />
                                                    <Text>{this.serverData.ru.worldtime}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                            <View style={{ width: this.dimensions.width * (60 / 100) - 20 }}>
                                                <Text>weburl:</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5 }}>
                                                    <View style={{ borderRightWidth: 0.5, borderTopWidth: 0.5, width: 20, borderColor: '#ccc', marginRight: 5 }} />
                                                    <TouchableOpacity onPress={() => {
                                                        if (!this.serverData.ru.weburl.includes('https://') || !this.serverData.ru.weburl.includes('http://')) {
                                                            Linking.openURL('http://' + this.serverData.ru.weburl)
                                                        } else {
                                                            Linking.openURL(this.serverData.ru.weburl)
                                                        }
                                                    }}>
                                                        <Text numberOfLines={1}>{this.serverData.ru.weburl}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={{ width: this.dimensions.width * (40 / 100) }}>
                                                <Text>gravity:</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5 }}>
                                                    <View style={{ borderRightWidth: 0.5, borderTopWidth: 0.5, width: 20, borderColor: '#ccc', marginRight: 5 }} />
                                                    <Text>{(this.serverData.ru.gravity == null) ? ('0.008') : (this.serverData.ru.gravity)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                    </ScrollView>
                </View>
            </View >
        );
    }
}