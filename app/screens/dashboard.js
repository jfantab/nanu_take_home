import { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ClientBox from '../components/client_box.js';
import { clients } from '../util/constants.js';

function Dashboard() {
    const [active, setActive] = useState(null);

    const handleSetActive = (index) => {
        setActive(index);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={clients}
                renderItem={(item) => (
                    <ClientBox
                        active={active}
                        handleSetActive={handleSetActive}
                        clientInfo={item.item}
                    />
                )}
                keyExtractor={(item) => item.id}
                style={{ width: '100%' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
});

export default Dashboard;
