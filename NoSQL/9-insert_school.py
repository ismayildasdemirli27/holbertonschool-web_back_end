#!/usr/bin/env python3
"""Insert a new document in a collection."""


def insert_school(mongo_collection, **kwargs):
    """Insert a school and return its id."""
    result = mongo_collection.insert_one(kwargs)
    return result.inserted_id
  
