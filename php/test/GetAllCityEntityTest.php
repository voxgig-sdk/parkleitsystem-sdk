<?php
declare(strict_types=1);

// GetAllCity entity test

require_once __DIR__ . '/../parkleitsystem_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class GetAllCityEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ParkleitsystemSDK::test(null, null);
        $ent = $testsdk->GetAllCity(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = get_all_city_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "get_all_city." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set PARKLEITSYSTEM_TEST_GET_ALL_CITY_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $get_all_city_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.get_all_city")));
        $get_all_city_ref01_data = null;
        if (count($get_all_city_ref01_data_raw) > 0) {
            $get_all_city_ref01_data = Helpers::to_map($get_all_city_ref01_data_raw[0][1]);
        }

        // LIST
        $get_all_city_ref01_ent = $client->GetAllCity(null);
        $get_all_city_ref01_match = [];

        $get_all_city_ref01_list_result = $get_all_city_ref01_ent->list($get_all_city_ref01_match, null);
        $this->assertIsArray($get_all_city_ref01_list_result);

    }
}

function get_all_city_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/get_all_city/GetAllCityTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ParkleitsystemSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["get_all_city01", "get_all_city02", "get_all_city03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("PARKLEITSYSTEM_TEST_GET_ALL_CITY_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "PARKLEITSYSTEM_TEST_GET_ALL_CITY_ENTID" => $idmap,
        "PARKLEITSYSTEM_TEST_LIVE" => "FALSE",
        "PARKLEITSYSTEM_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["PARKLEITSYSTEM_TEST_GET_ALL_CITY_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["PARKLEITSYSTEM_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new ParkleitsystemSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["PARKLEITSYSTEM_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["PARKLEITSYSTEM_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
