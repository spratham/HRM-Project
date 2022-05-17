package database

import (
	"fmt"

	"github.com/spratham/go-auth/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	connection, err := gorm.Open(mysql.Open("root:rootroot@tcp(localhost:3306)/hrms"), &gorm.Config{})

	if err != nil {
		panic("could not connect to the database")
	}

	DB = connection

	connection.AutoMigrate(&model.User{})
}
func GetUserClockActivityById(id, clockType uint) (*model.ClockActivity){
	result :=&model.ClockActivity{}
DB.Raw (`SELECT * FROM tbl_clock_activity WHERE id = ?` , `clockTime > DATE_FORMAT("yyyy-mm-dd", NOW() )` ,`clockType =? ORDER by clockTime DESC`).Scan(result)
	panic(fmt.Sprintf("get clockActivity resul %v database %v", result, DB))

return result
// if query returns nil result => no entry for today, insert clockin row
		// else user is already clocked-in => reject request
	// db.DB.Table("tbl_clock_activity").Last()
}

func PutClockInActivity(id, clockType uint){
//	var result *gorm.DB
result :=&model.ClockActivity{Id:id, ClockType: uint32(clockType)}
	DB.Raw (`INSERT INTO tbl_clock_activity (id, clockType) values(?,?)`).Scan(result)
	//query := "INSERT INTO tbl_clock_activity (id, clockType) values(?,?)"
	//row := QueryHelper(query)
	
}

