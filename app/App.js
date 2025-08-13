import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from './screens/dashboard.js';
import MyCalendar from './screens/calendar.js';

import {
    populateSampleLogs,
    populateSettings,
    populateBookings,
} from './my_firebase/firestore_db.js';
import { edit } from './util/recurse.js';
import { data, clients, sampleAppts } from './util/constants.js';

const Tab = createBottomTabNavigator();

export default function App() {
    useEffect(() => {
        // populateBookings(sampleAppts);
        // populateSampleLogs();
        // const tree = edit(data);
        // populateSettings(tree, clients)
    }, []);

    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Dashboard">
                    <Tab.Screen name="Dashboard" component={Dashboard} />
                    <Tab.Screen name="Calendar" component={MyCalendar} />
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
