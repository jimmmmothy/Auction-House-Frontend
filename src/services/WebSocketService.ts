import { Client, IMessage } from '@stomp/stompjs'
import { v4 as uuidv4 } from 'uuid';
import Notification from '../models/PublicNotification';

let notificationCallback: ((data: any) => void) | null = null;

const setupStompClient = async (userId: number, itemIds?: number[]) => {
    const stompClient = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000
    });

    stompClient.onConnect = () => {
        stompClient.subscribe(`/user/${userId}/notifications`, (data) => {
            if (notificationCallback) {
                notificationCallback(data); // Pass the received data to the callback
              }
        });

        if (itemIds) {
            itemIds.forEach(itemId => {
                stompClient.subscribe(`/topic/${itemId}/notifications`, (data) => {
                    if (notificationCallback) {
                        notificationCallback(data); // Pass the received data to the callback
                      }
                });
            });
        }
    };

    // initiate client
    stompClient.activate();

    // maintain the client for sending and receiving
    return stompClient;
};

const sendNotification = (stompClient: Client, newNotification: Notification) => {
    try {
        const payload = { 'id': uuidv4(), 'text': newNotification.text };
        const destination = `/topic/${newNotification.itemId}/notifications`;

        // Check if the client is connected before publishing
        if (stompClient.connected) {
            stompClient.publish({ 'destination': destination, body: JSON.stringify(payload) });
            console.log('Notification sent successfully.');
        } else {
            console.error('WebSocket client is not connected.');
        }
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

const addConnection = (stompClient: Client, newConnection: string) => {
    try {
        if (stompClient.connected) {
            stompClient.subscribe(newConnection, (data) => {
                console.log(data);
            })
            console.log('Connection added successfully.');
        } else {
            console.error('WebSocket client is not connected.');
        }
    } catch (error) {
        console.error('Error adding connection:', error);
    }
}

const setNotificationCallback = (callback: (data: IMessage) => void) => {
    notificationCallback = callback;
}

export default {
    setupStompClient,
    sendNotification,
    addConnection,
    setNotificationCallback
}
