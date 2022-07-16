def doWaitMins(mins: number):
    global secsToGo
    secsToGo = 0 * 60
    while 0 <= secsToGo:
        secsToGo = secsToGo - 10000
        basic.pause(10000)

def on_button_pressed_a():
    doPumpWaterSecs(5)
input.on_button_pressed(Button.A, on_button_pressed_a)

def doPumpWaterSecs(secs: number):
    led.stop_animation()
    basic.show_icon(IconNames.UMBRELLA)
    pins.digital_write_pin(DigitalPin.P2, 1)
    basic.pause(secs * 1000)
    pins.digital_write_pin(DigitalPin.P2, 0)
    basic.show_icon(IconNames.YES)
    basic.pause(30000)
    basic.clear_screen()

def on_button_pressed_b():
    basic.show_string("" + str((Moisture)))
input.on_button_pressed(Button.B, on_button_pressed_b)

Capacity = 0
Moisture = 0
secsToGo = 0
basic.show_leds("""
    . . . . .
        . # . # .
        . . # . .
        # . . . #
        . # # # .
""")
basic.pause(1000)
basic.clear_screen()

def on_forever():
    global Capacity, Moisture
    Capacity = pins.analog_read_pin(AnalogPin.P0)
    Moisture = Math.round(Math.map(Capacity, 800, 280, 0, 100))
    led.plot_bar_graph(Moisture, 0)
    if Moisture <= 33:
        doPumpWaterSecs(5)
    else:
        basic.show_icon(IconNames.SMALL_DIAMOND)
        basic.clear_screen()
        basic.show_string("" + str((Moisture)))
        basic.pause(5000)
basic.forever(on_forever)
