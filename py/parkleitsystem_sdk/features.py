# Parkleitsystem SDK feature factory

from parkleitsystem_sdk.feature.base_feature import ParkleitsystemBaseFeature
from parkleitsystem_sdk.feature.test_feature import ParkleitsystemTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ParkleitsystemBaseFeature(),
        "test": lambda: ParkleitsystemTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
