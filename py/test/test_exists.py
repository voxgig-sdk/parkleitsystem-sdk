# ProjectName SDK exists test

import pytest
from parkleitsystem_sdk import ParkleitsystemSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ParkleitsystemSDK.test(None, None)
        assert testsdk is not None
