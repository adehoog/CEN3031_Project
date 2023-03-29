package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	// Register API routes
	// e.g. r.HandleFunc("/api/tic-tac-toe", ticTacToeHandler).Methods("POST")

	log.Println("Server listening on :4200")
	log.Fatal(http.ListenAndServe(":4200", r))
}
