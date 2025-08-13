import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { convertToUTC } from '../util/helpers.js';
import { querySampleLogs } from '../my_firebase/firestore_db.js';

import CalendarPicker from 'react-native-calendar-picker';
// import uuid from 'react-native-uuid';

import { sampleAppts } from '../util/constants.js';

import { readBookings, addBooking } from '../my_firebase/firestore_db.js';

// Remove logs when moving to next month?
// Text input?
// Get today's logs to load upon opening calendar tab

const Appointment = ({ appt }) => {
    const [isVisible, setIsVisible] = useState(false);

    const [client, setClient] = useState(appt.client);
    const [email, setEmail] = useState(appt.clientEmail);
    const [service, setService] = useState(appt.service);

    const isDisabled =
        appt.client.length > 0 &&
        appt.service.length > 0 &&
        appt.clientEmail.length > 0;

    return (
        <View style={{ flex: 1, marginBottom: 10 }} key={appt.id}>
            <Text>
                {appt.date.toLocaleTimeString('en-US', {
                    timeStyle: 'short',
                })}
            </Text>
            <Text>Name: {appt.name}</Text>
            <Text>Service: {service}</Text>
            <Text>Booked by: {client}</Text>
            <Text>Client email: {email}</Text>
            {!isVisible && (
                <TouchableOpacity
                    onPress={() => setIsVisible((prev) => !prev)}
                    disabled={isDisabled}
                >
                    <Text
                        style={{
                            color: isDisabled ? 'grey' : 'blue',
                            fontWeight: 'bold',
                        }}
                    >
                        Book
                    </Text>
                </TouchableOpacity>
            )}
            {isVisible && (
                <Form
                    appt={appt}
                    setIsVisible={setIsVisible}
                    client={client}
                    setClient={setClient}
                    email={email}
                    setEmail={setEmail}
                    service={service}
                    setService={setService}
                />
            )}
        </View>
    );
};

const Form = ({
    appt,
    setIsVisible,
    client,
    setClient,
    email,
    setEmail,
    service,
    setService,
}) => {
    return (
        <View style={styles.modalContainer}>
            <Text>Book This Appointment</Text>
            <TextInput
                style={styles.textInput}
                name="Name"
                placeholder="Client Name"
                value={client}
                onChangeText={setClient}
            />
            <TextInput
                style={styles.textInput}
                name="Email"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.textInput}
                name="Service"
                placeholder="Service"
                value={service}
                onChangeText={setService}
                disabled={true}
            />
            <TouchableOpacity
                onPress={async () => {
                    console.log(client, email, service);
                    let newAppt = {
                        ...appt,
                        service: service,
                        client: client,
                        clientEmail: email,
                    };
                    console.log('newAppt: ', newAppt);
                    await addBooking(newAppt);
                    setIsVisible(false);
                }}
            >
                <Text style={{ color: 'blue', fontWeight: 'bold' }}>
                    Submit
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Text>Close</Text>
            </TouchableOpacity>
        </View>
    );
};

const createPSTDate = (date = new Date()) => {
    // Get the current timezone offset and PST offset
    const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
    const pstOffset = -8; // PST is UTC-8
    return new Date(utcTime + pstOffset * 3600000);
};
function MyCalendar() {
    const [selectedDate, setSelectedDate] = useState(createPSTDate(new Date()));
    const [today, setToday] = useState(createPSTDate(new Date()));

    const [appts, setAppts] = useState([]);
    useEffect(() => {
        const doStuff = async () => {
            console.log('selectedDate: ', selectedDate);
            const queriedBookings = await readBookings(selectedDate);
            setAppts(queriedBookings);
        };
        doStuff();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.date}>
                Current Date:{' '}
                {today.toLocaleString('en-US', {
                    timeZone: 'America/Los_Angeles',
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                })}
            </Text>
            <CalendarPicker
                selectedStartDate={selectedDate}
                onDateChange={async (date) => {
                    const queriedBookings = await readBookings(date);
                    setAppts(() => {
                        return queriedBookings;
                    });
                }}
                textStyle={{ fontSize: 15 }}
            />
            <ScrollView style={styles.scrollview}>
                <Text style={{ fontSize: 20, marginBottom: 10 }}>Bookings</Text>
                {appts &&
                    appts.map((appt) => {
                        return <Appointment key={appt.id} appt={appt} />;
                    })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        width: '100%',
        borderWidth: 1,
        padding: 10,
        zIndex: 999,
    },
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    scrollview: {
        flex: 1,
        width: '100%',
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 5,
        marginHorizontal: 5,
        padding: 5,
    },
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
