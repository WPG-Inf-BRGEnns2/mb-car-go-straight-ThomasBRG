input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    stop()
})
function schneller () {
    vor()
    if (vr < 1023 && vl < 1023) {
        vr += 128
        vl += 128
    }
}
function vor () {
    pins.digitalWritePin(DigitalPin.P0, 1)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
}
function stop () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
}
input.onButtonPressed(Button.A, function () {
    langsamer()
})
function zurück () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 1)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 0)
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
}
input.onButtonPressed(Button.AB, function () {
    zurück()
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "schneller") {
        schneller()
    } else if (receivedString == "zurück") {
        zurück()
    } else if (receivedString == "stop") {
        stop()
    } else if (receivedString == "langsamer") {
        langsamer()
    }
})
input.onButtonPressed(Button.B, function () {
    schneller()
})
function langsamer () {
    if (vr < 383 || vl < 383) {
        stop()
    } else {
        vr += -128
        vl += -128
    }
}
function schreibeGeschwindigkeit () {
    pins.analogWritePin(AnalogPin.P14, vr)
    pins.analogWritePin(AnalogPin.P13, vl)
}
let vl = 0
let vr = 0
stop()
basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)
radio.setGroup(1)
vr = 703
vl = 703
basic.forever(function () {
    serial.writeValue("vr", vr)
    serial.writeValue("vl", vl)
    schreibeGeschwindigkeit()
})

