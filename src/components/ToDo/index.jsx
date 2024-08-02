import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function ToDo({ id, task, deleteToDo }) {
    const [checked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.checkbox, checked && styles.checked]}
                onPress={() => setChecked(!checked)}
            >
                {checked && <Text style={styles.checkmark}>✔</Text>}
            </TouchableOpacity>
            <Text style={[styles.text, checked && styles.checkedText]}>{task}</Text>
            <Button title="Eliminar" onPress={() => deleteToDo(id)} color="red" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10, // Espacio superior entre tareas
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        elevation: 1, // Sombra en Android
        shadowColor: '#000', // Sombra en iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderColor: '#ccc',
        borderWidth: 1,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    checked: {
        backgroundColor: 'green',
        borderColor: 'green',
    },
    checkmark: {
        color: 'white',
        fontSize: 16,
    },
    text: {
        flex: 1,
        fontSize: 16,
        marginHorizontal: 10, // Espacio horizontal alrededor del texto
    },
    checkedText: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
});
