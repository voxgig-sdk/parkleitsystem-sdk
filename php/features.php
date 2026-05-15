<?php
declare(strict_types=1);

// Parkleitsystem SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ParkleitsystemFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ParkleitsystemBaseFeature();
            case "test":
                return new ParkleitsystemTestFeature();
            default:
                return new ParkleitsystemBaseFeature();
        }
    }
}
