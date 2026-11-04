# GetCityParkingInfo direct test

import json
import os
import pytest

from parkleitsystem_sdk.utility.voxgig_struct import voxgig_struct as vs
from parkleitsystem_sdk import ParkleitsystemSDK
from parkleitsystem_sdk.core import helpers
from test import runner


# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


def _live_ok(result):
    status = helpers.to_int(result.get("status"))
    return result.get("err") is None and bool(result.get("ok")) and 200 <= status < 300


class TestGetCityParkingInfoDirect:

    def test_should_direct_list_get_city_parking_info(self):
        setup = _get_city_parking_info_direct_setup([
            {"id": "direct01"},
            {"id": "direct02"},
        ])
        _skip, _reason = runner.is_control_skipped("direct", "direct-list-get_city_parking_info", "live" if setup["live"] else "unit")
        if _skip:
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        if setup["live"]:
            for _live_key in ["city01"]:
                if setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live test blocked: needs {_live_key} via PARKLEITSYSTEM_TEST_GET_CITY_PARKING_INFO_ENTID")

        if setup["live"]:
            runner.live_pace()
        client = setup["client"]

        params = {}
        query = {}
        if setup["live"]:
            params["city"] = setup["idmap"].get("city01")
        else:
            params["city"] = "direct01"

        result = client.direct({
            "path": "{city}",
            "method": "GET",
            "params": params,
            "query": query,
        })
        if setup["live"]:
            if not _live_ok(result):
                runner.live_miss(LIVE_STRICT, "Live list failed: " + runner.live_describe(result))
            if runner.live_list(result.get("data")) is None:
                runner.live_miss(LIVE_STRICT, "Live list returned no list: " + runner.live_describe(result))
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert isinstance(result["data"], list)
            assert len(result["data"]) == 2
            assert len(setup["calls"]) == 1



def _get_city_parking_info_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "PARKLEITSYSTEM_TEST_GET_CITY_PARKING_INFO_ENTID": {},
        "PARKLEITSYSTEM_TEST_LIVE": "FALSE",
    })

    live = env.get("PARKLEITSYSTEM_TEST_LIVE") == "TRUE"

    if live:
        # sdk-test-control.json's test.client.options seeds the live
        # client; the generated fields below overwrite anything they name.
        merged_opts = dict(runner.live_client_options())
        merged_opts.update({
        })
        client = ParkleitsystemSDK(merged_opts)
        idmap = env.get("PARKLEITSYSTEM_TEST_GET_CITY_PARKING_INFO_ENTID")
        # A path parameter's example stands in for an id *_ENTID does not give.
        idmap = {"city01": "Basel",
                 **(idmap if isinstance(idmap, dict) else {})}
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": idmap if isinstance(idmap, dict) else {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = ParkleitsystemSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
