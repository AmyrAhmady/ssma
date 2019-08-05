import React, { Component } from "react";
import { Platform, FlatList, StatusBar, Text, View } from "react-native";
import { Header } from "react-native-elements";
import Item from '../../components/item/item.js'
import { config } from '../../config/config.js';

export default class ListScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            serversList: [],
            isRefreshing: true,
        };

        this.pageData = {
            pageNumber: 1,
            pageSize: 50,
        }
    }

    componentDidMount() {
        this.fetchRecords(this.pageData.pageNumber, this.pageData.pageSize);
    }

    fetchRecords = (page, pagesize) => {
        if (page == null) page = 1;
        if (pagesize == null) pagesize = 50;
        fetch(config.apiURL + '/servers/?page=' + page + '&pagesize=' + pagesize)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    serversList: [...this.state.serversList, ...responseJson]
                }, function () {
                    this.setState({ isRefreshing: false, loadingData: false });
                });
            })
            .catch((error) => {
                console.error(error);
                alert("Something went wrong while connecting to the server.");
            });
    }

    refreshList() {
        this.setState({ isRefreshing: true, serversList: [] });
        this.pageData.pageNumber = 1;
        this.fetchRecords(this.pageData.pageNumber, this.pageData.pageSize);
    }

    onScrollHandler() {
        this.setState({ loadingData: true, isRefreshing: true });
        var remaining = this.state.serversList.length % this.pageData.pageSize;
        if (remaining == 0) {
            this.pageData.pageNumber = this.pageData.pageNumber + 1;
            this.fetchRecords(this.pageData.pageNumber, this.pageData.pageSize);
        }
    }

    renderItem = ({ item }) => (
        <Item onPress={() => this.onPressServer(item)} data={item} />
    );

    onPressServer(item) {
        this.props.navigation.navigate("ServerPage", { ip: item.ip })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#304269" }}>
                <StatusBar backgroundColor="#512da8" />
                <Header
                    placement="center"
                    leftComponent={
                        <View>
                            {/*TODO: Menu icon, that opens a drawer with items such as favorites, about, and search*/}
                        </View>
                    }
                    centerComponent={
                        <View>
                            <Text>Servers</Text>
                        </View>
                    }
                    rightComponent={
                        <View>
                            {/*TODO: a button that opens a dropdown menu with filters options*/}
                        </View>
                    }
                    containerStyle={{
                        backgroundColor: '#ccc',
                    }}
                />
                <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
                    <FlatList
                        keyExtractor={(item, index) => "list-item-" + index}
                        data={this.state.serversList}
                        removeClippedSubviews={false}
                        renderItem={this.renderItem}
                        onEndReached={() => {
                            if (!this.state.loadingData) {
                                this.onScrollHandler()
                            }
                        }}
                        onEndReachedThreshold={1.5}
                        onRefresh={() => this.refreshList()}
                        refreshing={this.state.isRefreshing}
                    />
                </View>
            </View>
        );
    }
}