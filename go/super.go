package main

import (
	"net/http"
	"text/template"
)

type archivos struct {
	original string
	copia    string
}

func main() {
	fs := http.FileServer(http.Dir("assets/"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	tmpl := template.Must(template.ParseFiles("form.html"))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			tmpl.Execute(w, nil)
			return
		}

		analizar := archivos{
			original: r.FormValue("file1"),
			copia:    r.FormValue("file2"),
		}

		// do something with details
		_ = analizar

		tmpl.Execute(w, struct{ Success bool }{true})
	})

	http.ListenAndServe(":8000", nil)
}
