# Parkleitsystem SDK utility: make_context

from parkleitsystem_sdk.core.context import ParkleitsystemContext


def make_context_util(ctxmap, basectx):
    return ParkleitsystemContext(ctxmap, basectx)
