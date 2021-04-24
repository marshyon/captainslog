package model

type Log struct {
	ID       uint   `json:"id" gorm:"primary_key"`
	Title    string `json:"title"`
	Author   string `json:"author"`
	Category string `json:"category"`
	Content  string `json:"content"`
}
