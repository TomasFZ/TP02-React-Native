import React, { useState } from 'react';
import { TextInput, View, Button, FlatList, StyleSheet } from 'react-native';
import ToDo from '../../components/ToDo';

export default function Main() {
    const [toDoList, setToDoList] = useState([]);
    const [newTask, setNewTask] = useState('');

    const addToDo = () => {
        if (newTask.trim() === '') return;

        const newTaskItem = { id: Date.now().toString(), task: newTask };

        setToDoList((prevToDoList) => [...prevToDoList, newTaskItem]);
        setNewTask('');
    }

    const deleteToDo = (id) => {
        setToDoList((prevToDoList) => prevToDoList.filter((todo) => todo.id !== id));
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Ingrese una tarea"
                    value={newTask}
                    onChangeText={(text) => setNewTask(text)}
                    style={styles.textInput}
                />
                <Button title="Añadir" onPress={addToDo} color="#007BFF" />
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={toDoList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ToDo id={item.id} task={item.task} deleteToDo={deleteToDo} />}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        maxWidth: 500,
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    inputContainer: {
        marginBottom: 20, // Espacio entre el input y la lista
    },
    textInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    listContainer: {
        flex: 1,
        marginTop: 20, // Espacio adicional en la parte superior de la lista de tareas
    },
});
