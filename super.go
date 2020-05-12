package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Printf("escuchando en el purto 8000")
	http.ListenAndServe(":8000", nil)
}
