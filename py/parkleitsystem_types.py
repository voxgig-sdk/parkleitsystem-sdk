# Typed models for the Parkleitsystem SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class GetAllCity:
    coord: Optional[dict] = None
    id: Optional[str] = None
    name: Optional[str] = None


@dataclass
class GetAllCityListMatch:
    coord: Optional[dict] = None
    id: Optional[str] = None
    name: Optional[str] = None


@dataclass
class GetCityParkingInfo:
    address: Optional[str] = None
    coord: Optional[dict] = None
    free: Optional[int] = None
    id: Optional[str] = None
    lot_type: Optional[str] = None
    name: Optional[str] = None
    state: Optional[str] = None
    total: Optional[int] = None


@dataclass
class GetCityParkingInfoListMatch:
    id: str

