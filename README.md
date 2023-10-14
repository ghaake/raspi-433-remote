# Raspberry PI 433 MHz Remote API

This App exposes an API to controll them via HTTP and integrate them into a Smart Home Solution (e.g. Homeassistant).

## Prerequisites

1. Pi (Zero)
2. RF Module connected to the pi
3. Executeable to send commands via the RF module
    1. eg. [Zap-433mhz-RF-Pi-Controler](https://github.com/metalx1000/Zap-433mhz-RF-Pi-Controler)

## Building Running and Customizing the API

Example .env
```
PORT=8080
CODESEND_COMMAND=path/to/executeable
```

_!!! This Example is based on my implemenation to Control ZAP 433 Outlets !!!_

Add your codes to the `codes.json` located in ``/store/states/codes.json``

```json
{
    "WallPlug_1":
    {
        "on": 70963, # on code
        "off": 70972 # off code
    },
}
```

Once configured to your needs build the app via ``yarn build``

Add `start.sh` to ``rc.local`` to ensure the api gets started once the system is booting. 

### Example API Calls

Get State of "WallPlug_1":

```bash
curl --location --request GET 'http://192.168.10.27:8080/v1/state/WallPlug_1'
```

Turn on "WallPlug_1":

```bash
curl --location --request PUT 'http://192.168.10.27:8080/v1/state/WallPlug_1' \
--header 'Content-Type: application/json' \
--data-raw '{ "on": true }'
```

## Adding Outlets to Homeassistant

```yaml
command_line:
    - switch:
        name: Outlet 1
        unique_id: wallplug_1
        command_on: >
        curl --location --request PUT "http://<IP>:8080/v1/state/WallPlug_1" --header 'Content-Type: application/json' --data-raw '{ "on": true }'
        command_off: >
        curl --location --request PUT "http://<IP>:8080/v1/state/WallPlug_1" --header 'Content-Type: application/json' --data-raw '{ "on": false }'
        command_state: curl -X GET http://<IP>:8080/v1/state/WallPlug_1
        value_template: >
        {{ value == "1" }}
```

### Securing the API (atleast a bit)

```bash
sudo apt-get install ufw
sudo ufw allow ssh
sudo ufw allow from <your-home-assistant-host> to any port 8080 proto tcp
sudo ufw enable
```
