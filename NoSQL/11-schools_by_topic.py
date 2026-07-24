#!/usr/bin/env python3
"""Module for finding schools by topic."""


def schools_by_topic(mongo_collection, topic):
    """Return schools that have a specific topic."""

    result = mongo_collection.find({"topics": topic})
    return result
