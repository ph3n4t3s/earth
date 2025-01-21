// Valeur dans l'eau
// Fonction de conversion pour l'humidité
// return humidity
function convertMoisture (rawValue: number) {
    // Conversion en pourcentage avec inversion de l'échelle
    // et limitation entre 0 et 100%
    humidity = Math.map(rawValue, MOISTURE_AIR, MOISTURE_WATER, 0, 100)
    // Limiter les valeurs entre 0 et 100
    if (humidity < 0) {
        humidity = 0
    }
    if (humidity > 100) {
        humidity = 100
    }
    return Math.round(humidity)
}
/**
 * Signal digital détection d'eau sur P0
 * 
 * Signal analogique humidité de l'eau sur P1
 * 
 * Fonction de conversion pour l'humidité
 */
let humidity = 0
let MOISTURE_WATER = 0
let MOISTURE_AIR = 0
let moistureRaw = 0
let waterDetected = 0
let moisture = 0
// Initialisation de la communication série
serial.setBaudRate(BaudRate.BaudRate115200)
serial.writeString("" + ("Démarrage du capteur EARTH\n"))
serial.writeString("" + ("Moisture,WaterDetected\n"))
// Constantes de calibration
// Valeur dans l'air (sec)
MOISTURE_AIR = 1017
// Valeur dans l'eau
MOISTURE_WATER = 450
// En-tête CSV
serial.writeString("" + ("Démarrage du capteur EARTH\n"))
serial.writeString("" + ("DonnéesBrutes,TauxHumidité,DetectionEau\n"))
// Définition des broches
// Signal analogique humidité sur P1
let PIN_MOISTURE = AnalogPin.P1
// Signal digital détection d'eau sur P0
let PIN_WATER = DigitalPin.P0
// Boucle principale
basic.forever(function () {
    // Lecture des valeurs
    moistureRaw = pins.analogReadPin(PIN_MOISTURE)
    waterDetected = pins.digitalReadPin(PIN_WATER)
    // Conversion de l'humidité
    moisture = convertMoisture(moistureRaw)
    // Envoi des données sur le port série
    serial.writeString("" + (moistureRaw.toString()))
    serial.writeString(",")
    serial.writeString("" + (moisture.toString()))
    serial.writeString(",")
    serial.writeString("" + (waterDetected.toString()))
    serial.writeString("" + ("\n"))
    // Affichage sur la matrice LED selon la présence d'eau
    if (waterDetected == 1) {
        basic.showIcon(IconNames.Umbrella)
    } else {
        basic.showIcon(IconNames.No)
    }
    // Pause de 1 seconde
    basic.pause(500)
})
