import React, { useState } from "react";
import { View, Text, TextInput, Clipboard, StyleSheet } from "react-native";
import { Button, Card, Divider, useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";
import { storeClipboardText, retrieveClipboardText } from "../services/api";

const HomeScreen = () => {
    const { colors } = useTheme();
    const [token, setToken] = useState("");
    const [retrievedText, setRetrievedText] = useState("");

    const showToast = (message, type = "success") => {
        Toast.show({
            type,
            text1: message,
            position: "bottom",
            visibilityTime: 2000,
            autoHide: true,
            bottomOffset: 50,
        });
    };

    const handleStoreClipboard = async () => {
        const clipboardText = await Clipboard.getString();
        if (!clipboardText) {
            showToast("Clipboard is empty", "error");
            return;
        }
        const token = await storeClipboardText(clipboardText);
        if (token) {
            setToken(token);
            Clipboard.setString(token);
            showToast("Token copied to clipboard!");
        }
    };

    const handleRetrieveClipboard = async () => {
        if (!token.trim()) {
            showToast("Enter a valid token", "error");
            return;
        }
        const text = await retrieveClipboardText(token);
        if (text) {
            setRetrievedText(text);
            Clipboard.setString(text);
            showToast("Text copied to clipboard!");
        } else {
            showToast("Invalid or expired token", "error");
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.primary }]}>Clipboard Sync</Text>

            <Card style={[styles.card, { backgroundColor: colors.surface }]}>
                <Card.Content>
                    <Button mode="contained" icon="content-copy" onPress={handleStoreClipboard}>
                        Copy & Generate Token
                    </Button>
                    <Text style={[styles.label, { color: colors.onSurface }]}>Token:</Text>
                    <Text style={[styles.token, { color: colors.primary }]}>
                        {token || "No token generated yet"}
                    </Text>
                </Card.Content>
            </Card>

            <Divider style={styles.divider} />

            <Card style={[styles.card, { backgroundColor: colors.surface }]}>
                <Card.Content>
                    <TextInput
                        style={[styles.input, { backgroundColor: colors.surface, color: colors.onSurface }]}
                        placeholder="Enter token"
                        placeholderTextColor={colors.onSurface}
                        value={token}
                        onChangeText={setToken}
                    />
                    <Button mode="contained" icon="content-paste" onPress={handleRetrieveClipboard}>
                        Retrieve Clipboard
                    </Button>
                    <Text style={[styles.label, { color: colors.onSurface }]}>Retrieved Text:</Text>
                    <Text style={[styles.result, { color: colors.primary }]}>
                        {retrievedText || "No text retrieved yet"}
                    </Text>
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    card: {
        width: "100%",
        padding: 10,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginTop: 10,
    },
    token: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 5,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        width: "100%",
        padding: 10,
        marginBottom: 10,
    },
    result: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 5,
    },
    divider: {
        width: "90%",
        marginVertical: 10,
    },
});

export default HomeScreen;
