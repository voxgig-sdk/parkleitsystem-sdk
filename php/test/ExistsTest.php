<?php
declare(strict_types=1);

// Parkleitsystem SDK exists test

require_once __DIR__ . '/../parkleitsystem_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ParkleitsystemSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
