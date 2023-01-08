//stylesheet
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { DEFAULT } from "../../themes/variables";

const { width, height } = Dimensions.get('window');

export const defaultCSS = StyleSheet.create({
    container: {

    },
    edtdropdown: {
        backgroundColor: DEFAULT.secondary,
        borderColor: DEFAULT.accent,
        padding: 8,
        borderRadius: 10,
        borderWidth: 1,
        minHeight: 42,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        
    },
});