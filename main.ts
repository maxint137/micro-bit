function doPumpWater (durationSec: number) {
    pins.digitalWritePin(DigitalPin.P2, 1)
    basic.pause(durationSec * 1000)
    pins.digitalWritePin(DigitalPin.P2, 0)
}
input.onButtonPressed(Button.A, function () {
    doPumpWater(5)
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
        doPumpWater(5)
    } else {
        basic.showIcon(IconNames.SmallDiamond)
        basic.clearScreen()
        basic.pause(5000)
    }
})
