/**
 * Read data from an ISL-29125 RGB sensor.
 */
//% color=#A80000
namespace sensors {
    let isl29125Address = 0x44;

    /**
     * ISL29125 Sensor neu starten.
     */
    //% blockId=isl29125_reset block="ISL RGB Sensor neu starten"
    //% parts="ISL29125"
    //% trackArgs=0
    export function isl29125Reset(): void {
        // send to 0x44, register 0x00, value 0x46 (RESET ISL29125)
        pins.i2cWriteNumber(0x44, 0x0046, NumberFormat.UInt16BE);
        // send to 0x44, register 0x01, value 0x05 (GRB SAMPLING, 10kLUX)
        pins.i2cWriteNumber(0x44, 0x0105, NumberFormat.UInt16BE);
        // send to 0x44, register 0x02, value 0x05 (MAX IR FILTER)
        pins.i2cWriteNumber(0x44, 0x02BF, NumberFormat.UInt16BE);
    }

    /**
     * ISL29125 Erkannte Lichtfarbe zurückgeben.
     */
    //% blockId=isl29125_rgb block="erkannte RGB Farbe"
    //% parts="ISL29125"
    //% trackArgs=0
    export function isl29125Color(): number {

        // green
        pins.i2cWriteNumber(0x44, 0x09, NumberFormat.Int8BE);
        let green = pins.i2cReadNumber(0x44, NumberFormat.UInt16LE);

        // red
        pins.i2cWriteNumber(0x44, 0x0b, NumberFormat.Int8BE);
        let red = pins.i2cReadNumber(0x44, NumberFormat.UInt16LE);

        // blue
        pins.i2cWriteNumber(0x44, 0x0d, NumberFormat.Int8BE);
        let blue = pins.i2cReadNumber(0x44, NumberFormat.UInt16LE);

        serial.writeString("RGB[");
        serial.writeNumber(red);
        serial.writeString(",");
        serial.writeNumber(green);
        serial.writeString(",");
        serial.writeNumber(blue);
        serial.writeString("]\r");

        // shift colors down (only need the high byte)
        return basic.rgbw(red >> 8, green >> 8, blue >> 8, 0);
    }


}
