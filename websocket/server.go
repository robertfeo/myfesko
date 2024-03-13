package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

type Client struct {
	conn *websocket.Conn
	room string
}

var clients = make(map[*Client]bool)
var rooms = make(map[string]map[*Client]bool)
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	http.HandleFunc("/ws", wsHandler)
	log.Fatal(http.ListenAndServe(":3001", nil))
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	client := &Client{conn: conn, room: ""}
	clients[client] = true

	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			delete(clients, client)
			if client.room != "" {
				delete(rooms[client.room], client)
			}
			break
		}

		handleMessage(client, msg)
	}
}

func handleMessage(client *Client, msg []byte) {
	// Here you would parse the msg to determine what action to take.
	// For example, if the message is a command to join a room:

	// Pseudocode: if msg starts with "/join" followed by the room name
	// roomName := getRoomNameFromMsg(msg)
	// joinRoom(client, roomName)

	// Pseudocode: if it's a regular message
	// broadcastToRoom(client.room, msg, client)
}

func joinRoom(client *Client, roomName string) {
	// Remove client from current room if they are in one
	if currentRoom, ok := rooms[client.room]; ok {
		delete(currentRoom, client)
	}

	// Add client to new room
	if _, ok := rooms[roomName]; !ok {
		rooms[roomName] = make(map[*Client]bool)
	}
	rooms[roomName][client] = true
	client.room = roomName
}

func broadcastToRoom(roomName string, msg []byte, sender *Client) {
	for client := range rooms[roomName] {
		if client != sender {
			err := client.conn.WriteMessage(websocket.TextMessage, msg)
			if err != nil {
				log.Println(err)
				client.conn.Close()
				delete(rooms[roomName], client)
				delete(clients, client)
			}
		}
	}
}
