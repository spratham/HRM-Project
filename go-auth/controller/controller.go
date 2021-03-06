package controller

import (
	"errors"
	"fmt"
	"strconv"
	"time"

	"github.com/spratham/go-auth/database"

	models "github.com/spratham/go-auth/model"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

const SecretKey = "secret"

func Register(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	user := models.User{
		Name:     data["name"],
		Email:    data["email"],
		Password: password,
	}

	database.DB.Create(&user)

	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user models.User

	database.DB.Where("email = ?", data["email"]).First(&user)

	if user.Id == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "user not found",
		})
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "incorrect password",
		})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(user.Id)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), //1 day
	})

	token, err := claims.SignedString([]byte(SecretKey))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "could not login",
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func User(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims)

	var user models.User

	database.DB.Where("id = ?", claims.Issuer).First(&user)

	return c.JSON(user)
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "sucscess",
	})
}

func LogClockActivity(c *fiber.Ctx) error {
	var data map[string]uint
	// var data models.ClockActivity

	if err := c.BodyParser(&data); err != nil {
		return err
	}
	if _, ok := data["id"]; !ok {
		return errors.New("ID not found in request")
	}
	if _, ok := data["requestType"]; !ok {
		return errors.New("requestType not found in request")
	}
	
	row := database.GetUserClockActivityById(data["id"], data["requestType"])
	//if (*row)==nil || (*row).Id == 0 || 
	fmt.Println("Is row nil? ", row.Id==0)
	// fmt.Printf("%T %v %T %v\n\n", (*row), (*row), (*row).ClockTime.IsZero(), (*row).ClockTime.IsZero())
	if row .Id== 0 {
		fmt.Println("here")
		database.PutClockInActivity(data["id"], data["requestType"])
	} else {
		return errors.New("Activity already logged for today")
	}
	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func PutClockInActivity(u1, u2 uint) {
	panic("unimplemented")
}
