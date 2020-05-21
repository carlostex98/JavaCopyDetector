package main

import (
	"fmt"
	"html/template"
	"net/http"
)

func index(w http.ResponseWriter, r *http.Request) {

	t := template.Must(template.ParseFiles("form.html")).Delims("<<", ">>")
	t.Execute(w, "")
}

func segundo(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.New("compiled.html").Delims("<<", ">>").ParseFiles("compiled.html"))
	t.Execute(w, "")
}

func main() {
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css/"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js/"))))

	http.HandleFunc("/", index)
	http.HandleFunc("/compiled", segundo)

	fmt.Printf("Servidor escuchando en: http://localhost:8000/")
	http.ListenAndServe(":8000", nil)
}
