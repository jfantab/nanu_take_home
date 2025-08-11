import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { convertToUTC, formatTimestamp } from '../util/helpers.js';
import { querySampleLogs } from '../my_firebase/firestore_db.js';

import CalendarPicker from 'react-native-calendar-picker';
import uuid from 'react-native-uuid';

// Remove logs when moving to next month?
// Text input?
// Get today's logs to load upon opening calendar tab

function MyCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [today, setToday] = useState(new Date());
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const doStuff = async () => {
            const queriedLogs = await querySampleLogs(new Date(selectedDate));
            setLogs(queriedLogs);
        };
        doStuff();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.date}>
                Current Date: {today.toDateString()}
            </Text>
            <CalendarPicker
                selectedStartDate={selectedDate}
                onDateChange={async (date) => {
                    const utcDate = convertToUTC(date);
                    const queriedLogs = await querySampleLogs(utcDate);
                    setLogs(() => {
                        return queriedLogs;
                    });
                }}
                textStyle={{ fontSize: 15 }}
            />
            <ScrollView style={styles.scrollview}>
                <Text style={{ fontSize: 20 }}>Logs</Text>
                {logs.length > 0 &&
                    logs.map((log) => {
                        return (
                            <View key={uuid.v4()}>
                                <Text style={styles.logText}>{log.text}</Text>
                            </View>
                        );
                    })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    scrollview: {},
    date: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    logText: {
        fontSize: 18,
    },
});

export default MyCalendar;
