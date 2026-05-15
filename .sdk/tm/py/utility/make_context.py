# Parkleitsystem SDK utility: make_context

from core.context import ParkleitsystemContext


def make_context_util(ctxmap, basectx):
    return ParkleitsystemContext(ctxmap, basectx)
