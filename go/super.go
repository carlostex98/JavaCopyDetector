package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
)

func index(w http.ResponseWriter, r *http.Request) {

	t := template.Must(template.ParseFiles("form.html")).Delims("<<", ">>")

	t.Execute(w, "")
}
func documetos(w http.ResponseWriter, r *http.Request) {

	t := template.Must(template.New("docs.html").ParseFiles("docs.html"))

	t.Execute(w, "")
}

func segundo(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.New("compiled.html").ParseFiles("compiled.html"))
	response, err := http.Get("http://localhost:3000/fmx")
	if err != nil {
		fmt.Println("error")
	} else {
		data, _ := ioutil.ReadAll(response.Body)
		m := map[string]interface{}{}
		f := json.Unmarshal([]byte(string(data)), &m)
		if f != nil {

		}
		var ast = m["ast"]
		m["ast"] = template.HTML(ast.(string))
		t.ExecuteTemplate(w, "T", m)

	}

}

func main() {
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css/"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js/"))))
	http.Handle("/doc/", http.StripPrefix("/doc/", http.FileServer(http.Dir("doc/"))))

	http.HandleFunc("/", index)
	http.HandleFunc("/compiled", segundo)
	http.HandleFunc("/docum", documetos)

	fmt.Printf("Servidor escuchando en: http://localhost:8000/")
	http.ListenAndServe(":8000", nil)
}
