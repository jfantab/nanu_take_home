import { TouchableOpacity } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

function ArrowState({ name, expanded }) {
    return expanded && name && name in expanded && expanded[name] ? (
        <AntDesign name="arrowdown" size={27} />
    ) : (
        <AntDesign name="arrowright" size={27} />
    );
}

function Arrow({ name, expanded, setExpanded }) {
    const handleArrowPress = () => {
        setExpanded((prev) => {
            if (name in expanded) {
                return {
                    ...prev,
                    [name]: !prev[name],
                };
            } else {
                return {
                    ...prev,
                    [name]: true,
                };
            }
        });
    };

    return (
        <TouchableOpacity onPress={handleArrowPress}>
            <ArrowState name={name} expanded={expanded} />
        </TouchableOpacity>
    );
}

export default Arrow;
