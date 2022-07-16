function doUpdateMoisture () {
    Capacity = pins.analogReadPin(AnalogPin.P0)
    Moisture = Math.round(Math.map(Capacity, 800, 280, 0, 100))
}
input.onButtonPressed(Button.B, function () {
    doUpdateMoisture()
    basic.showString("" + (Moisture))
})
function doWaitMins (mins: number) {
    secsToGo = mins * 60
    while (0 <= secsToGo) {
        basic.showString("" + (secsToGo))
        secsToGo = secsToGo - 10
        basic.pause(10000)
    }
}
input.onButtonPressed(Button.A, function () {
    doPumpWaterSecs(10)
})
function doPumpWaterSecs (secs: number) {
    basic.showIcon(IconNames.Umbrella)
    pins.digitalWritePin(DigitalPin.P2, 1)
    basic.pause(secs * 1000)
    pins.digitalWritePin(DigitalPin.P2, 0)
    basic.showIcon(IconNames.Yes)
    basic.pause(30000)
    basic.clearScreen()
}
let secsToGo = 0
let Moisture = 0
let Capacity = 0
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
    doUpdateMoisture()
    led.plotBarGraph(
    Moisture,
    0
    )
    if (Moisture <= 33) {
        doPumpWaterSecs(10)
        doWaitMins(3)
    } else {
        basic.showIcon(IconNames.SmallDiamond)
        basic.clearScreen()
        basic.showString("" + (Moisture))
        doWaitMins(30)
    }
})
