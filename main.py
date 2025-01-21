# Valeur dans l'eau
# Fonction de conversion pour l'humidité
# return humidity
def convertMoisture(rawValue: number):
    global humidity
    # Conversion en pourcentage avec inversion de l'échelle
    # et limitation entre 0 et 100%
    humidity = Math.map(rawValue, MOISTURE_AIR, MOISTURE_WATER, 0, 100)
    # Limiter les valeurs entre 0 et 100
    if humidity < 0:
        humidity = 0
    if humidity > 100:
        humidity = 100
    return Math.round(humidity)
"""

Signal digital détection d'eau sur P0

Signal analogique humidité de l'eau sur P1

Fonction de conversion pour l'humidité

"""
humidity = 0
MOISTURE_WATER = 0
MOISTURE_AIR = 0
moistureRaw = 0
waterDetected = 0
moisture = 0
# Initialisation de la communication série
serial.set_baud_rate(BaudRate.BAUD_RATE115200)
serial.write_string("" + ("Démarrage du capteur EARTH\n"))
serial.write_string("" + ("Moisture,WaterDetected\n"))
# Constantes de calibration
# Valeur dans l'air (sec)
MOISTURE_AIR = 1017
# Valeur dans l'eau
MOISTURE_WATER = 450
# En-tête CSV
serial.write_string("" + ("Démarrage du capteur EARTH\n"))
serial.write_string("" + ("DonnéesBrutes,TauxHumidité,DetectionEau\n"))
# Définition des broches
# Signal analogique humidité sur P1
PIN_MOISTURE = AnalogPin.P1
# Signal digital détection d'eau sur P0
PIN_WATER = DigitalPin.P0
# Boucle principale

def on_forever():
    global moistureRaw, waterDetected, moisture
    # Lecture des valeurs
    moistureRaw = pins.analog_read_pin(PIN_MOISTURE)
    waterDetected = pins.digital_read_pin(PIN_WATER)
    # Conversion de l'humidité
    moisture = convertMoisture(moistureRaw)
    # Envoi des données sur le port série
    serial.write_string("" + (str(moistureRaw)))
    serial.write_string(",")
    serial.write_string("" + (str(moisture)))
    serial.write_string(",")
    serial.write_string("" + (str(waterDetected)))
    serial.write_string("" + ("\n"))
    # Affichage sur la matrice LED selon la présence d'eau
    if waterDetected == 1:
        basic.show_icon(IconNames.UMBRELLA)
    else:
        basic.show_icon(IconNames.NO)
    # Pause de 1 seconde
    basic.pause(500)
basic.forever(on_forever)
