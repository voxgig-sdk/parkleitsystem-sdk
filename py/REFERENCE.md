# Parkleitsystem Python SDK Reference

Complete API reference for the Parkleitsystem Python SDK.


## ParkleitsystemSDK

### Constructor

```python
from parkleitsystem_sdk import ParkleitsystemSDK

client = ParkleitsystemSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ParkleitsystemSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = ParkleitsystemSDK.test()
```


### Instance Methods

#### `GetAllCity(data=None)`

Create a new `GetAllCityEntity` instance. Pass `None` for no initial data.

#### `GetCityParkingInfo(data=None)`

Create a new `GetCityParkingInfoEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## GetAllCityEntity

```python
get_all_city = client.GetAllCity()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `coord` | `dict` | No |  |
| `id` | `str` | No |  |
| `name` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.GetAllCity().list()
for get_all_city in results:
    print(get_all_city)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetAllCityEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GetCityParkingInfoEntity

```python
get_city_parking_info = client.GetCityParkingInfo()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `str` | No |  |
| `coord` | `dict` | No |  |
| `free` | `int` | No |  |
| `id` | `str` | No |  |
| `lot_type` | `str` | No |  |
| `name` | `str` | No |  |
| `state` | `str` | No |  |
| `total` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.GetCityParkingInfo().list()
for get_city_parking_info in results:
    print(get_city_parking_info)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetCityParkingInfoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = ParkleitsystemSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

