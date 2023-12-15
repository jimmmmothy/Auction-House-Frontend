import { Client } from "@stomp/stompjs";

class StompClient {
    private static currentClient: Client | undefined;
    private static currentNotification : string;

    static setStompClient(stompClient: Client) {
        this.currentClient = stompClient;
    }
    
    static getStompClient(): Client | undefined {
        return this.currentClient;
    }

    static setNotification(notification: string) {
        this.currentNotification = notification;
    }

    static getNotification() {
        return this.currentNotification;
    }
}

export default StompClient;
