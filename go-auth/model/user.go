package model

import (
	"time"
)

type User struct {
	Id       uint   `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email" gorm:"unique"`
	Password []byte `json:"-"`
}

const (
 	Clockin = 1
 	Clockout = 0
 )

type ClockActivity struct {
	Id        uint  `json:"id"` //id
	ClockTime time.Time  `json:"clocktime"`//clockTime
	ClockType uint32  `json:"clocktype"`//clockType
}

