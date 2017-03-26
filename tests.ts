// reset the sensor (not strictly necessary)
sensors.isl29125Reset();
// read color
basic.forever(() => {
    let color = sensors.isl29125Color();
    basic.setLedColor(color);
    // serial.writeNumber(color);
    // serial.writeLine("");
});
