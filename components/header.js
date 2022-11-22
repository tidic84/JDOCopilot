import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
    return (
        <View style={styles.header}>
            {/*menu icons */}
            <View>
                <Text style={styles.headerText}></Text>
            </View>
        </View>
    )
}