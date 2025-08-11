import { StyleSheet, Text, View } from 'react-native';
import CheckBox from 'expo-checkbox';
import Arrow from './arrow';

function MappedNode({
    node,
    clientInfo,
    expanded,
    setExpanded,
    checked,
    handleCheckBoxes,
}) {
    return (
        <View>
            <Text>
                <Arrow
                    name={node.name}
                    expanded={expanded}
                    setExpanded={setExpanded}
                />
                <CheckBox
                    value={checked[node.name] || false}
                    onValueChange={(val) => {
                        handleCheckBoxes(node.name, val);
                    }}
                    style={styles.checkbox}
                />
                {'  '}
                <Text style={styles.name}>{node.name}</Text>
            </Text>
            {expanded[node.name] && (
                <Node
                    data={node.children}
                    clientInfo={clientInfo}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    checked={checked}
                    handleCheckBoxes={handleCheckBoxes}
                />
            )}
        </View>
    );
}

function Node({
    data,
    clientInfo,
    expanded,
    setExpanded,
    checked,
    handleCheckBoxes,
}) {
    return (
        <View style={styles.nodeContainer}>
            {data &&
                data.map((node) => {
                    return (
                        <MappedNode
                            key={node.name}
                            node={node}
                            clientInfo={clientInfo}
                            expanded={expanded}
                            setExpanded={setExpanded}
                            checked={checked}
                            handleCheckBoxes={handleCheckBoxes}
                        />
                    );
                })}
        </View>
    );
}

const styles = StyleSheet.create({
    nodeContainer: {
        flex: 1,
        width: '100%',
        paddingLeft: 35,
        marginBottom: 5,
        marginTop: 5,
    },
    checkbox: {
        width: 20,
        height: 20,
    },
    name: {
        fontSize: 20,
    },
});

export default Node;
