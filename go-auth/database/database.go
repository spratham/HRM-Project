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
func GetUserClockActivityById(id, clockType uint) (model.ClockActivity){
	var result model.ClockActivity
	r := DB.Select("*").Where(fmt.Sprintf("id = %v AND clock_time > DATE_FORMAT(\"yyyy-mm-dd\", NOW() ) AND clock_type = %v", id, clockType)).Limit(10).Find(&result)
	r.Scan(&result)
	fmt.Println(r.Attrs())
	fmt.Printf("get clockActivity resul %v database %v %T %T\n\n\n", result, DB, id, clockType)

return result
// if query returns nil result => no entry for today, insert clockin row
		// else user is already clocked-in => reject request
	// db.DB.Table("tbl_clock_activity").Last()
}

func PutClockInActivity(id, clockType uint){
//	var result *gorm.DB
// result :=&model.ClockActivity{Id:id, ClockType: uint32(clockType)}
	ca := &model.ClockActivity{Id: id, ClockType: uint32(clockType)}
	DB.Create(ca) //INTO tbl_clock_activity (id, clockType) values(?,?)`, id, clockType)
	//query := "INSERT INTO tbl_clock_activity (id, clockType) values(?,?)"
	//row := QueryHelper(query)
	
}

