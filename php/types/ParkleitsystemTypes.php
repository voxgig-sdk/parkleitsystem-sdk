<?php
declare(strict_types=1);

// Typed models for the Parkleitsystem SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** GetAllCity entity data model. */
class GetAllCity
{
    public ?array $coord = null;
    public ?string $id = null;
    public ?string $name = null;
}

/** Request payload for GetAllCity#list. */
class GetAllCityListMatch
{
    public ?array $coord = null;
    public ?string $id = null;
    public ?string $name = null;
}

/** GetCityParkingInfo entity data model. */
class GetCityParkingInfo
{
    public ?string $address = null;
    public ?array $coord = null;
    public ?int $free = null;
    public ?string $id = null;
    public ?string $lot_type = null;
    public ?string $name = null;
    public ?string $state = null;
    public ?int $total = null;
}

/** Request payload for GetCityParkingInfo#list. */
class GetCityParkingInfoListMatch
{
    public string $id;
}

