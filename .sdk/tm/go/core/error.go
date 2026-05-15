package core

type ParkleitsystemError struct {
	IsParkleitsystemError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewParkleitsystemError(code string, msg string, ctx *Context) *ParkleitsystemError {
	return &ParkleitsystemError{
		IsParkleitsystemError: true,
		Sdk:              "Parkleitsystem",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ParkleitsystemError) Error() string {
	return e.Msg
}
