import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from 'react-native';

export default class Item extends React.PureComponent {

    render() {
        const { data, onPress } = this.props;
        return (
            <TouchableOpacity
                style={{ margin: 5, elevation: 3, backgroundColor: 'white', height: 80 }}
                onPress={() => onPress()}
            >
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '600' }} numberOfLines={1}>{data.hn}</Text>
                        <Text style={{ fontWeight: '100' }}>{data.ip}</Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '100' }}>{data.pc}/{data.pm}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

Item.propTypes = {
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
}