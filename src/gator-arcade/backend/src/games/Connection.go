package main

import (
	"fmt"
	"net/http"
)

func establishConnection(path string) {
	port := ":4200"
	http.Handle("/", http.FileServer(http.Dir("C:/Users/ryanb/Downloads/Gator-Arcade-main/Gator-Arcade-main/src/gator-arcade/src/app")))
	http.HandleFunc(path, func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Established Connection!")
	})
	if http.ListenAndServe(port, nil) == nil {
		fmt.Printf("Success! Listening...")
	}
}

func main() {
	establishConnection("")

}
