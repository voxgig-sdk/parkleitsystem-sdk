<?php
declare(strict_types=1);

// Typed models for the Parkleitsystem SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** GetAllCity entity data model. */
class GetAllCity
{
    public ?string $api_version = null;
    public ?array $cities = null;
    public ?string $reference = null;
    public ?string $server_version = null;
}

/** Request payload for GetAllCity#load. */
class GetAllCityLoadMatch
{
    public ?string $api_version = null;
    public ?array $cities = null;
    public ?string $reference = null;
    public ?string $server_version = null;
}

/** GetCityParkingInfo entity data model. */
class GetCityParkingInfo
{
    public ?string $address = null;
    public ?array $coords = null;
    public ?bool $forecast = null;
    public ?int $free = null;
    public ?string $id = null;
    public ?string $lot_type = null;
    public ?string $name = null;
    public ?string $region = null;
    public ?string $state = null;
    public ?int $total = null;
}

/** Request payload for GetCityParkingInfo#list. */
class GetCityParkingInfoListMatch
{
    public string $city;
}

