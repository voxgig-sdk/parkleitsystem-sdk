# Parkleitsystem SDK

Real-time parking-garage occupancy for several Swiss and German cities, aggregated by the open-source ParkAPI project

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Parkleitsystem API

Parkleitsystem (ParkAPI / ParkenDD) is a community-run aggregator that scrapes municipal parking-guidance systems and re-publishes their data as a single JSON HTTP API at `https://api.parkendd.de`. The project originated with [Offenes Dresden](https://github.com/offenesdresden/ParkAPI) and powers the ParkenDD apps; this SDK targets the Swiss cities surfaced by the service (Basel, Zurich, Bern, Luzern, St. Gallen, Zug).

What you get from the API:

- A list of supported cities and metadata about each one
- For a given city, the set of parking garages with their current free-space counts, total capacity, status, address and geographic coordinates
- Lot type classification and the name of each facility

The API is read-only and does not require authentication or an API key. Update frequency, accuracy and CORS behaviour depend on the upstream city feed — some sources are more reliable than others, and a few legacy cities have been deprecated over time.

## Try it

**TypeScript**
```bash
npm install parkleitsystem
```

**Python**
```bash
pip install parkleitsystem-sdk
```

**PHP**
```bash
composer require voxgig/parkleitsystem-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/parkleitsystem-sdk/go
```

**Ruby**
```bash
gem install parkleitsystem-sdk
```

**Lua**
```bash
luarocks install parkleitsystem-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ParkleitsystemSDK } from 'parkleitsystem'

const client = new ParkleitsystemSDK({})

// List all getallcitys
const getallcitys = await client.GetAllCity().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o parkleitsystem-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "parkleitsystem": {
      "command": "/abs/path/to/parkleitsystem-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **GetAllCity** | Lists every city currently exposed by the ParkAPI instance, typically served from the API root (`/`). | `/` |
| **GetCityParkingInfo** | Returns the current parking-garage occupancy snapshot for a single city, served at a per-city path such as `/Basel` or `/Zuerich`. | `/{city}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from parkleitsystem_sdk import ParkleitsystemSDK

client = ParkleitsystemSDK({})

# List all getallcitys
getallcitys, err = client.GetAllCity(None).list(None, None)
```

### PHP

```php
<?php
require_once 'parkleitsystem_sdk.php';

$client = new ParkleitsystemSDK([]);

// List all getallcitys
[$getallcitys, $err] = $client->GetAllCity(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/parkleitsystem-sdk/go"

client := sdk.NewParkleitsystemSDK(map[string]any{})

// List all getallcitys
getallcitys, err := client.GetAllCity(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Parkleitsystem_sdk"

client = ParkleitsystemSDK.new({})

# List all getallcitys
getallcitys, err = client.GetAllCity(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("parkleitsystem_sdk")

local client = sdk.new({})

-- List all getallcitys
local getallcitys, err = client:GetAllCity(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ParkleitsystemSDK.test()
const result = await client.GetAllCity().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ParkleitsystemSDK.test(None, None)
result, err = client.GetAllCity(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ParkleitsystemSDK::test(null, null);
[$result, $err] = $client->GetAllCity(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.GetAllCity(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ParkleitsystemSDK.test(nil, nil)
result, err = client.GetAllCity(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:GetAllCity(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Parkleitsystem API

- Upstream: [https://api.parkendd.de](https://api.parkendd.de)
- API docs: [https://github.com/offenesdresden/ParkAPI](https://github.com/offenesdresden/ParkAPI)

- Upstream data is published by individual city parking operators; licences vary per city
- Basel and Zurich data is available under Creative Commons CC0
- Some cities (e.g. Nuremberg, Freiburg) carry custom open-data licences; check the source city before redistributing
- ParkAPI itself is an open-source project; see the [offenesdresden/ParkAPI](https://github.com/offenesdresden/ParkAPI) repository for code and source-specific notes

---

Generated from the Parkleitsystem API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
