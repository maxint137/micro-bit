input.onButtonPressed(Button.A, function () {
    pins.digitalWritePin(DigitalPin.P2, 1)
    basic.pause(5000)
    pins.digitalWritePin(DigitalPin.P2, 0)
})
input.onButtonPressed(Button.B, function () {
    basic.showString("" + (Moisture))
})
let Capacity = 0
let Moisture = 0
basic.showLeds(`
    . . . . .
    . # . # .
    . . # . .
    # . . . #
    . # # # .
    `)
basic.pause(1000)
basic.clearScreen()
basic.forever(function () {
    Capacity = pins.analogReadPin(AnalogPin.P0)
    Moisture = Math.round(Math.map(Capacity, 700, 280, 0, 100))
    basic.showString("" + (Moisture))
    if (Moisture <= 20) {
        pins.digitalWritePin(DigitalPin.P2, 1)
        basic.pause(5000)
        pins.digitalWritePin(DigitalPin.P2, 0)
    } else {
        basic.showIcon(IconNames.SmallDiamond)
        basic.clearScreen()
        basic.pause(5000)
    }
})
