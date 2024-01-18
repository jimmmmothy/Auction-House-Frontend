import { Client, IMessage } from '@stomp/stompjs'
import { v4 as uuidv4 } from 'uuid';
import Notification from '../models/PublicNotification';

let notificationCallback: ((data: any) => void) | null = null;

const setupStompClient = async (userId: number, bids?: number[][]) => {
    const stompClient = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000
    });

    const subscribedTopics = new Set<string>(); 

    stompClient.onConnect = () => {
        stompClient.subscribe(`/user/${userId}/notifications`, (data) => {
            if (notificationCallback) {
                notificationCallback(data);
            }
        });

        if (bids) {
            bids.forEach(bid => {
                const topic = `/topic/${bid[2]}/notifications`;
                if (!subscribedTopics.has(topic)) {
                    stompClient.subscribe(topic, (data) => {
                        if (notificationCallback) {
                            notificationCallback(data);
                        }
                    });
                    subscribedTopics.add(topic);
                }
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
