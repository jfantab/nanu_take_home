import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Node from './client_element.js';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { data } from '../util/constants.js';
import {
    edit,
    initializeChecked,
    updateDescendants,
    wrapperFunction,
} from '../util/recurse.js';

// import { updateOneClientSettings } from '../my_firebase/firestore_db.js';

function ClientBox({ clientInfo, active, handleSetActive }) {
    const [tree, setTree] = useState(null);
    const [expanded, setExpanded] = useState({});
    const [checked, setChecked] = useState({});

    useEffect(() => {
        setTree(() => {
            const tree = edit(data, 'data');
            const newChecked = {};

            setChecked(() => initializeChecked(tree, newChecked));
            return tree;
        });
    }, []);

    const handleOnPress = () => {
        handleSetActive((prev) => {
            if (prev == clientInfo.id) return null;
            return clientInfo.id;
        });
    };

    const handleCheckBoxes = (label, val) => {
        setChecked((prev) => {
            let clientName = clientInfo.name;
            let newCheckedState = { ...prev };
            let updatedChecked = updateDescendants(
                tree,
                label,
                val,
                newCheckedState,
                clientName
            );

            let newUpdatedChecked = wrapperFunction(
                tree,
                updatedChecked,
                clientName
            );
            return newUpdatedChecked;
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleOnPress}>
                <Text style={styles.text}>
                    {active == clientInfo.id ? (
                        <AntDesign name="arrowdown" size={27} />
                    ) : (
                        <AntDesign name="arrowright" size={27} />
                    )}{' '}
                    {clientInfo.name}
                </Text>
            </TouchableOpacity>
            {active && active == clientInfo.id && (
                <Node
                    clientInfo={clientInfo}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    checked={checked}
                    handleCheckBoxes={handleCheckBoxes}
                    data={tree.children}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
        paddingLeft: 50,
    },
    text: {
        fontSize: 25,
    },
    treeContainer: {
        flex: 1,
    },
});

export default ClientBox;
